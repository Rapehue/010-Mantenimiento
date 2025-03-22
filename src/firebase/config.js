// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA8KzILLU3Xm_BNFgB9V1_dcQ3pdZ5MOI",
    authDomain: "react-cursos-7869e.firebaseapp.com",
    projectId: "react-cursos-7869e",
    storageBucket: "react-cursos-7869e.firebasestorage.app",
    messagingSenderId: "530148564370",
    appId: "1:530148564370:web:1b0341b4ff389c51f3b54b"
  };

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );