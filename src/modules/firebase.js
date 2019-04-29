import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBn9bHdc-raNHDNVRKIbvwCw-3pvz5fhOk',
  authDomain: 'tw-tictactoe.firebaseapp.com',
  databaseURL: 'https://tw-tictactoe.firebaseio.com',
  projectId: 'tw-tictactoe',
  storageBucket: 'tw-tictactoe.appspot.com',
  messagingSenderId: '151883844041'
})

export default app