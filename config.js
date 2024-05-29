import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCoTW0hAYTQIXxDYJTqHV_RK8AjZLfkBXI",
    authDomain: "spectagram-83e1c.firebaseapp.com",
    projectId: "spectagram-83e1c",
    storageBucket: "spectagram-83e1c.appspot.com",
    messagingSenderId: "549448904131",
    appId: "1:549448904131:web:6747bb0deb93459e66a176"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
