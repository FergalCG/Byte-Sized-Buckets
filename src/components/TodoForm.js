import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatchAddTodo } from '../store/todos'
import { allTodosStateChange } from './AllTodos'
import "../firestore"
import * as firebase from "firebase"


class DisconnectedTodoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: '',
            priority: 1,
            hours: 0,
            minutes: 0
        }
        this.updateInput = this.updateInput.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addTodo = e => {
        e.preventDefault()
        this.props.dispatchAddTodo(firebase.auth().currentUser.uid, {
            content: this.state.content,
            priority: this.state.priority,
            time: this.state.hours*60 + this.state.minutes
        })
        this.setState({
            content: '',
            priority: 1,
            hours: 0,
            minutes: 0
        })
        allTodosStateChange()
    }
    

    render() {
        return (
            <div id="todo-form-container">
                <form onSubmit={this.addTodo} id="todo-form">
                    <div id="form-input1">
                        <input
                            type="text"
                            name="content"
                            placeholder="Enter Todo Here"
                            onChange={this.updateInput}
                            value={this.state.content}
                        />
                        <input
                            type="number"
                            name="priority"
                            placeholder="priority"
                            onChange={this.updateInput}
                            value={this.state.priority}
                        />
                        <p>Priority</p>
                    </div>
                    <div id="form-input2">
                        <input
                            type="number"
                            name="hours"
                            placeholder="hours"
                            onChange={this.updateInput}
                            value={this.state.hours}
                        />
                        <input
                            type="number"
                            name="minutes"
                            placeholder="minutes"
                            onChange={this.updateInput}
                            value={this.state.minutes}
                        />
                        <p>Hours/Minutes</p>
                    </div>
                    <button type="submit" id="form-button">Submit</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    dispatchAddTodo: (email, todo) => {
        dispatch(dispatchAddTodo(email, todo))
    }
})

const TodoForm = connect(null, mapDispatchToProps)(DisconnectedTodoForm)

export default TodoForm