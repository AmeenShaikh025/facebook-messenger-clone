import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDhD8-7salQe1Bu71ujFaZn3MaP4aJG9HY",
  authDomain: "facebook-messenger-clone-f60f4.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-f60f4.firebaseio.com",
  projectId: "facebook-messenger-clone-f60f4",
  storageBucket: "facebook-messenger-clone-f60f4.appspot.com",
  messagingSenderId: "748198372713",
  appId: "1:748198372713:web:c0e90e627d0b1e2f6dc9f8",
  measurementId: "G-M6G4N9VYKF",
});

const db = firebaseApp.firestore();

export default db;
