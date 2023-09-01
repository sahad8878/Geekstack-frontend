import axios from '../axios/Axios'

export const registerUser = async (postData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/user/register", postData, config);
    return response.data;
  };
  
  export const loginUser = async (postData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/user/login", postData, config);
    return response.data;
  };

  export const uploadVideos = async (postData)=> {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/videos/upload", postData);
    return response.data;
  }
  export const getVidoes = async (params)=> {
   
    const response = await axios.get(`/api/videos/getAll?courseName=${params}`);
    return response.data;
  }
  export const logoutUser = async (params)=> {
   
    const response = await axios.patch(`/api/user/logout?id=${params}`);
    return response.data;
  }