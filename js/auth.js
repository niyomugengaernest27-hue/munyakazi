
function showError(error) {
    console.error("Firebase error:", error.code, error.message);

    const errors = {
        "auth/email-already-in-use":
            "This email is already registered.",

        "auth/invalid-email":
            "Please enter a valid email address.",

        "auth/weak-password":
            "Your password must be stronger.",

        "auth/invalid-credential":
            "Incorrect email or password. Try resetting your password.",

        "auth/user-not-found":
            "No account found with this email.",

        "auth/wrong-password":
            "Incorrect password.",

        "auth/unauthorized-domain":
            "Your website domain is not authorized in Firebase.",

        "auth/operation-not-allowed":
            "Enable Email/Password in Firebase Authentication.",

        "auth/too-many-requests":
            "Too many attempts. Please wait and try again.",

        "auth/network-request-failed":
            "Check your internet connection.",

        "auth/missing-email":
            "Please enter your email address.",

        "auth/invalid-api-key":
            "Your Firebase API key is invalid.",

        "permission-denied":
            "Firestore permission denied."
    };

    return errors[error.code] ||
        error.message ||
        "Something went wrong. Please try again.";
}
