import React, { useState } from "react";
import "./Candidates.css";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import mealBox from "../../assets/avatar.png";
import { Firebase } from "../../utils/firebase";
import { candidates } from "../../utils/candidates";

const Candidate = () => {
  const db = Firebase();
  const meals = candidates;

  const [entry, setEntry] = useState(true);
  const data = {
    stringExample: "Hello, World!",
    booleanExample: true,
    numberExample: 3.14159265,
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
      a: 5,
      b: true,
    },
  };
  const handleWatchList = async (meal) => {
    const email = localStorage.getItem("email");
    if (email === null) {
      alert("Please Sign In First!");
      return;
    }
    // console.log(meal.id);
    const user = await getDoc(doc(db, "users", email));
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

  const [val, setVal] = useState("");
  const search = () => {
    let found = false;
    if (val === "") {
      alert("Please enter a name/skill");
      return;
    }
    for (let meal = 0; meal < meals.length; meal++) {
      if (meals[meal]?.name?.toLowerCase().includes(val?.toLowerCase())) {
        alert(`Candidate Exists! Candidate No, ${meal + 1}`);
        found = true;
      }
      if (meals[meal]?.skill?.toLowerCase().includes(val?.toLowerCase())) {
        alert(`Related Skill Exists! Candidate No, ${meal + 1}`);
        found = true;
      }
    }
    if (!found) alert("Not exists, Please type correctly");
  };

  return (
    <>
      <div id="candidatePage">
        <div id="searchBar">
          <input
            id="inp"
            type="text"
            placeholder="type in candidate"
            onChange={(e) => setVal(e.target.value)}
          />
          <button id="addToList" onClick={() => search()}>
            Search
          </button>
        </div>
        <div id="meals">
          {meals?.map((meal) => (
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
