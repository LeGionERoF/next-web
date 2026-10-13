import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDvWb8vimXmUamyB70bZc-ANrl-kCQ318",
  authDomain: "website-for-project.firebaseapp.com",
  projectId: "website-for-project",
  storageBucket: "website-for-project.firebasestorage.app",
  messagingSenderId: "438359763505",
  appId: "1:438359763505:web:b032d5391a69cfd046c310"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Инициализируем сервисы
export const auth = getAuth(app);
export const db = getFirestore(app);

