import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkbmwJNOVqiMqbMZ2ICDNzH04ywEArkhk",
  authDomain: "clone2024-f6a21.firebaseapp.com",
  projectId: "clone2024-f6a21",
  storageBucket: "clone2024-f6a21.appspot.com",
  messagingSenderId: "90724272258",
  appId: "1:90724272258:web:6e0bcd7904224943c88c9b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
