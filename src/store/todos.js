import db from '../firestore'
import firebase from 'firebase'

const REMOVE_TODO = 'REMOVE_TODO'
const ADD_TODO = 'ADD_TODO'
const GOT_TODOS = 'GOT_TODOS'


const initialState = {
    todos: []
}


export const gotTodos = todos => ({ type: GOT_TODOS, todos})
export const addTodo = todo => ({ type: ADD_TODO, todo})
export const removeTodo = newTodos => ({ type: REMOVE_TODO, newTodos})


export const dispatchRemoveTodo = (email, newTodos) => dispatch => {
    console.log('attempting to remove' + newTodos)
    db.collection('users').doc(email).update({
        allTodos: newTodos
    })
    .then( () => {
        console.log('success removing todo')
    })
    .catch( err => {
        console.log('Error removing todo' + err)
    })
    dispatch(removeTodo(newTodos))
}

export const dispatchAddTodo = (email, todo) => dispatch => {
    console.log('attempting to add' + todo)
    db.collection('users').doc(email).update({
        allTodos: firebase.firestore.FieldValue.arrayUnion(todo)
    })
    .then( () => {
        console.log('success adding todo')
    })
    .catch( err => {
        console.log('Error adding todo' + err)
    })
    dispatch(addTodo(todo))
}

export const dispatchSetTodos = (email, todos) => dispatch => {
    console.log('attempting to set')
    db.collection('users').doc(email).set({allTodos: todos})
    .then( () => {
        console.log('success setting todos')
    })
    .catch( err => {
        console.log('Error setting todos' + err)
    })
    dispatch(gotTodos(todos))
}

export const getTodos = email => dispatch => {
    console.log('attempting to get')
    db.collection('users').doc(email).get()
    .then( doc => {
        if(doc) {
            console.log(doc.data())
            dispatch(gotTodos(doc.data().allTodos))
        }else {
            console.log('Couldnt fetch todos!')
        }
    })
    .catch( err => {
        console.log('Error fetching todos' + err)
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_TODOS:
            return {...state, todos: action.todos}
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.todo]}
        case REMOVE_TODO:
            return {...state, todos: action.newTodos}
        default:
            return state
    }
}


export default reducer