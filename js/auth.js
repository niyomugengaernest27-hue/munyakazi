
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


// =====================================
// STUDENT SIGN UP
// =====================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

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

            // Create Firebase Authentication account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // Save student's name in Authentication profile
            await updateProfile(user, {
                displayName: name
            });

            // Save student information in Firestore
            await setDoc(doc(db, "students", user.uid), {
                fullName: name,
                email: email,
                phone: phone,
                createdAt: serverTimestamp()
            });

            message.textContent = "Account created successfully!";

            signupForm.reset();

            // Go to the website homepage
            window.location.href = "home.html";

        } catch (error) {

            console.error(error);

            message.textContent = error.message;

        } finally {

            button.disabled = false;

        }

    });

}


// =====================================
// STUDENT LOGIN
// =====================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("loginMessage");
        const button = loginForm.querySelector('button[type="submit"]');

        try {

            button.disabled = true;
            message.textContent = "Logging in...";

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.textContent = "Login successful!";

            window.location.href = "home.html";

        } catch (error) {

            console.error(error);

            message.textContent = "Login failed: " + error.message;

        } finally {

            button.disabled = false;

        }

    });

}


// =====================================
// FORGOT PASSWORD
// =====================================

const resetButton = document.getElementById("resetPassword");

if (resetButton) {

    resetButton.addEventListener("click", async () => {

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("loginMessage");

        if (!email) {
            message.textContent = "Please enter your email address first.";
            return;
        }

        try {

            await sendPasswordResetEmail(auth, email);

            message.textContent = "Password reset email sent! Check your inbox.";

        } catch (error) {

            console.error(error);

            message.textContent = error.message;

        }

    });

}


// =====================================
// LOGOUT
// =====================================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (error) {

            console.error(error);

            alert("Could not log out. Please try again.");

        }

    });

}
