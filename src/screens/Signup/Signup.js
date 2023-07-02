import React, { useState } from "react";

import "../Signup/Signup.css";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmktguxeaQZsf9ggqDT0T-UdoZkAoV8uo",
    authDomain: "assignmentstudymonk.firebaseapp.com",
    projectId: "assignmentstudymonk",
    storageBucket: "assignmentstudymonk.appspot.com",
    messagingSenderId: "1039980114016",
    appId: "1:1039980114016:web:df01387e20dc21e49e1305"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    async function submission(event) {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill in all the fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords Dont Match!')
            return
        }

        const existingUser = await getDoc(doc(db, "users", email));
        if (existingUser.exists()) {
            alert("This email is already in use.");
            return;
        }

        await setDoc(doc(db, "users", email), {
            email: email,
            password: password,
            addToCart: [],
            watchList: []
        });
        alert('Now Go to Log In')
        setEmail("");
        setPassword("");
        setConfirmPassword("")

    }

    return (
        // JSX code for Signup component
        <div id="loginPage">
            <div id="card">
                <div id="text">E-MAIL</div>
                <input type="text" id="email" value={email} onChange={handleEmailChange} />
                <div id="text">PASSWORD</div>
                <input type="password" id="pass" value={password} onChange={handlePasswordChange} />
                <div id="text">CONFIRM PASSWORD</div>
                <input
                    type="password"
                    id="pass"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <div id="lower">
                    <button id="logInBtn" onClick={submission}>
                        <div id="loginText">CREATE</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
