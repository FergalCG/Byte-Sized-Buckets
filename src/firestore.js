import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCfXy4jaY5qkWg01sxfI6DhbtMU9Ao2cOw",
    authDomain: "byte-sized-buckets.firebaseapp.com",
    databaseURL: "https://byte-sized-buckets.firebaseio.com",
    projectId: "byte-sized-buckets",
    storageBucket: "byte-sized-buckets.appspot.com",
    messagingSenderId: "927776809010",
    appId: "1:927776809010:web:fe084012803c224866dc2b",
    measurementId: "G-9NHR7FRQV7"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider();

db.enablePersistence()
.catch( err => {
    if (err.code === 'failed-precondition') {
        console.log('ERROR WITH FIRESTORE PERSISTENCE - CODE:01' + err)
    } else if (err.code === 'unimplemented') {
        console.log('ERROR WITH FIRESTORE PERSISTENCE - CODE:02' + err)
    }
})

export { db, firebase, provider }