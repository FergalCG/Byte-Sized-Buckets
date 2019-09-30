import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setBucket, dispatchRemoveBucketTodo } from '../store/bucket'
import { allTodosStateChange } from './AllTodos'
import { dispatchRemoveTodo } from '../store/todos'
import Todo from './Todo'
import store from '../store'


export let bucketListStateChange = function() {
    this.setState(store.getState().bucket)
}


class DisconnectedBucketList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bucket: [],
            hours: 0,
            minutes: 0,
            date: null
        }
        this.time = this.state.hours*60 + this.state.minutes
        this.generateBucket = this.generateBucket.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.completeTodo = this.completeTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        bucketListStateChange = bucketListStateChange.bind(this)
    }

    generateBucket(event, todos = this.props.todos, time = 0) {
        time += Number(this.state.hours*60) + Number(this.state.minutes)
        event.preventDefault()
        console.log(time)
        let list = []
        let curTime = 0
        let count = 0
        if(todos.length) {
            while(curTime <= time+15 && count < todos.length && curTime !== time) {
                const todoCopy = todos[count]
                if(curTime + todoCopy.time <= time+15) {
                    curTime += todoCopy.time
                    console.log(todoCopy.time)
                    list.push(todoCopy)
                }
                count++
            }
            if(!list.length) {
                list = this.generateBucket(event, todos, time+15)
            }
        }
        if(list.length) {
            if(todos[0].priority - list[0].priority >= 5) {
                list[0] = todos[0]
            }
            console.log(list)
            this.setState({bucket: list, hours: 0, minutes: 0, date: new Date()})
            this.props.setBucket(this.props.user.email, list)
            return []
        }
        return
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
          })
    }

    completeTodo(e) {
        e.preventDefault()
        let removedTodo = e.target.value
        let newTodos = this.props.todos.filter( todo => {

            return JSON.stringify(todo) !== removedTodo
        })
        let newBucket = this.state.bucket.filter( todo => {

            return JSON.stringify(todo) !== removedTodo
        })
        console.log('dispatch next line')
        this.props.dispatchRemoveBucketTodo(this.props.user.email, newBucket)
        this.props.dispatchRemoveTodo(this.props.user.email, newTodos)
        allTodosStateChange()
        this.setState({
            ...this.state,
            bucket: newBucket
        })
    }

    removeTodo(e) {
        e.preventDefault()
        let removedTodo = e.target.value
        let newBucket = this.state.bucket.filter( todo => {

            return JSON.stringify(todo) !== removedTodo
        })
        console.log('dispatch next line')
        this.props.dispatchRemoveBucketTodo(this.props.user.email, newBucket)
        this.setState({
            ...this.state,
            bucket: newBucket
        })
    }


    render() {
        const bucket = this.state.bucket
        let count = -1
        return (
            <div>
                {bucket.length ? (
                    <div key={count} id="bucket-list">
                        {bucket.map(todo => {
                            count++
                            return (
                                <div key={count} className="contents">
                                    <Todo todo={todo} key={count} />
                                    <button
                                    type="button"
                                    className="make-skinnier"
                                    value={JSON.stringify(todo)}
                                    onClick={this.completeTodo}
                                    key={count-2}
                                    >
                                        <span/>&#9989;
                                    </button>
                                    <button
                                    className="make-skinnier"
                                    type="button"
                                    value={JSON.stringify(todo)}
                                    onClick={this.removeTodo}
                                    key={count+50}
                                    >
                                        <span/>&#10060;
                                    </button> 
                                </div>
                            )
                        })}
                    </div>
                ) :
                    <div />
                }
                <div>
                    <form onSubmit={this.generateBucket} id="bucket-form">
                        <p className="bucketForm-time">Hours</p>
                        <input
                            type="number"
                            placeholder="0"
                            name="hours"
                            className="make-skinny"
                            id="hours"
                            onChange={this.handleChange}
                        />
                        <p className="bucketForm-time">Minutes</p>
                        <input
                            type="number"
                            placeholder="0"
                            name="minutes"
                            className="make-skinny"
                            id="minutes"
                            onChange={this.handleChange}
                        />
                        <button
                        className="make-skinny"
                        type="submit"
                        key={count}
                        >
                            Generate BucketList
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBucket: (email, bucket) => {
        dispatch(setBucket(email, bucket))
    },
    dispatchRemoveBucketTodo: (email, newBucket) => {
        dispatch(dispatchRemoveBucketTodo(email, newBucket))
    },
    dispatchRemoveTodo: (email, newTodos) => {
        dispatch(dispatchRemoveTodo(email, newTodos))
    }
})

const mapStateToProps = state => ({
    todos: state.todos.todos,
    user: state.user.user,
    bucket: state.bucket.bucket
})

const BucketList = connect(mapStateToProps, mapDispatchToProps)(DisconnectedBucketList)

export default BucketList