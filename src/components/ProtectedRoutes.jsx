import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const [isLogged, setIsLogged] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    fetch("api/Login/getUser", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLogged(true);
        setWaiting(false);
        localStorage.setItem("user", data.user.UserName);
        console.log(data.user);
      })
      .catch((err) => {
        console.log("Error protected routes: ", err);
        setWaiting(false);
        localStorage.removeItem("user");
      });
  });
  return waiting ? (
    <div>
      <div>Waiting...</div>
    </div>
  ) : isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoutes;
