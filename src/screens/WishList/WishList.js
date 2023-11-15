import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import photo from "../../assets/avatar.png";
import "./MyCart.css";
import { Firebase } from "../../utils/firebase";

const WishList = () => {
  const [cartItems, setCartItems] = useState([]);
  const db = Firebase();
  const [val, setVal] = useState("");
  const [filteredList, setFilteredList] = useState(cartItems);

  const handleDelete = async (meal) => {
    const email = localStorage.getItem("email");
    const user = await getDoc(doc(db, "users", email));
    if (user.exists()) {
      alert("Candidate Removed");
      const data = user.data();
      const temp = {
        ...data,
        watchList: data.watchList.filter((idx) => idx?.id !== meal?.id),
      };
      await setDoc(doc(db, "users", email), {
        ...temp,
      });
      setCartItems(temp.watchList);
      setFilteredList(temp.watchList);
    }
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
        setFilteredList(data.watchList);
      } else {
        alert("user doesn't exists");
      }
    };
    init();
  }, []);

  return (
    <div id="addCartPage">
      <form id="searchBar">
        <input
          id="inp"
          type="text"
          placeholder="type in candidate/skill"
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          id="addToList"
          onClick={(e) => {
            e.preventDefault();
            if (val.trim() === "") {
              setFilteredList(cartItems);
            } else {
              const filtered = cartItems.filter((li) =>
                li.name.toLowerCase().includes(val.toLowerCase())
              );
              setFilteredList(filtered);
            }
          }}
        >
          Search
        </button>
      </form>
      {filteredList?.length === 0 && (
        <div id="noCandi">
          {/* <img id="imgConsult" src={consult} alt="No Candidate" /> */}
          <div>No candidates available.</div>
          <button
            id="deleteCartItem"
            onClick={() => (window.location.href = "/candidates")}
          >
            {" "}
            Go to Candidates Page
          </button>
        </div>
      )}
      {filteredList?.map((cartItem) => {
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
