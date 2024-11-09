// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
//import '@react-native-firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDgDPOBSQ8Vx6wNKUejBfw9YRhvfB35KIY",
  authDomain: "checkmates-a47d9.firebaseapp.com",
  projectId: "checkmates-a47d9",
  storageBucket: "checkmates-a47d9.firebasestorage.app",
  messagingSenderId: "366732803785",
  appId: "1:366732803785:web:ccfca332ccdea6267fd718",
  measurementId: "G-1F2K0BT729"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth };