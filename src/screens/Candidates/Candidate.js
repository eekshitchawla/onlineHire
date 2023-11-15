import React, { useState } from "react";
import "./Candidates.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import mealBox from "../../assets/avatar.png";
import { Firebase } from "../../utils/firebase";
import { candidates } from "../../utils/candidates";

const Candidate = () => {
  const db = Firebase();
  const meals = candidates;
  const [entry, setEntry] = useState(true);
  const [val, setVal] = useState("");
  const [filteredList, setFilteredList] = useState(meals);

  const handleWatchList = async (meal) => {
    const email = localStorage.getItem("email");
    const user = await getDoc(doc(db, "users", email));
    if (email === null) {
      alert("Please Sign In First!");
      return;
    }
    if (user.exists()) {
      const data = user.data();
      const existingList = data.watchList;
      for (let i = 0; i < existingList.length; i++) {
        if (meal.id === existingList[i].id) {
          alert("Contestant Exists!");
          setEntry(false);
          return;
        }
      }
      if (entry) {
        alert("Candidate Listed!");
        const temp = {
          ...data,
          watchList: [...data.watchList, meal],
        };
        await setDoc(doc(db, "users", email), {
          ...temp,
        });
      }
    }
  };

  return (
    <>
      <div id="candidatePage">
        <form id="searchBar">
          <input
            id="inp"
            type="text"
            placeholder="type in candidate"
            onChange={(e) => setVal(e.target.value)}
          />
          <button
            id="addToList"
            onClick={(e) => {
              e.preventDefault();
              const filtered = meals.filter((li) =>
                li.name.toLowerCase().includes(val.toLowerCase())
              );
              setFilteredList(filtered);
            }}
          >
            Search
          </button>
        </form>
        <div id="meals">
          {filteredList?.map((meal) => (
            <div
              className="meal"
              id={`meal-${meal.id}`}
              key={`meal-${meal.id}`}
            >
              <img id="mealBoxPic" src={mealBox} alt="" />
              <div id="mealName">
                {meal.id} {".  "}
                {meal.name}
              </div>
              <div id="mealSkill">{meal.skill}</div>
              <button id="addToList" onClick={() => handleWatchList(meal)}>
                Add to WatchList
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Candidate;
