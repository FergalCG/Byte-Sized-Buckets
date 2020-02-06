import { db, firebase } from '../firestore'

const REMOVE_BUCKET_TODO = 'REMOVE_BUCKET_TODO'
const GOT_BUCKET = 'GOT_BUCKET'

const initialState = {
    bucket: []
}

export const gotBucket = bucket => ({ type: GOT_BUCKET, bucket})
export const removeBucketTodo = todo => ({ type: REMOVE_BUCKET_TODO, todo})


export const getBucket = uid => async dispatch => {
    console.log('attempting to get current bucket...')
    try {
        const doc = await db.collection('users').doc(uid).get()
        if(doc.data().bucket) {
            dispatch(gotBucket(doc.data().bucket))
        }else {
            console.log('Could not find a bucket to fetch!')
        }
    } catch (err) {
        console.log('Error fetching todos' + err)
    }
}

export const dispatchRemoveBucketTodo = (uid, todo) => async dispatch => {
    console.log('attempting to remove from bucket' + todo)
    try {
        dispatch(removeBucketTodo(todo))
        await db.collection('users').doc(uid).update({
            bucket: firebase.firestore.FieldValue.arrayRemove(JSON.parse(todo))
        })
        console.log('success removing from bucket')
    } catch(err) {
        console.log('removing from bucket' + err)
    }
}

export const setBucket = (uid, bucket) => async dispatch => {
    console.log('attempting to set bucket')
    try {
        dispatch(gotBucket(bucket))
        await db.collection('users').doc(uid).set({bucket: bucket}, {merge: true})
        console.log('success setting bucket')
    } catch (err) {
        console.log('Error setting todos' + err)
    }
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_BUCKET:
            return {...state, bucket: action.bucket}
        case REMOVE_BUCKET_TODO:
            let newBucket = state.bucket.filter( todo => {
                return JSON.stringify(todo) !== action.todo
            })
            return {...state, bucket: newBucket}
        default:
            return state
    }
}

export default reducer