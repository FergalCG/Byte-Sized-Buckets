import React, { Component } from 'react'
import { connect } from 'react-redux'
import { db } from "../firestore"
import { getUser } from '../store/user'


class DisconnectedUser extends Component {

    constructor() {
        super()
        this.state = {
         email: '',
         fullname: ''
        }
    }

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    addUser = e => {
        e.preventDefault()
        db.collection('users').doc(this.state.email).set({
            fullname: this.state.fullname,
            email: this.state.email
        })
        .then( () => {
            console.log('user has been set')
        })
        this.props.getUser(this.state.email)
        this.setState({
          fullname: '',
          email: ''
        })
    }


    render() {
        return (
            <form onSubmit={this.addUser} id="user-form">
                <p>Login or Signup!</p>
                <input
                    type="text"
                    name="fullname"
                    placeholder="                Full name"
                    className="make-skinny"
                    onChange={this.updateInput}
                    value={this.state.fullname}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="                   Email"
                    className="make-skinny"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <button type="submit" className="make-skinny">Submit</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getUser: (email) => {
        dispatch(getUser(email))
    }
})

const User = connect(null, mapDispatchToProps)(DisconnectedUser)

export default User