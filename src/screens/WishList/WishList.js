import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import photo from '../../assets/avatar.png'
import consult from '../../assets/consult.png'

import './MyCart.css'
import { initializeApp } from "firebase/app";

const WishList = () => {

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

    const [cartItems, setCartItems] = useState([])

    const handleDelete = async (meal) => {
        const email = await localStorage.getItem('email')
        const user = await getDoc(doc(db, "users", email));
        if (user.exists()) {
            alert('Candidate Removed')
            const data = user.data();
            const temp = {
                ...data,
                watchList: data.watchList.filter(i => i?.id !== meal?.id)
            }
            await setDoc(doc(db, "users", email), {
                ...temp
            })
            setCartItems(temp.watchList)
        }
    }

    useEffect(() => {
        const init = async () => {
            const email = await localStorage.getItem('email')
            if (!email) {
                alert("Login Required")
                window.location.href = '/login'
                return;
            }
            const user = await getDoc(doc(db, "users", email));
            if (user.exists()) {
                const data = user.data();
                setCartItems(data.watchList)
            }
        }
        init();
    }, [])

    return (
        <div id="addCartPage">
            {cartItems.length === 0 && (
                <div id="noCandi">
                    <img id="imgConsult" src={consult} alt="No Candidate" />
                    <h2>No candidates available.</h2>
                    <button id="deleteCartItem" onClick={() => window.location.href = '/candidates'}> Go to Candidates Page</button>
                </div>
            )}
            {
                cartItems?.map((cartItem) => {
                    return (<div id="cartCard" key={cartItem?.id}>
                        <img src={photo} alt="" />
                        <h1 id="nameCart">
                            {
                                cartItem?.name
                            }
                        </h1>
                        <div id="priceCart">
                            Skill: {
                                cartItem?.skill

                            }
                        </div>
                        <button id="deleteCartItem" onClick={() => handleDelete(cartItem)}>Delete</button>
                    </div>
                    )
                })
            }

        </div>
    );
};


export default WishList;
