// Public Firebase configuration used by the GitHub Pages build.
// The API key below is safe to expose but be sure your
// Firebase Storage rules restrict writes to authenticated users.
const firebaseConfig = {
  apiKey: "AIzaSyBxuqejpdAdgltobX7tFD_Du6UE9_dTp_c",
  authDomain: "city-hive-90f1e.firebaseapp.com",
  projectId: "city-hive-90f1e",
  storageBucket: "city-hive-90f1e.firebasestorage.app",
  messagingSenderId: "111416325340",
  appId: "1:111416325340:web:0804bbbed2647f57ce7019",
  measurementId: "G-LY3CH0HXDK"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();
