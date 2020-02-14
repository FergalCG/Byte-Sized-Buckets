import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatchSetTodos, dispatchRemoveTodo } from '../store/todos'
import { dispatchRemoveBucketTodo } from '../store/bucket'
import Todo from './Todo'
import { toggleForm } from '../store/user'
import "../firestore"
import * as firebase from "firebase"

const dummyData = [
    {priority: 10, time: 450, content: 'Finish Stackathon'},
    {priority: 8, time: 210, content: 'Study Algorithm Problems'},
    {priority: 7,time: 120, content: 'Update my Resume'},
    {priority: 5, time: 90, content: 'Get Interview Attire'},
    {priority: 3, time: 60, content: 'Learn to Code'},
    {priority: 3, time: 180, content: 'Clean The House'},
    {priority: 1, time: 30, content: 'Get A Haircut'}
]


class DisconnectedAllTodos extends Component {

    generatePresetTodos = (e) => {
        e.preventDefault()
        this.props.dispatchSetTodos(firebase.auth().currentUser.uid, dummyData)
    }

    removeTodo = (e) => {
        e.preventDefault()
        let removedTodo = e.target.value
        this.props.dispatchRemoveTodo(firebase.auth().currentUser.uid, removedTodo)
        if( this.props.bucket.length > 0 ) {
            this.props.dispatchRemoveBucketTodo(firebase.auth().currentUser.uid, removedTodo)
        }
    }

    render() {
        const allTodos = this.props.todos
        let count = 0
        return (
            <div id="all-todos">
                {
                    allTodos.length ? (
                        <div id="todos-list">
                            {allTodos.map(todo => {
                                count++
                                return (
                                    <div key={count} className="single-todo">
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
                    ) : <h5>It looks like you have no todos. Add some with the buttons below!</h5>
                }
                <div id='all-todos-buttons-container'>
                    <button type="button" className="all-todos-button" onClick={this.props.dispatchToggleForm}>
                        {
                            !this.props.formVisible ?  'Add New Todo' : 'Hide Todo Form'
                        }
                    </button>
                    <button type="button" className="all-todos-button" onClick={this.generatePresetTodos}>
                        Generate Preset Todos!
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
    bucket: state.bucket.bucket,
    formVisible: state.user.formVisible
})

const mapDispatchToProps = dispatch => ({
    dispatchSetTodos: (uid, todos) => {
        dispatch(dispatchSetTodos(uid, todos))
    },
    dispatchRemoveTodo: (uid, todo) => {
        dispatch(dispatchRemoveTodo(uid, todo))
    },
    dispatchRemoveBucketTodo: (uid, todo) => {
        dispatch(dispatchRemoveBucketTodo(uid, todo))
    },
    dispatchToggleForm: () => {
        dispatch(toggleForm())
    } 
})

const AllTodos = connect(mapStateToProps, mapDispatchToProps)(DisconnectedAllTodos)

export default AllTodos