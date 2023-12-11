// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1FbAwSQo3YiPF-IjPLYZle_Q4Rk_uQtQ",
    authDomain: "int305fb018.firebaseapp.com",
    projectId: "int305fb018",
    storageBucket: "int305fb018.appspot.com",
    messagingSenderId: "841156331325",
    appId: "1:841156331325:web:191a21010718b16d09e754"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init Firestore service
const db = getFirestore()
export default db