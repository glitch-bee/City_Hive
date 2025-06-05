// Copy this file to firebaseConfig.local.js and fill in your Firebase credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
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
