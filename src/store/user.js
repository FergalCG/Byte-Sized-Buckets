import {db} from '../firestore'

const GOT_USER = 'GOT_USER'

const initialState = {
    fullName: '',
    email: ''
}

export const gotUser = user => ({ type: GOT_USER, user})

export const getUser = uid => async dispatch => {
    console.log('attempting to get')
    try {
        const data = await db.collection('users').doc(uid).get().data()
        dispatch(gotUser(data))
    } catch (err) {
        console.log('Error fetching user!' + err)
    }
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