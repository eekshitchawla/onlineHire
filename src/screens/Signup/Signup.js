import React, { useState } from "react";

import "../Login/Login.css";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmktguxeaQZsf9ggqDT0T-UdoZkAoV8uo",
  authDomain: "assignmentstudymonk.firebaseapp.com",
  projectId: "assignmentstudymonk",
  storageBucket: "assignmentstudymonk.appspot.com",
  messagingSenderId: "1039980114016",
  appId: "1:1039980114016:web:df01387e20dc21e49e1305",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const validateData = (email, pass) => {
    const isEmailValid =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,})$/.test(email);
    const isPassValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/.test(pass);
    if (!isEmailValid) return "Email Not Valid";
    if (!isPassValid) return "Password Not Valid";
    return true;
  };
  async function submission(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords Dont Match!");
      return;
    }
    const isValid = validateData(email, password);
    if (isValid !== true) {
      alert(isValid);
      return;
    }

    const existingUser = await getDoc(doc(db, "users", email));
    if (existingUser.exists()) {
      alert("This email is already in use.");
      return;
    }

    await setDoc(doc(db, "users", email), {
      name: username,
      email: email,
      password: password,
      addToCart: [],
      watchList: [],
    });
    window.location.href = "/login";
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    // JSX code for Signup component
    <div id="loginPage">
      <form id="card">
        <div id="text">NAME</div>
        <input
          type="text"
          className="fields"
          value={username}
          onChange={handleNameChange}
        />
        <div id="text">E-MAIL</div>
        <input
          type="text"
          className="fields"
          value={email}
          onChange={handleEmailChange}
        />
        <div id="text">PASSWORD</div>
        <input
          type="password"
          className="fields"
          value={password}
          onChange={handlePasswordChange}
        />
        <div id="text">CONFIRM PASSWORD</div>
        <input
          type="password"
          className="fields"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <div id="lower">
          <button id="logInBtn" onClick={submission}>
            <div id="loginText">CREATE</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
