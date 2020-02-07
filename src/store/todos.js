import {db, firebase} from '../firestore'

const REMOVE_TODO = 'REMOVE_TODO'
const ADD_TODO = 'ADD_TODO'
const GOT_TODOS = 'GOT_TODOS'


const initialState = {
    todos: []
}


export const gotTodos = todos => ({ type: GOT_TODOS, todos})
export const addTodo = todos => ({ type: ADD_TODO, todos})
export const removeTodo = todo => ({ type: REMOVE_TODO, todo})


export const dispatchRemoveTodo = (uid, todo) => async dispatch => {
    console.log('attempting to remove todo' + todo)
    try {
        dispatch(removeTodo(todo))
        await db.collection('users').doc(uid).update({
            allTodos: firebase.firestore.FieldValue.arrayRemove(JSON.parse(todo))
        })
        console.log('success removing todo')
    } catch(err) {
        console.log('Error removing todo' + err)
    }
}

export const dispatchAddTodo = (uid, todo, todos) => async dispatch => {
    console.log('attempting to add todo' + todo)
    const newTodos = insertTodo(todos, todo)
    try {
        dispatch(addTodo(newTodos))
        await db.collection('users').doc(uid).set({
            allTodos: newTodos
        }, {merge: true})
        console.log('success adding todo')
    } catch(err) {
        console.log('Error adding todo' + err)
    }
}

export const dispatchSetTodos = (uid, todos) => async dispatch => {
    console.log('attempting to set todos')
    try {
        dispatch(gotTodos(todos))
        await db.collection('users').doc(uid).set({allTodos: todos}, {merge: true})
        console.log('success setting todos')
    } catch(err) {
        console.log('Error setting todos' + err)
    }
}

export const getTodos = uid => async dispatch => {
    console.log('attempting to get todos')
    try {
        const doc = await db.collection('users').doc(uid).get()
        if(doc.data().allTodos) {
            dispatch(gotTodos(doc.data().allTodos))
        }else {
            console.log('No todos to fetch!')
        }
    } catch (err) {
        console.log('Error fetching todos' + err)
    }
}

const insertTodo = (todos, todo) => {
    let newTodos = [],
        startLength = todos.length
    for(let i = 0; i < todos.length; i++) {
        if(todos[i].priority === todo.priority) {
            newTodos.push(todos[i], todo)
            pushRest(newTodos, todos, ++i)
            break
        }else if(todos[i].priority < todo.priority) {
            newTodos.push(todo, todos[i])
            pushRest(newTodos, todos, ++i)
            break
        }else {
            newTodos.push(todos[i])
        }
    }
    if(newTodos.length === startLength) {
        newTodos.push(todo)
    }
    return newTodos
}

const pushRest = (newTodos, todos, i) => {
    for(i; i < todos.length; i++) {
        newTodos.push(todos[i])
    }
}


const reducer = (state = initialState, action) => {
    let newTodos
    switch(action.type) {
        case GOT_TODOS:
            return {...state, todos: action.todos}
        case ADD_TODO:
            return {...state, todos: action.todos}
        case REMOVE_TODO:
            newTodos = state.todos.filter( todo => {
                return JSON.stringify(todo) !== action.todo
            })
            return {...state, todos: newTodos}
        default:
            return state
    }
}


export default reducer