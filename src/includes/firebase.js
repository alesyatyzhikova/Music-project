import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvjop728XEY9-UUABmOT70raHdwWQ1OBs',
  authDomain: 'music-9eee7.firebaseapp.com',
  projectId: 'music-9eee7',
  storageBucket: 'music-9eee7.appspot.com',
  messagingSenderId: '515184538949',
  appId: '1:515184538949:web:226376cb983bde15c0fa2c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};
