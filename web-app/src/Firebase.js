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


// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyC4ZVVi-B5fTG4bhnaMW0PXhA78QFuGYOY",
    authDomain: "finsight-5cae6.firebaseapp.com",
    projectId: "finsight-5cae6",
    storageBucket: "finsight-5cae6.appspot.com",
    messagingSenderId: "988317531840",
    appId: "1:988317531840:web:86fcf0e31ffb927a96b725"
  };

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