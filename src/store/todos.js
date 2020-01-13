import {db, firebase} from '../firestore'

const REMOVE_TODO = 'REMOVE_TODO'
const ADD_TODO = 'ADD_TODO'
const GOT_TODOS = 'GOT_TODOS'


const initialState = {
    todos: []
}


export const gotTodos = todos => ({ type: GOT_TODOS, todos})
export const addTodo = todo => ({ type: ADD_TODO, todo})
export const removeTodo = newTodos => ({ type: REMOVE_TODO, newTodos})


export const dispatchRemoveTodo = (uid, newTodos) => dispatch => {
    console.log('attempting to remove' + newTodos)
    db.collection('users').doc(uid).update({
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

export const dispatchAddTodo = (uid, todo) => dispatch => {
    console.log('attempting to add' + todo)
    db.collection('users').doc(uid).update({
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

export const dispatchSetTodos = (uid, todos) => dispatch => {
    console.log('attempting to set')
    db.collection('users').doc(uid).set({allTodos: todos})
    .then( () => {
        console.log('success setting todos')
    })
    .catch( err => {
        console.log('Error setting todos' + err)
    })
    dispatch(gotTodos(todos))
}

export const getTodos = uid => dispatch => {
    console.log('attempting to get')
    db.collection('users').doc(uid).get()
    .then( doc => {
        if(doc.data().allTodos) {
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