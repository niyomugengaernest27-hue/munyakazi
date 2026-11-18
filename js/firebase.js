
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Replace these values with your actual Firebase Web App configuration
const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY_HERE",
    authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
    projectId: "PASTE_YOUR_PROJECT_ID_HERE",
    storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "PASTE_YOUR_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);
