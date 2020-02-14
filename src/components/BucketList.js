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
        event.preventDefault()
        time += Number(this.state.hours*60) + Number(this.state.minutes)
        console.log(time)
        let list = [], 
            curTime = 0, 
            count = 0
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
            <div id='bucketList-container'>
                {bucket.length ? (
                    <div key={count} id="bucket-list">
                        {bucket.map(todo => {
                            count++
                            return (
                                <div key={count} className="bucket-single-todo">
                                    <Todo todo={todo} key={count} />
                                    {/* <button
                                    type="button"
                                    className="complete-todo-button"
                                    value={JSON.stringify(todo)}
                                    onClick={this.completeTodo}
                                    key={count-2}
                                    >
                                        <span/>&#9989;
                                    </button> */}
                                    <div className='bucket-buttons-container'>
                                        <i 
                                            className="fas fa-check-square" 
                                            value={JSON.stringify(todo)}
                                            onClick={this.completeTodo}
                                            // className="complete-todo-button"
                                            key={count-2}
                                        />
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
                                        className="remove-todo-button"
                                        type="button"
                                        value={JSON.stringify(todo)}
                                        onClick={this.removeTodo}
                                        key={count+50}
                                        >
                                            <span/>&#10060;
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) :
                    null
                }
                <form onSubmit={this.generateBucket} id="bucket-form-and-button">
                    <div id='bucket-time-inputs'>
                        <div className='bucket-time-input'>
                            <p className="bucketForm-time">Hours</p>
                            <input
                                type="number"
                                placeholder="0"
                                name="hours"
                                className="bucket-input"
                                id="hours"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='bucket-time-input'>
                            <p className="bucketForm-time">Minutes</p>
                            <input
                                type="number"
                                placeholder="0"
                                name="minutes"
                                className="bucket-input"
                                id="minutes"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <br/>
                    <button
                    type="submit"
                    id="generate-bucket-button"
                    key={count}
                    >
                        <h3>Generate BucketList</h3>
                    </button>
                </form>
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