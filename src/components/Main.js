import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllTodos from './AllTodos'
import TodoForm from './TodoForm'
import BucketList from './BucketList'
import { getTodos } from '../store/todos'
import * as firebase from "firebase"
import "../firestore"

export let chooseView = function(bool) {
    if(this && this.state.allTodos !== bool) {
        this.setState({allTodos: bool})
    }
}

class DisconnectedMain extends Component {
    constructor() {
        super()
        this.state = {
            allTodos: true,
            formVisible: true
        }
        chooseView = chooseView.bind(this)
    }

    componentDidMount() {
        this.props.getTodos(firebase.auth().currentUser.uid)
    }

    render() {
        return (
            <div id="main">
                {
                    this.state.allTodos ?
                    <div id='todos-and-form'>
                        <AllTodos />
                        {
                            this.state.formVisible ?
                            <TodoForm />
                            :
                            null
                        }
                    </div>
                    :
                    <div id='bucket'>
                        <BucketList />
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getTodos: (uid) => {
        dispatch(getTodos(uid))
    }
})

const Main = connect(null, mapDispatchToProps)(DisconnectedMain)

export default Main