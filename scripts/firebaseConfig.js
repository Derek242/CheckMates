// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaqfaNccJMSE5F65q3yHn2amN6LFkcGHY",
  authDomain: "newcheckmates.firebaseapp.com",
  projectId: "newcheckmates",
  storageBucket: "newcheckmates.firebasestorage.app",
  messagingSenderId: "1008138000078",
  appId: "1:1008138000078:web:686eb967207e9bda25229f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Get Firebase Authentication instance
const auth = getAuth(app);

export { auth };