import React from 'react'
import {  logoutUser } from '../../utils/Api'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     console.log(userInfo._id,"user");
  const handleLogout= async ()=> {
  logoutUser(userInfo._id).then((success) => {
    localStorage.removeItem("userInfo")
    message.success("logout successfully completed");
    navigate("/")
  })
  } 
  return (
    <nav className='text-[25px] flex justify-between text-[#800080] font-bold text-left p-5 shadow-md'>
    <span>
      Learing App
    </span>
    <span onClick={handleLogout} className='text-lg cursor-pointer'>Logout</span>
   </nav>
  )
}

export default Navbar
