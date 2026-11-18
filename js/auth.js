
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


// ========================================
// DISPLAY ERROR MESSAGES
// ========================================

function showError(error) {
    console.error("Firebase Error:", error.code, error.message);

    const errors = {
        "auth/email-already-in-use":
            "This email is already registered. Please login.",

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/weak-password":
            "Your password must contain at least 8 characters.",

        "auth/invalid-credential":
            "Incorrect email or password. Check your details.",

        "auth/user-not-found":
            "No account exists with this email.",

        "auth/wrong-password":
            "Incorrect password. Please try again.",

        "auth/unauthorized-domain":
            "This website domain is not authorized in Firebase.",

        "auth/operation-not-allowed":
            "Email and Password authentication is not enabled.",

        "auth/too-many-requests":
            "Too many attempts. Please wait and try again.",

        "auth/network-request-failed":
            "Check your internet connection.",

        "auth/missing-email":
            "Please enter your email address first.",

        "auth/invalid-api-key":
            "Firebase API key is invalid.",

        "permission-denied":
            "Database permission denied. Check Firestore rules."
    };

    return errors[error.code] ||
        error.message ||
        "Something went wrong. Please try again.";
}


// ========================================
// STUDENT SIGN UP
// ========================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async (event) => {

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
            message.style.color = "green";
            message.textContent = "Creating your account...";

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });

            await setDoc(doc(db, "students", user.uid), {
                fullName: name,
                email: email,
                phone: phone,
                createdAt: serverTimestamp()
            });

            message.textContent = "Account created successfully!";

            window.location.href = "home.html";

        } catch (error) {

            message.style.color = "red";
            message.textContent = showError(error);

        } finally {

            button.disabled = false;

        }

    });

}


// ========================================
// STUDENT LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("loginMessage");
        const button = loginForm.querySelector('button[type="submit"]');

        try {

            button.disabled = true;
            message.style.color = "blue";
            message.textContent = "Signing in...";

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.style.color = "green";
            message.textContent = "Login successful! Welcome to ILC.";

            window.location.href = "home.html";

        } catch (error) {

            message.style.color = "red";
            message.textContent = "LOGIN FAILED: " + showError(error);

        } finally {

            button.disabled = false;

        }

    });

}


// ========================================
// FORGOT PASSWORD
// ========================================

const resetButton = document.getElementById("resetPassword");

if (resetButton) {

    resetButton.addEventListener("click", async (event) => {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("loginMessage");

        if (!email) {
            message.style.color = "red";
            message.textContent = "Please enter your email address first.";
            document.getElementById("email").focus();
            return;
        }

        try {

            resetButton.style.pointerEvents = "none";
            message.style.color = "blue";
            message.textContent = "Sending password reset email...";

            await sendPasswordResetEmail(auth, email);

            message.style.color = "green";
            message.textContent =
                "Password reset email sent! Check your inbox and spam folder.";

        } catch (error) {

            message.style.color = "red";
            message.textContent = showError(error);

        } finally {

            resetButton.style.pointerEvents = "auto";

        }

    });

}


// ========================================
// STUDENT LOGOUT
// ========================================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (error) {

            alert(showError(error));

        }

    });

}
