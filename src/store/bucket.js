import { db } from '../firestore'

const REMOVE_BUCKET_TODO = 'REMOVE_BUCKET_TODO'
const GOT_BUCKET = 'GOT_BUCKET'

const initialState = {
    bucket: []
}

export const gotBucket = bucket => ({ type: GOT_BUCKET, bucket})
export const removeBucketTodo = newBucket => ({ type: REMOVE_BUCKET_TODO, newBucket})


export const getBucket = email => dispatch => {
    
}

export const dispatchRemoveBucketTodo = (email, newBucket) => dispatch => {
    console.log('attempting to remove from bucket' + newBucket)
    db.collection('users').doc(email).update({
        bucket: newBucket
    })
    .then( () => {
        console.log('success removing from bucket')
    })
    .catch( err => {
        console.log('removing from bucket' + err)
    })
    dispatch(removeBucketTodo(newBucket))
}

export const setBucket = (email, bucket) => dispatch => {
    console.log('attempting to set')
    db.collection('users').doc(email).set({bucket: bucket})
    .then( () => {
        console.log('success setting todos')
    })
    .catch( err => {
        console.log('Error setting todos' + err)
    })
    dispatch(gotBucket(bucket))
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_BUCKET:
            return {...state, bucket: action.bucket}
        case REMOVE_BUCKET_TODO:
            return {...state, bucket: action.newBucket}
        default:
            return state
    }
}

export default reducer