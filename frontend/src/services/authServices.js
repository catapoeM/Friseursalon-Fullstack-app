import {sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth';
import {auth} from './firebaseConfig.js';

const actionCodeSettings = {
    url: "localhost:5173/verify",
    handleCodeInApp: true,
}

export async function sendLoginLink(email) {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
}

export async function completeEmailLogin(url) {
    if (isSignInWithEmailLink(auth, url)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
            email = window.prompt("Bitte E-mail eingeben:");
        }
        await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem("emailForSignIn");
        return email;
    }
    throw new Error("Ungültiger Link");
}