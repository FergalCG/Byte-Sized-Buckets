import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setBucket, dispatchRemoveBucketTodo } from '../store/bucket'
import { dispatchRemoveTodo } from '../store/todos'
import Todo from './Todo'
import "../firestore"
import * as firebase from "firebase"


class DisconnectedBucketList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hours: 0,
            minutes: 0,
            date: null
        }
        this.time = this.state.hours*60 + this.state.minutes
    }

    generateBucket = (event, todos = this.props.todos, time = 0) => {
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
            this.props.setBucket(firebase.auth().currentUser.uid, list)
            return []
        }
        return
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    completeTodo = (e) => {
        e.preventDefault()
        let completedTodo = e.target.value
        console.log('dispatch next line')
        this.props.dispatchRemoveBucketTodo(firebase.auth().currentUser.uid, completedTodo)
        this.props.dispatchRemoveTodo(firebase.auth().currentUser.uid, completedTodo)
    }

    removeTodo = (e) => {
        e.preventDefault()
        let removedTodo = e.target.value
        console.log('dispatch next line')
        this.props.dispatchRemoveBucketTodo(firebase.auth().currentUser.uid, removedTodo)
    }


    render() {
        const bucket = this.props.bucket
        let count = -1
        return (
            <div>
                {bucket.length ? (
                    <div key={count} id="bucket-list">
                        {bucket.map(todo => {
                            count++
                            return (
                                <div key={count} className="bucket-contents">
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
                                    {/* <img 
                                        src='https://library.kissclipart.com/20180910/wuq/kissclipart-green-check-icon-small-clipart-check-mark-computer-210ea7ac0d00affd.jpg' 
                                        alt='Complete' 
                                        width='21' 
                                        height='21'
                                        className="make-skinnier"
                                        value={JSON.stringify(todo)}
                                        onClick={this.completeTodo}
                                        key={count-2}
                                    /> */}
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
                        <br/>
                        <button
                        className="make-skinny"
                        type="submit"
                        key={count}
                        >
                            <h3>Generate BucketList</h3>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBucket: (uid, bucket) => {
        dispatch(setBucket(uid, bucket))
    },
    dispatchRemoveBucketTodo: (uid, todo) => {
        dispatch(dispatchRemoveBucketTodo(uid, todo))
    },
    dispatchRemoveTodo: (uid, todo) => {
        dispatch(dispatchRemoveTodo(uid, todo))
    }
})

const mapStateToProps = state => ({
    todos: state.todos.todos,
    bucket: state.bucket.bucket
})

const BucketList = connect(mapStateToProps, mapDispatchToProps)(DisconnectedBucketList)

export default BucketList