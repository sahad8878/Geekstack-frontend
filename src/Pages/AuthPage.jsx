import React, { useEffect, useState } from "react";
import Auth from '../components/Auth/Auth'
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [tab, setTab] = useState("login");
    const navigate = useNavigate();
    const changeTab = (tab) => {
      setTab(tab);
    };
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) navigate("/home");
    }, [navigate]);
  return (
    <div className="min-h-screen flex  justify-center p-2 ">
    <div className="flex flex-col space-y-7 mt-14  ">
      <div className="dots-pattern-header ring-1 shadow-xl rounded-lg font-semibold text-xl  flex justify-center items-center h-14">
        Learning App
      </div>
      <div className=" dots-pattern-header shadow-xl ring-1 rounded-lg text-base font-medium">
        <div className=" flex flex-row p-2 ">
          <div
            onClick={(e) => changeTab(e.target.id)}
            id="login"
            className={`${
              tab === "login" ? "bg-gradient-to-r  from-[#FF864C] to-[#800080]" : "bg-white border border-black"
            } w-1/2 text-center   rounded-full p-1.5 cursor-pointer `}
          >
            Login
          </div>
          <div
            onClick={(e) => changeTab(e.target.id)}
            id="signup"
            className={`${
              tab === "signup" ? "bg-gradient-to-r  from-[#FF864C] to-[#800080]" : "bg-white border border-black"
            } w-1/2 text-center p-1.5   rounded-full cursor-pointer`}
          >
            Sign up
          </div>
        </div>
        <div className="form-group px-3">
          <Auth tab={tab} setTab={setTab}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AuthPage
