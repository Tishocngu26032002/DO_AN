import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5j1hFZ-4u-GzrP_W2IibhmRUo3KuA6YA",
  authDomain: "shop2-91e6d.firebaseapp.com",
  projectId: "shop2-91e6d",
  storageBucket: "shop2-91e6d.firebasestorage.app",
  messagingSenderId: "430040530131",
  appId: "1:430040530131:web:e4d9cc6011d4f82ccbe826",
  measurementId: "G-NL9830YF4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
