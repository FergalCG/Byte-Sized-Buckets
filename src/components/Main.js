import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllTodos from './AllTodos'
import TodoForm from './TodoForm'
import BucketList from './BucketList'
import { getTodos } from '../store/todos'
import { getBucket } from '../store/bucket'
import * as firebase from "firebase"
import "../firestore"


class DisconnectedMain extends Component {

    componentDidMount() {
        this.props.getTodos(firebase.auth().currentUser.uid)
        this.props.getBucket(firebase.auth().currentUser.uid)
    }

    render() {
        return (
            <div id="main">
                {
                    this.props.allTodos ?
                    <div id='todos-and-form'>
                        <AllTodos />
                        {
                            this.props.formVisible ?
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

const mapStateToProps = state => ({
    allTodos: state.user.allTodos,
    formVisible: state.user.
})

const mapDispatchToProps = dispatch => ({
    getTodos: (uid) => {
        dispatch(getTodos(uid))
    },
    getBucket: (uid) => {
        dispatch(getBucket(uid))
    },
    toggleForm: bool => {
        dispatch(toggleForm(bool))
    }
})

const Main = connect(mapStateToProps, mapDispatchToProps)(DisconnectedMain)

export default Main