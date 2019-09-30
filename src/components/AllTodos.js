import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTodos, dispatchSetTodos, dispatchRemoveTodo} from '../store/todos'
import { dispatchRemoveBucketTodo } from '../store/bucket'
import { bucketListStateChange } from './BucketList'
import Todo from './Todo'
import store from '../store'

const dummyData = [
    {priority: 10, time: 450, content: 'Finish Stackathon'},
    {priority: 8, time: 210, content: 'Study Algorithm Problems'},
    {priority: 7,time: 120, content: 'Update my Resume'},
    {priority: 5, time: 90, content: 'Get Interview Attire'},
    {priority: 3, time: 60, content: 'Learn to Code'},
    {priority: 3, time: 180, content: 'Clean The House'},
    {priority: 1, time: 30, content: 'Get A Haircut'}
]

export let allTodosStateChange = function() {
    this.setState(store.getState().todos)
}


class DisconnectedAllTodos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
        this.generatePresetTodos = this.generatePresetTodos.bind(this)
        allTodosStateChange = allTodosStateChange.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }


    generatePresetTodos(e) {
        e.preventDefault()
        console.log(store.getState())
        this.setState({
            todos: dummyData
        })
        console.log(this.state.todos)
        this.props.dispatchSetTodos(this.props.user.email, dummyData)
    }

    removeTodo(e) {
        e.preventDefault()
        let removedTodo = e.target.value
        let newTodos = this.state.todos.filter( todo => {

            return JSON.stringify(todo) !== removedTodo
        })
        let newBucket = this.props.bucket.filter( todo => {

            return JSON.stringify(todo) !== removedTodo
        })
        console.log(newTodos)
        console.log('dispatch next line')
        this.props.dispatchRemoveTodo(this.props.user.email, newTodos)
        if( JSON.stringify(newBucket) !== JSON.stringify(this.state.bucket) ) {
            this.props.dispatchRemoveBucketTodo(this.props.user.email, newBucket)
            bucketListStateChange()
        }
        this.setState({
            ...this.state,
            todos: newTodos
        })
    }

    render() {
        const allTodos = this.state.todos
        let count = -1
        return (
            <div id="all-todos">
                {allTodos.length ? (
                    <div id="todos-list">
                        {allTodos.map(todo => {
                            count++
                            return (
                                <div key={count} id="single-todo">
                                    <Todo todo={todo} key={count} />
                                    <button
                                    className="todos-remove-todo"
                                    type="button"
                                    value={JSON.stringify(todo)}
                                    onClick={this.removeTodo}
                                    key={count-2}>
                                        <span/>&#10060;
                                    </button> 
                                </div>
                            )
                        })}
                    </div>
                ) :
                    <div />
                }
                <button id="preset-todos" type="button" className="make-skinny" onClick={this.generatePresetTodos}>
                    Generate Preset Todos!
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
    user: state.user.user,
    bucket: state.bucket.bucket
})

const mapDispatchToProps = dispatch => ({
    getTodos: (email) => {
        dispatch(getTodos(email))
    },
    dispatchSetTodos: (email, todos) => {
        dispatch(dispatchSetTodos(email, todos))
    },
    dispatchRemoveTodo: (email, newTodos) => {
        dispatch(dispatchRemoveTodo(email, newTodos))
    },
    dispatchRemoveBucketTodo: (email, newBucket) => {
        dispatch(dispatchRemoveBucketTodo(email, newBucket))
    }
})

const AllTodos = connect(mapStateToProps, mapDispatchToProps)(DisconnectedAllTodos)

export default AllTodos