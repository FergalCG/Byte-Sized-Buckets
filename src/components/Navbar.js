import React, { Component } from 'react'
import { connect } from 'react-redux'
import { chooseView } from '../store/user'

class DisconnectedNavbar extends Component {
    render() {
        return (
            <div id='navbar'>
                <h4 onClick={() => this.props.dispatchChooseView(true)}>All Todos</h4>
                <h4 onClick={() => this.props.dispatchChooseView(false)}>Daily Bucket</h4>
                <h4 onClick={() => this.props.handleSignOut()}>Sign Out</h4>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchChooseView: bool => {
        dispatch(chooseView(bool))
    }
})

const Navbar = connect(null, mapDispatchToProps)(DisconnectedNavbar)

export default Navbar