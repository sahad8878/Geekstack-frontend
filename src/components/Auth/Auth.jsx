import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

import {googleLogin, loginUser,registerUser} from '../../utils/Api'

function Auth({ tab,setTab }) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (tab === "login") {
      if (!email || !password) {
        message.error("please fill all the fields");
        setLoading(false);
        return;
      }
      const postData = { email, password };
      try {
        const data = await loginUser(postData);
        message.success("Your successfully logged in");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/home");
      } catch (error) {
        message.error(error.response.data.message);
        setLoading(false);
        return;
      }
    } else {
      if (!email || !username || !password || !confirmPassword) {
        message.error("please fill all the fields");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        message.error("Password do not match");

        setLoading(false);

        return;
      }
      const forData = {
        username,
        email,
        password,
      };
      try {
        await registerUser(forData);
        message.success("Your registration has been successfully completed");
        setTab("login")
      } catch (error) {
        message.error(error.response.data.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
  
  };
  const handelGoogleSignIn = async (response) => {
    const decoded = jwtDecode(response.credential);

    const { email, family_name, given_name } = decoded;
  const data ={
      email: email,
      username: `${given_name} ${family_name}`,
    }
    try {
      const res = await googleLogin(data)
         if(res.success){

           message.success("Your successfully logged in");
           localStorage.setItem("userInfo", JSON.stringify(res));
           navigate("/home");
         }else {
          message.error(res.message);
         }
    } catch (error) {
      console.log("google login:",error);
      message.error("Failed to google login",);
      return;
    }
  };

  return (
    <form className="my-8 space-y-3">
      {tab === "signup" && (
        <div className="flex flex-col  space-y-1">
          <label htmlFor="name ">Name</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black   min-w-[350px] sm:w-[500px] p-1 rounded-md "
          />
        </div>
      )}
      <div className="flex flex-col space-y-1 ">
        <label htmlFor="email ">Email</label>
        <input
          type="text"
          defaultValue={tab === "login" && email ? email : ""}
          onChange={(e) => setEmail(e.target.value)}
          className=" border border-black  min-w-[300px] sm:w-[500px] p-1  rounded-md"
        />
      </div>
      <div className="flex flex-col space-y-1 ">
        <label htmlFor="email ">Password</label>
        <input
          type={show ? "text" : "password"}
          defaultValue={tab === "login" ? password : ""}
          onChange={(e) => setPassword(e.target.value)}
          className=" min-w-[300px] sm:w-[500px] p-1 rounded-md border border-black  "
        />
        <div className="bg-slate-400 flex justify-end">
          <div
            onClick={() => setShow(!show)}
            className=" -mt-8 mr-1 cursor-pointer bg-gray-200 w-12 h-6 text-center font-normal text-sm"
          >
            {show ? "Hide" : "Show"}
          </div>
        </div>
      </div>
      {tab === "signup" && (
        <div className="flex flex-col space-y-1">
          <label htmlFor="email ">Confirm Password</label>
          <input
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-black min-w-[300px] sm:w-[500px] p-1 rounded-md  "
          />
          <div className="bg-slate-400 flex justify-end ">
            <div
              onClick={() => setShow(!show)}
              className=" -mt-8 mr-1 cursor-pointer bg-gray-200 w-12 h-6 text-center font-normal text-sm"
            >
              {show ? "Hide" : "Show"}
            </div>
          </div>
        </div>
      )}
   
      <div>

      </div>
  
      <div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          className="bg-gradient-to-r  from-[#FF864C] to-[#800080] rounded-lg hover:bg-opacity-75 w-full p-1.5 mt-6"
        >
          {loading ? "Loading.. " : tab === "login" ? "Login" : "Signup"}
        </button>
      </div>
      {
        tab === "login" &&
        <div className="flex flex-col items-center space-y-3 justify-center">
          <span>OR</span>
          <div>
          <GoogleLogin
          size="large"
          onSuccess={(response) => {
            handelGoogleSignIn(response);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
          </div>
          
        </div>
      }
    </form>
  );
}

export default Auth;
