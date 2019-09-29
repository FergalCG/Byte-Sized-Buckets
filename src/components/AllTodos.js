import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTodos} from '../store/todos'
import Todo from './Todo'

class DisconnectedAllTodos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
        this.generatePresetTodos = this.generatePresetTodos.bind(this)
    }

    componentDidMount() {
        getTodos()
        this.setState(this.props.todos)
    }

    generatePresetTodos() {
        this.setState({
            todos: [
                {priority: 10, difficulty: 450, content: 'Finish Stackathon'},
                {priority: 8, difficulty: 210, content: 'Study Algorithm Problems'},
                {priority: 7, dificulty: 120, content: 'Update my Resume'},
                {priority: 5, difficulty: 90, content: 'Get Interview Attire'},
                {priority: 3, difficulty: 60, content: 'Learn to Code'},
                {priority: 3, difficulty: 180, content: 'Clean The House'},
                {priority: 1, difficulty: 30, content: 'Get A Haircut'}
            ]
        })
    }

    render() {
        const allTodos = this.state.todos
        let count = -1
        return (
            <div>
                {allTodos.length ? (
                    <div>
                        {allTodos.map(todo => {
                            count++
                            return (
                                <div>
                                    <Todo todo={todo} key={count} />
                                    <button className="todos-remove-todo" type="button" onClick={this.removeTodo} key={count}>
                                        <span/>&#10060;
                                    </button> 
                                </div>
                            )
                        })}
                    </div>
                ) :
                    <div />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: this.state.todos
})

const mapDispatchToProps = dispatch => ({
    getTodos: () => {
        dispatch(getTodos())
    }
})

const AllTodos = connect(mapStateToProps)(DisconnectedAllTodos)

export default AllTodos