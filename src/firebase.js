import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBBRDLUWwYqWjZQBrpypWVcaGtACSbsvv8",
  authDomain: "hold-my-anime.firebaseapp.com",
  projectId: "hold-my-anime",
  storageBucket: "hold-my-anime.appspot.com",
  messagingSenderId: "1016072282801",
  appId: "1:1016072282801:web:fcf54dd5e2df1154d1f890",
  measurementId: "G-Y6CMZBJLW0",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
