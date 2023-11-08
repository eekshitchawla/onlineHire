import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import "./Login.css";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter details Properly");
      return;
    }
    const docSnap = await getDoc(doc(db, "users", email));

    if (docSnap.exists()) {
      const pass = docSnap.data().password;
      if (pass === password) {
        localStorage.setItem("email", email);
        alert("login successfull");
        window.location.href = "/";
      } else {
        alert("Wrong Password");
      }
    } else {
      alert("No such User!");
    }
    setEmail("");
    setPassword("");
  };

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  return (
    <div id="loginPage">
      <h1>LOGIN</h1>
      <form id="card">
        <div id="text">E-MAIL</div>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="test@mail.com"
        />
        <div id="text">PASSWORD</div>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Qwerty@11"
        />
        <div id="lower">
          <button type="submit" id="logInBtn" onClick={handleSubmit}>
            <div id="loginText">LOGIN</div>
          </button>
          <button type="button" id="signUpBtn" onClick={handleSignUpClick}>
            <div id="signUpText">SIGN UP</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
