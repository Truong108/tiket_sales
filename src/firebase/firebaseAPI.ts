import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAS3jmB49LW9W3HyMsG1213zm7E530PXI4",
    authDomain: "api-reactjs-87e72.firebaseapp.com",
    databaseURL: "https://api-reactjs-87e72-default-rtdb.firebaseio.com",
    projectId: "api-reactjs-87e72",
    storageBucket: "api-reactjs-87e72.appspot.com",
    messagingSenderId: "656756019577",
    appId: "1:656756019577:web:bb99018569a58f47ab9fa8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const api = getFirestore(app);

export default api;
// Import the functions you need from the SDKs you need

