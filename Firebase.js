
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA-7dDL-RzS6VITxUWXITgu6XVvE0lvYlU",
  authDomain: "thread-clone-e7940.firebaseapp.com",
  projectId: "thread-clone-e7940",
  storageBucket: "thread-clone-e7940.appspot.com",
  messagingSenderId: "465095138545",
  appId: "1:465095138545:web:15e0fe398579d0a48d1d50"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };