// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1Km-oTc2EvuMNRy3e68buaqcC8i4yBNQ",
    authDomain: "challenge-f6ef6.firebaseapp.com",
    projectId: "challenge-f6ef6",
    storageBucket: "challenge-f6ef6.appspot.com",
    messagingSenderId: "554454308878",
    appId: "1:554454308878:web:cf57c6af8e71841b84c45f",
    measurementId: "G-W6R1V6M8BG"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };