// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD3Rvm3uvCZznm3mlNloUlsTjgjCUiOi0Q',
    authDomain: 'react-cursos-89381.firebaseapp.com',
    projectId: 'react-cursos-89381',
    storageBucket: 'react-cursos-89381.appspot.com',
    messagingSenderId: '638587284079',
    appId: '1:638587284079:web:2b51aeb5c41f27a6f3bb9a',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
