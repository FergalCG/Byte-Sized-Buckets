import React, { Component } from 'react'
import "../firestore"
import * as firebase from "firebase"
import { db, provider } from "../firestore"


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
    
    handleLogin = (e) => {
    e.preventDefault()
    console.log('about to login')
    firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( result => console.log(result.user))
        .catch(error => console.log(error))
    }

    handleSignUp = (e) => {
        e.preventDefault()
        console.log('about to create')
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(result => {
                let user = result.user
                db.collection("users").doc(user.uid).set(
                    {
                        fullName: this.state.fullName,
                        email: this.state.email
                    },
                    { merge: true }
                )
            })
            .catch(error => console.log(error))
    }

    handleGoogleAuth = () => {
        firebase.auth().signInWithPopup(provider)
        .then( result => {
            // The signed-in user info.
            let user = result.user
            db.collection("users").doc(user.uid).set(
                {
                    fullName: user.providerData.displayName,
                    email: user.providerData.email
                },
                { merge: true }
            )
        })
        .catch( error => {
            console.log(error)
        })
    }

    toggleSignUp = () => {
        this.setState({ signingUp: !this.state.signingUp })
    }


    render() {
        return (
            <div className = 'form-container'>
                {
                    this.state.signingUp ? 
                        <form onSubmit={this.handleSignUp} id="signup-form">
                            <p>Sign Up!</p>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                className="make-skinny"
                                onChange={this.updateInput}
                                value={this.state.fullName}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="make-skinny"
                                onChange={this.updateInput}
                                value={this.state.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="make-skinny"
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
                            className="make-skinny"
                            onChange={this.updateInput}
                            value={this.state.email}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="make-skinny"
                            onChange={this.updateInput}
                            value={this.state.password}
                        />
                        <button type="submit" className="make-skinny">Submit</button>
                        <p>Don't have an account? <u onClick={this.toggleSignUp}>Sign Up!</u></p>
                    </form>
                }
                <img src="https://blog.addthiscdn.com/wp-content/uploads/2015/11/Google_logo.png" alt="Google Button" onClick={this.handleGoogleAuth} height="42" width="42"/>
            </div>
        )
    }
}

export default User