import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./screens/Navbar/Navbar.js";
import BodyMain from "./screens/BodyMain/BodyMain.js";
import Login from "./screens/Login/Login.js";
import Signup from "./screens/Signup/Signup.js";
import WishList from "./screens/WishList/WishList.js";
import Candidate from "./screens/Candidates/Candidate.js";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BodyMain />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/myList",
      element: <WishList />,
    },
    {
      path: "/candidates",
      element: <Candidate />,
    },
  ]);
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
  });

  return (
    <div>
      {onlineStatus ? (
        <>
          <Navbar />
          <RouterProvider router={router} />
        </>
      ) : (
        <div>offline</div>
      )}
    </div>
  );
};

export default App;
