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
        this.props.dispatchGetTodos(firebase.auth().currentUser.uid)
        this.props.dispatchGetBucket(firebase.auth().currentUser.uid)
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
                    <div id='bucketList-and-form'>
                        <BucketList />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allTodos: state.user.allTodos,
    formVisible: state.user.formVisible
})

const mapDispatchToProps = dispatch => ({
    dispatchGetTodos: (uid) => {
        dispatch(getTodos(uid))
    },
    dispatchGetBucket: (uid) => {
        dispatch(getBucket(uid))
    }
})

const Main = connect(mapStateToProps, mapDispatchToProps)(DisconnectedMain)

export default Main