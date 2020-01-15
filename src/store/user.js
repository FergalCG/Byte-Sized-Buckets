import {db} from '../firestore'

const GOT_USER = 'GOT_USER'

const initialState = {
    fullName: '',
    email: ''
}

export const gotUser = user => ({ type: GOT_USER, user})

export const getUser = uid => dispatch => {
    console.log('attempting to get')
    db.collection('users').doc(uid).get()
    .then( doc => {
        console.log(doc.data())
        dispatch(gotUser({...doc.data()}))
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_USER:
            return {...state, fullName: action.user.fullName, email: action.user.email}
        default:
            return state
    }
}

export default reducer