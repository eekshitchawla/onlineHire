import React, { useState } from "react";
import "./Candidates.css";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import mealBox from "../../assets/avatar.png";

const Candidate = () => {
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

  const meals = [
    { id: 1, name: "Aryan Kumar", skill: "Computer Engineer" },
    { id: 2, name: "Bhavneet Singh", skill: "Software Engineer" },
    { id: 3, name: "Chirag Kapoor", skill: "Blockchain Engineer" },
    { id: 4, name: "Devansh Ahuja", skill: "Cloud Engineer" },
    { id: 5, name: "Eekshit Chawla", skill: "Website Developer" },
    { id: 6, name: "Fatima Sheikh", skill: "App Developer" },
    { id: 7, name: "Garima Thareja", skill: "Devops Engineer" },
    { id: 8, name: "Harvinder Kaur", skill: "Network Engineer" },
    { id: 9, name: "Ishan Sethiya", skill: "Software Developer" },
    { id: 10, name: "Jasmine Makkar", skill: "Advertising" },
    { id: 11, name: "Kalpana Chawla", skill: "Manager" },
    { id: 12, name: "Lalit Jain", skill: "HR Manager" },
    { id: 13, name: "Muskan Jindal", skill: "SEO Engineer" },
    { id: 14, name: "Naman Gupta", skill: "Advisor" },
  ];
  const [entry, setEntry] = useState(true);

  const handleWatchList = async (meal) => {
    const email = localStorage.getItem("email");
    console.log(meal.id);
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
  const [found, setFound] = useState(false);
  const search = () => {
    if (val === "") {
      alert("Please enter a name/skill");
      return;
    }
    for (let meal = 0; meal < meals.length; meal++) {
      if (meals[meal].name.toLowerCase().includes(val.toLowerCase())) {
        alert(`Candidate Exists! Candidate No, ${meal + 1}`);
        setFound(true);
      }
      if (meals[meal].skill.toLowerCase().includes(val.toLowerCase())) {
        alert(`Related Skill Exists! Candidate No, ${meal + 1}`);
        setFound(true);
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
          {meals.map((meal) => (
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
