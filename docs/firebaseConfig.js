import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBxuqejpdAdgltobX7tFD_Du6UE9_dTp_c",
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
