import React from 'react'
import { chooseView } from './Main'

const Navbar = (props) => {
    return (
        <div id='navbar'>
            <h4 onClick={() => chooseView(true)}>All Todos</h4>
            <h4 onClick={() => chooseView(false)}>Daily Bucket</h4>
            <h4 onClick={() => props.handleSignOut()}>Sign Out</h4>
            {/* <button id='button-signout' onClick={this.handleSignOut}></button> */}
        </div>
    )
}

export default Navbar