// Copy this file to firebaseConfig.local.js and fill in your Firebase credentials
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "city-hive-90f1e.firebaseapp.com",
  projectId: "city-hive-90f1e",
  storageBucket: "city-hive-90f1e.firebasestorage.app",
  messagingSenderId: "111416325340",
  appId: "1:111416325340:web:0804bbbed2647f57ce7019",
  measurementId: "G-LY3CH0HXDK"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (!user) signInAnonymously(auth).catch(console.error);
});
