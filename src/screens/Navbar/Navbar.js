// import React, { useEffect, useState } from "react";
// import "../Navbar/Navbar.css";
// import { doc, getDoc } from "firebase/firestore";
// import { Firebase } from "../../utils/firebase";
// import logo from "../../assets/logo.png";
// const Navbar = () => {
//   const [email, setEmail] = useState(localStorage.getItem("email"));
//   const [username, setUsername] = useState("");
//   const db = Firebase();

//   useEffect(() => {
//     const displayUser = async () => {
//       if (email) {
//         const docSnap = await getDoc(doc(db, "users", email));
//         if (docSnap.exists()) {
//           setUsername(docSnap.data().name.toUpperCase());
//         }
//       }
//     };
//     displayUser();
//   }, [email, db, username]);

//   const logout = () => {
//     localStorage.clear();
//     setEmail(null);
//   };

//   return (
//     <div id="navbarParent">
//       <nav id="navBar">
//         <link
//           rel="stylesheet"
//           href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css"
//           integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm"
//           crossOrigin="anonymous"
//         />
//         <div id="container">
//           <button
//             id="appName"
//             onClick={() => {
//               window.location.href = "/";
//             }}
//           >
//             <img src={logo} alt="" />
//           </button>
//           <div className="nameRender" id="itemBtn">
//             {username === "" ? "" : `HEY ${username} !`}
//           </div>
//           <div id="navbarLinks">
//             <ul id="list">
//               <li id="item">
//                 <button
//                   id="itemBtn"
//                   onClick={() => {
//                     window.location.href = "/myList";
//                   }}
//                 >
//                   Shortlisted
//                 </button>
//               </li>
//               <li id="item">
//                 <button
//                   id="itemBtn"
//                   onClick={() => {
//                     window.location.href = "/candidates";
//                   }}
//                 >
//                   All Candidates
//                 </button>
//               </li>
//               <li id="item">
//                 {email ? (
//                   <button
//                     id="itemBtn"
//                     onClick={() => {
//                       logout();
//                     }}
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <button
//                     id="itemBtn"
//                     onClick={() => {
//                       window.location.href = "/login";
//                     }}
//                   >
//                     Login
//                   </button>
//                 )}
//               </li>
//               {email ? (
//                 ""
//               ) : (
//                 <li id="item">
//                   <button
//                     id="itemBtn"
//                     onClick={() => {
//                       window.location.href = "/signup";
//                     }}
//                   >
//                     Signup
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

// import React, { useEffect, useState } from "react";
// import "../Navbar/Navbar.css";
// import { doc, getDoc } from "firebase/firestore";
// import { Firebase } from "../../utils/firebase";
// import logo from "../../assets/logo.png";

// const Navbar = () => {
//   const [email, setEmail] = useState(localStorage.getItem("email"));
//   const [username, setUsername] = useState("");
//   const db = Firebase();

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (email) {
//         try {
//           const docSnap = await getDoc(doc(db, "users", email));
//           if (docSnap.exists()) {
//             setUsername(docSnap.data().name.toUpperCase());
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };
//     fetchUser();
//   }, [email, db]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setEmail(null);
//     setUsername("");
//     window.location.href = "/";
//   };

//   return (
//     <div id="navbarParent">
//       <nav id="navBar">
//         <div id="container">
//           <button id="appName" onClick={() => (window.location.href = "/")}>
//             <img src={logo} alt="Skill Select Logo" />
//           </button>
//           <div id="userGreeting" className="nameRender">
//             {username && `Hey, ${username}!`}
//           </div>
//           <div id="navbarLinks">
//             <ul id="list">
//               <li>
//                 <button
//                   id="itemBtn"
//                   onClick={() => (window.location.href = "/myList")}
//                 >
//                   Shortlisted
//                 </button>
//               </li>
//               <li>
//                 <button
//                   id="itemBtn"
//                   onClick={() => (window.location.href = "/candidates")}
//                 >
//                   All Candidates
//                 </button>
//               </li>
//               {email ? (
//                 <li>
//                   <button id="itemBtn" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               ) : (
//                 <>
//                   <li>
//                     <button
//                       id="itemBtn"
//                       onClick={() => (window.location.href = "/login")}
//                     >
//                       Login
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       id="itemBtn"
//                       onClick={() => (window.location.href = "/signup")}
//                     >
//                       Signup
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.css";
import { doc, getDoc } from "firebase/firestore";
import { Firebase } from "../../utils/firebase";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling mobile menu
  const db = Firebase();

  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        try {
          const docSnap = await getDoc(doc(db, "users", email));
          if (docSnap.exists()) {
            setUsername(docSnap.data().name.toUpperCase());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [email, db]);

  const handleLogout = () => {
    localStorage.clear();
    setEmail(null);
    setUsername("");
    window.location.href = "/";
  };

  return (
    <div id="navbarParent">
      <nav id="navBar">
        <div id="container">
          <button id="appName" onClick={() => (window.location.href = "/")}>
            <img src={logo} alt="Skill Select Logo" />
          </button>
          <div id="userGreeting" className="nameRender">
            {username && `Hey, ${username}!`}
          </div>
          <button
            id="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)} // Toggle menu
          >
            ☰
          </button>
          <div id="navbarLinks" className={menuOpen ? "mobile-active" : ""}>
            <ul id="list">
              <li>
                <button
                  id="itemBtn"
                  onClick={() => (window.location.href = "/myList")}
                >
                  Shortlisted
                </button>
              </li>
              <li>
                <button
                  id="itemBtn"
                  onClick={() => (window.location.href = "/candidates")}
                >
                  All Candidates
                </button>
              </li>
              {email ? (
                <li>
                  <button id="itemBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      id="itemBtn"
                      onClick={() => (window.location.href = "/login")}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      id="itemBtn"
                      onClick={() => (window.location.href = "/signup")}
                    >
                      Signup
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
