
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// ILC Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_REAL_API_KEY",
    authDomain: "YOUR_REAL_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_REAL_PROJECT_ID",
    storageBucket: "YOUR_REAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_REAL_MESSAGING_SENDER_ID",
    appId: "YOUR_REAL_APP_ID"
};

// Start Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firebase Database
export const db = getFirestore(app);
