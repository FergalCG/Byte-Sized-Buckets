import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllTodos from './AllTodos'
import TodoForm from './TodoForm'
import BucketList from './BucketList'
import { getTodos } from '../store/todos'
import { getBucket } from '../store/bucket'
import * as firebase from "firebase"
import "../firestore"

export let chooseView = function(bool) {
    console.log(this)
    if(this && this.state.allTodos !== bool) {
        this.setState({allTodos: bool})
    }
}

export let toggleForm = function() {
    // console.log(this)
    if(this) {
        this.setState({formVisible: !this.state.formVisible})
    }
}

class DisconnectedMain extends Component {
    constructor() {
        super()
        this.state = {
            allTodos: true,
            formVisible: false
        }
        chooseView = chooseView.bind(this)
        toggleForm = toggleForm.bind(this)
    }

    componentDidMount() {
        this.props.getTodos(firebase.auth().currentUser.uid)
        this.props.getBucket(firebase.auth().currentUser.uid)
        console.log(this)
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
    },
    getBucket: (uid) => {
        dispatch(getBucket(uid))
    }
})

const Main = connect(null, mapDispatchToProps)(DisconnectedMain)

export default Main