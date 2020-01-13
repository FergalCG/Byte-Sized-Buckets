import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import User from './components/User'
import { getUser } from './store/user'
import Main from './components/Main'
import Navbar from './components/Navbar'
// import store from './store'
import { firebase } from './firestore'

// export let appStateChange = function() {
//   console.log(store.getState().user.user)
//   this.setState({isLoggedIn: store.getState().user.user.isLoggedIn})
// }

class DisconnectedApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    console.log(firebase.auth().currentUser)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(user.uid)
        this.props.getUser(user.uid)
        this.setState({isLoggedIn: true})
      } else {
        // No user is signed in.
        console.log('No user is signed in!')
      }
    })
    // if(firebase.auth().currentUser.uid) {
    //   this.setState({isLoggedIn: false})
    // }
  }

  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      console.log('Sign out successful!')
    }).catch(function(error) {
      console.log('An error occurred while signing out!' + error)
    })
    this.setState({isLoggedIn: false})
  }

  render() {
    return (
      <div id='main'>
        <div id="header">
          <h1>Byte Sized Buckets</h1>
          {
            this.state.isLoggedIn ? null : <p><strong>Breaking down your growing to-do list into digestable daily buckets!</strong></p>
          }
        </div>
        {
          this.state.isLoggedIn ?
          <div>
            <Navbar />
            <Main />
          </div>
          :
          <div id='user'>
            <User />
          </div>
        }
        <button onClick={this.handleSignOut}>Sign Out</button>
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
