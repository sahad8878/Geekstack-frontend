import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { logoutUser } from "./Api";


const PrivateRoutes = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    if (userInfo) {
      const decodedJwt = parseJwt(userInfo.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        message.error("token expired");
      logoutUser(userInfo._id).then(()=> {
        localStorage.removeItem("userInfo")
        navigate("/");
      })
      }
    }
  }, [userInfo,navigate]);

  return userInfo ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
