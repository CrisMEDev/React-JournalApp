import 'firebase/firestore';
import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDWxc2dbcPMgBV_-V4tFBlo9ASbov-MPaE",
    authDomain: "react-journal-app-87868.firebaseapp.com",
    projectId: "react-journal-app-87868",
    storageBucket: "react-journal-app-87868.appspot.com",
    messagingSenderId: "597101956588",
    appId: "1:597101956588:web:dc57f3880bb06ec12204c9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = getFirestore();

// authProvider para autenticar con google
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}
