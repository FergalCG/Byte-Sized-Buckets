import {db} from '../firestore'

const GOT_USER = 'GOT_USER'
const LOGOUT = 'LOGOUT'
const CHOOSE_VIEW = 'CHOOSE_VIEW'
const TOGGLE_FORM = 'TOGGLE_FORM'

const initialState = {
    fullName: '',
    email: '',
    isLoggedIn: false,
    allTodos: true,
    formVisible: false
}

export const gotUser = user => ({ type: GOT_USER, user })
export const logout = () => ({ type: LOGOUT })
export const chooseView = bool => ({ type: CHOOSE_VIEW, bool })
export const toggleForm = bool => ({ type: TOGGLE_FORM, bool })

export const getUser = uid => async dispatch => {
    console.log('attempting to get user')
    try {
        const doc = await db.collection('users').doc(uid).get()
        dispatch(gotUser(doc.data()))
    } catch (err) {
        console.log('Error fetching user!' + err)
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_USER:
            return {...state, fullName: action.user.fullName, email: action.user.email, isLoggedIn: true}
        case LOGOUT:
            return { ...state, fullName: '', email: '', isLoggedIn: false, allTodos: true, formVisible: false }
        case CHOOSE_VIEW:
            return {...state, allTodos: action.bool}
        case TOGGLE_FORM:
            return {...state, formVisible: action.bool}
        default:
            return state
    }
}

export default reducer