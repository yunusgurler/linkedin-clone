import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCa0NrKRur7zhiO2zrEzAUhk0mWJ9an3yg",
    authDomain: "linkedin-clone-6223b.firebaseapp.com",
    projectId: "linkedin-clone-6223b",
    storageBucket: "linkedin-clone-6223b.appspot.com",
    messagingSenderId: "223639486668",
    appId: "1:223639486668:web:ee593a17cac8faf8edc269"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export { db, auth };