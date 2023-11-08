import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import photo from "../../assets/avatar.png";
import "./MyCart.css";
import { Firebase } from "../../utils/firebase";

const WishList = () => {
  const [cartItems, setCartItems] = useState([]);
  const db = Firebase();

  const handleDelete = async (meal) => {
    const email = localStorage.getItem("email");
    const user = await getDoc(doc(db, "users", email));
    if (user.exists()) {
      alert("Candidate Removed");
      const data = user.data();
      const temp = {
        ...data,
        watchList: data.watchList.filter((i) => i?.id !== meal?.id),
      };
      await setDoc(doc(db, "users", email), {
        ...temp,
      });
      setCartItems(temp.watchList);
    }
  };
  const [val, setVal] = useState("");
  // const [found, setFound] = useState(false);
  const search = () => {
    let found = false;
    if (val === "") {
      alert("Please enter a name/skill");
      return;
    }
    for (let meal = 0; meal < cartItems.length; meal++) {
      if (cartItems[meal].name.toLowerCase().includes(val.toLowerCase())) {
        alert(`Candidate Exists! Candidate No, ${meal + 1}`);
        found = true;
      }
      if (cartItems[meal].skill.toLowerCase().includes(val.toLowerCase())) {
        alert(`Related Skill Exists! Candidate No, ${meal + 1}`);
        found = true;
      }
    }
    if (!found) alert("Candidate not found");
  };

  useEffect(() => {
    const init = async () => {
      const email = await localStorage.getItem("email");
      if (!email) {
        alert("Login Required");
        window.location.href = "/login";
        return;
      }
      const user = await getDoc(doc(db, "users", email));
      if (user.exists()) {
        const data = user.data();
        setCartItems(data.watchList);
      }
    };
    init();
  }, []);

  return (
    <div id="addCartPage">
      <div id="searchBar">
        <input
          id="inp"
          type="text"
          placeholder="type in candidate/skill"
          onChange={(e) => setVal(e.target.value)}
        />
        <button id="addToList" onClick={() => search()}>
          Search
        </button>
      </div>
      {cartItems.length === 0 && (
        <div id="noCandi">
          {/* <img id="imgConsult" src={consult} alt="No Candidate" /> */}
          <h2>No candidates available.</h2>
          <button
            id="deleteCartItem"
            onClick={() => (window.location.href = "/candidates")}
          >
            {" "}
            Go to Candidates Page
          </button>
        </div>
      )}
      {cartItems?.map((cartItem) => {
        return (
          <>
            <div id="cartCard" key={cartItem?.id}>
              <img src={photo} alt="" />
              <h1 id="nameCart">{cartItem?.name}</h1>
              <div id="priceCart">Skill: {cartItem?.skill}</div>
              <button
                id="deleteCartItem"
                onClick={() => handleDelete(cartItem)}
              >
                Delete
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default WishList;
