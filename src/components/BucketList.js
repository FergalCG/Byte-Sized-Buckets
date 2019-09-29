import React, {Component} from 'react'
import {connect} from 'react-redux'
import firebase from "../firestore"
import Todo from './Todo'

const notVery = 4
const somewhat = 8
const Very = 16

const dummyData = [
    {priority: 10, difficulty: 450, content: 'Finish Stackathon'},
    {priority: 8, difficulty: 210, content: 'Study Algorithm Problems'},
    {priority: 7, dificulty: 120, content: 'Update my Resume'},
    {priority: 5, difficulty: 90, content: 'Get Interview Attire'},
    {priority: 3, difficulty: 60, content: 'Learn to Code'},
    {priority: 3, difficulty: 180, content: 'Clean The House'},
    {priority: 1, difficulty: 30, content: 'Get A Haircut'}
]

class DisconnectedBucketList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            dedication: 0,
            date: null
        }
        this.generateBucket = this.generateBucket.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    generateBucket(e, todos = dummyData, dedication = 240) {
        e.preventDefault()
        let list = []
        let curDedication = 0
        let count = 0
        if(todos.length) {
            while(curDedication <= dedication+30 && count < todos.length && curDedication !== dedication) {
                const todoCopy = todos[count]
                if(curDedication + todoCopy.difficulty <= dedication+1) {
                    list.push(todoCopy)
                    curDedication += todoCopy.difficulty
                }
                count++
            }
            if(!list.length) {
                list = this.generateBucket(todos, dedication+30)
                if(todos[0].priority - list[0].priority >= 5) {
                    list[0] = todos[0]
                }
            }
        }
        if(list.length) {
            console.log(list)
            this.setState({list, date: new Date()})
            return
        }
        return list
    }

    handleChange(e) {
        e.preventDefault()
        let mins = 0
        if(e.target.name === 'hours') {
            mins = e.target.value * 60
        }else {
            mins = e.target.value
        }
        this.setState({...this.state, dedication: this.state.dedication + mins})
    }

    completeTodo(e) {
        e.preventDefault()
    }

    removeTodo(e) {
        e.preventDefault()
    }


    render() {
        const allTodos = this.props.todos
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
                                    <button className="bucket-complete-todo" type="button" onClick={this.completeTodo} key={count}>
                                        <span/>&#9989;
                                    </button>
                                    <button className="bucket-remove-todo" type="button" onClick={this.removeTodo} key={count}>
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
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="number"
                            placeholder="0"
                            name="hours"
                            id="hours"
                            onChange={this.handleChange}
                        />
                        <p>Hours</p>
                        <input
                            type="number"
                            placeholder="0"
                            name="minutes"
                            id="minutes"
                            onChange={this.handleChange}
                        />
                        <p>Minutes</p>
                        <button className="bucket-remove-todo" type="submit" onClick={this.generateBucket} key={count}>
                            Generate BucketList
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos
})

const BucketList = connect(mapStateToProps)(DisconnectedBucketList)

export default BucketList