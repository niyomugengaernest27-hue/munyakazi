
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


// ==========================================
// DISPLAY FIREBASE ERROR MESSAGES
// ==========================================

function showError(error) {
    const errors = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Your password is too weak.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/unauthorized-domain": "This website domain is not authorized in Firebase.",
        "auth/operation-not-allowed": "Email and Password sign-in is not enabled in Firebase.",
        "permission-denied": "Database permission denied. Please check your Firestore rules.",
        "unavailable": "Service temporarily unavailable. Please try again."
    };

    return errors[error.code] || error.message || "Something went wrong. Please try again.";
}


// ==========================================
// STUDENT SIGN UP
// ==========================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("signupMessage");
        const button = signupForm.querySelector('button[type="submit"]');

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        if (password.length < 8) {
            message.textContent = "Password must contain at least 8 characters.";
            return;
        }

        try {

            button.disabled = true;
            message.textContent = "Creating your account...";

            // Create Firebase account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // Update student's profile
            await updateProfile(user, {
                displayName: name
            });

            // Save student details in Firestore
            await setDoc(doc(db, "students", user.uid), {
                fullName: name,
                email: email,
                phone: phone,
                createdAt: serverTimestamp()
            });

            message.textContent = "Registration successful! Welcome to ILC.";

            // Open student homepage
            window.location.href = "home.html";

        } catch (error) {

            console.error("Signup error:", error);

            message.textContent = showError(error);

        } finally {

            button.disabled = false;

        }

    });

}


// ==========================================
// STUDENT LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("loginMessage");
        const button = loginForm.querySelector('button[type="submit"]');

        try {

            button.disabled = true;
            message.textContent = "Signing in...";

            // Sign in student
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.textContent = "Login successful!";

            // Open student homepage
            window.location.href = "home.html";

        } catch (error) {

            console.error("Login error:", error);

            message.textContent = showError(error);

        } finally {

            button.disabled = false;

        }

    });

}


// ==========================================
// FORGOT PASSWORD
// ==========================================

const resetButton = document.getElementById("resetPassword");

if (resetButton) {

    resetButton.addEventListener("click", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("loginMessage");

        if (!email) {
            message.textContent = "Please enter your email address first.";
            return;
        }

        try {

            await sendPasswordResetEmail(auth, email);

            message.textContent = "Password reset email sent. Check your inbox.";

        } catch (error) {

            console.error("Password reset error:", error);

            message.textContent = showError(error);

        }

    });

}


// ==========================================
// STUDENT LOGOUT
// ==========================================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async function() {

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (error) {

            console.error("Logout error:", error);

            alert(showError(error));

        }

    });

}
