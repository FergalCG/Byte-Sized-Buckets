import {db} from '../firestore'
import { appStateChange } from '../App.js'

const GOT_USER = 'GOT_USER'

const initialState = {
    user: {
        fullname: '',
        email: '',
        isLoggedIn: false
    }
}

export const gotUser = user => ({ type: GOT_USER, user})

export const getUser = email => dispatch => {
    console.log('attempting to get')
    db.collection('users').doc(email).get()
    .then( doc => {
        dispatch(gotUser({...doc.data(), isLoggedIn: true}))
    })
    .then( () => {
        console.log('changing app state')
        appStateChange()
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_USER:
            return {...state, user: action.user}
        default:
            return state
    }
}

export default reducer