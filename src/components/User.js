import React, { Component } from 'react'
import "../firestore"
import { db, firebase, provider } from "../firestore"


class User extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            fullName: '',
            signingUp: false
        }
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleLogin = async (e) => {
        e.preventDefault()
        console.log('about to login')
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        } catch (err) {
            console.log('Error with Login ' + err)
        }
    }

    handleSignUp = async (e) => {
        e.preventDefault()
        console.log('about to create')
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            await db.collection("users").doc(user.uid).set(
                {
                    fullName: this.state.fullName,
                    email: this.state.email
                },
                { merge: true }
            )
        } catch (err) {
            console.log('Error with Signup ' + err)
        }
    }

    handleGoogleAuth = async () => {
        try {
            const { user } = await firebase.auth().signInWithPopup(provider)
            await db.collection("users").doc(user.uid).set(
                {
                    fullName: user.displayName,
                    email: user.email
                },
                { merge: true }
            )
        } catch (err) {
            console.log('Error with Google Auth ' + err)
        }
    }

    toggleSignUp = () => {
        this.setState({ signingUp: !this.state.signingUp })
    }


    render() {
        return (
            <div id = 'user-form-container'>
                {
                    this.state.signingUp ? 
                        <form onSubmit={this.handleSignUp} id="signup-form">
                            <p>Sign Up!</p>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                className="user-input"
                                onChange={this.updateInput}
                                value={this.state.fullName}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="user-input"
                                onChange={this.updateInput}
                                value={this.state.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="user-input"
                                onChange={this.updateInput}
                                value={this.state.password}
                            />
                            <button type="submit" className="make-skinny">Submit</button>
                            <p>Already have an account? <u onClick={this.toggleSignUp}>Login!</u></p>
                        </form>
                        
                    :
                    <form onSubmit={this.handleLogin} id="login-form">
                        <p>Login!</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="user-input"
                            onChange={this.updateInput}
                            value={this.state.email}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="user-input"
                            onChange={this.updateInput}
                            value={this.state.password}
                        />
                        <button type="submit" className="make-skinny">Submit</button>
                        <p>Don't have an account? <u onClick={this.toggleSignUp}>Sign Up!</u></p>
                    </form>
                }
                <img id='google-button' src="https://blog.addthiscdn.com/wp-content/uploads/2015/11/Google_logo.png" alt="Google Button" onClick={this.handleGoogleAuth} height="42" width="42"/>
            </div>
        )
    }
}

export default User