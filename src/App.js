import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import User from './components/User'
import { getUser } from './store/user'
import Main from './components/Main'
import Navbar from './components/Navbar'
import { firebase } from './firestore'


class DisconnectedApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.getUser(user.uid)
        this.setState({isLoggedIn: true})
      } else {
        // No user is signed in.
        console.log('No user is signed in!')
      }
    })
  }

  handleSignOut = () => {
    firebase.auth().signOut()
    .then( () => {
      console.log('Sign out successful!')
    })
    .catch( error => {
      console.log('An error occurred while signing out!' + error)
    })
    this.setState({isLoggedIn: false})
  }

  render() {
    return (
      <div id='app'>
        <div id="header">
          <h1>Byte Sized Buckets</h1>
          {
            this.state.isLoggedIn ? null : <p><strong>Breaking down your growing to-do list into digestable daily buckets!</strong></p>
          }
        </div>
        {
          this.state.isLoggedIn ?
          <div id='nav-main'>
            <Navbar />
            <Main />
          </div>
          :
          <div id='user'>
            <User />
          </div>
        }
        <button id='button-signout' onClick={this.handleSignOut}>Sign Out</button>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getUser: (uid) => {
    dispatch(getUser(uid))
  }
})

const App = connect(null, mapDispatchToProps)(DisconnectedApp)

export default App
