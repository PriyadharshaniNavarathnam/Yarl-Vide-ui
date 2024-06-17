import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginForm from "../Pages/LoginForm";
import RoutesConfig from "../config/routesConfig";


function ProtectedRoutes() {
  const [isLogged, setIsLogged] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    //logout()
  
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
    <RoutesConfig />
  ) : (
    <LoginForm/>
  );
}

export default ProtectedRoutes;
