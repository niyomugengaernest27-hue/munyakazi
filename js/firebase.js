
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZsJbNVS47Eq0menylW_QKrySem9AF8Yc",
    authDomain: "ilc-advertisment.firebaseapp.com",
    projectId: "ilc-advertisment",
    storageBucket: "ilc-advertisment.firebasestorage.app",
    messagingSenderId: "967263677839",
    appId: "1:967263677839:web:6e2b0c6280ffb6eb832ffa",
    measurementId: "G-3K8R7NFBD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
