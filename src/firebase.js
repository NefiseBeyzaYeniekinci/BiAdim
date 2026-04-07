import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCwqz-fvR-x-iZBVdtwo-oAsFZTn_oZhSU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "biadim-dd245.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "biadim-dd245",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "biadim-dd245.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "240820209746",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:240820209746:web:74561dcec434837fddf78b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
