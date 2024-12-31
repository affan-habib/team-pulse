import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDZ9gUwPTHQGZ9nJ9vz9rX5F5F5F5F5F5F",
  authDomain: "afeen-1210a.firebaseapp.com",
  projectId: "afeen-1210a",
  storageBucket: "afeen-1210a.appspot.com",
  messagingSenderId: "114006650540824955916",
  appId: "1:114006650540824955916:web:5f5f5f5f5f5f5f5f5f5f5f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);