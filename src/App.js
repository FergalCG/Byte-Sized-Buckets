import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import User from './components/User'
import AllTodos from './components/AllTodos'
import BucketList from './components/BucketList'
import TodoForm from './components/TodoForm'
import store from './store'

export let appStateChange = function() {
  console.log(store.getState().user.user)
  this.setState({isLoggedIn: store.getState().user.user.isLoggedIn})
}

class DisconnectedApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    }
    appStateChange = appStateChange.bind(this)
  }

  render() {
    return (
      <div id='main'>
          <div id="header">
            <h1>Byte Sized Buckets</h1>
            <p>Breaking down your growing to-do list into digestable daily buckets!</p>
          </div>
          {
          !this.state.isLoggedIn ?
          <div id='user'>
            <User />
          </div>
          :
          <div id="next">
            <div id='todos'>
              <AllTodos />
              <TodoForm />
            </div>
            <div id='bucket'>
              <BucketList />
            </div>
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.user.isLoggedIn
})

const App = connect(mapStateToProps)(DisconnectedApp)

export default App
