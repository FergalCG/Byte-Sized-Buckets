import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import User from './components/User'
import { getUser, logout } from './store/user'
import Main from './components/Main'
import Navbar from './components/Navbar'
import { firebase } from './firestore'


class DisconnectedApp extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.getUser(user.uid)
      } else {
        // No user is signed in.
        console.log('No user is signed in!')
      }
    })
  }

  handleSignOut = async () => {
    try {
      this.props.logout()
      await firebase.auth().signOut()
      console.log('Sign out successful!')
    } catch (err) {
      console.log('An error occurred while signing out!' + err)
    }
  }

  render() {
    return (
      <div id='app'>
        <div id="header-container">
          <h1>Byte Sized Buckets</h1>
          {
            this.props.isLoggedIn ? null : (
              <p><strong>Breaking down your growing to-do list into digestable daily buckets!</strong></p>
              
            )
          }
        </div>
        {
          this.props.isLoggedIn ?
          <div id='nav-main-container'>
            <Navbar handleSignOut={this.handleSignOut}/>
            <Main />
          </div>
          :
          <div id='user-container'>
            <User />
          </div>
        }
        
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getUser: (uid) => {
    dispatch(getUser(uid))
  },
  logout: () => {
    dispatch(logout())
  }
})

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
})

const App = connect(mapStateToProps, mapDispatchToProps)(DisconnectedApp)

export default App
