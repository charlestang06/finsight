// AUTHENTICATION IMPORTS
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import firebaseConfig from "./key.json";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// const provider = new OAuthProvider('microsoft.com');
// provider.setCustomParameters({
//     tenant: "wpi.edu"
// });


// AUTHENTICATION WITH EMAIL AND PASSWORD
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password).then((res) => {
            console.log(res);
        });
    } catch {
        alert("Invalid password or email");
    }
};

// AUTHENTICATION WITH EMAIL AND PASSWORD
const registerWithEmailAndPassword = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password).then((res) => {
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// LOGOUT
const logout = () => {
    signOut(auth);
};

// EXPORTS
export {
    auth,
    app,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
};