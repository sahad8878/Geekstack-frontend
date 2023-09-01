import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "../components/UploadForm";
import { BACKEND_URI } from "../config/constants";

const HomePageDumm = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
      getAllVideos();
    }, []);
    const getAllVideos = () => {
      axios
        .get(`${BACKEND_URI}/api/videos/getAll`)
        .then((result) => {
          setVideos(result.data);
        })
        .catch((err) => {
          setVideos([]);
          console.log(err);
          alert("Error happened");
        });
    };
  return (
    <div className="App">
    <h1>Video Streaming Platform</h1>
    <div className="video-upload-form">
      <UploadForm getAllVideos={getAllVideos} />
    </div>
    <div className="video-list">
      {videos &&
        videos.map((video) => (
          <div key={video._id} className="video-item">
            <h2>{video.name}</h2>
            {/* <p>{video.description}</p> */}
            {
              video.videos.map((item)=> (

            <video preload="auto" width='320' height='240' controls>
              {/* <source
                src={`data:video/mp4;base64,${video.videoUrl}`}
                type="video/mp4"
              /> */}
              <source src={`${BACKEND_URI}${item}`} />
              Your browser does not support the video tag.
            </video>
              ))
            }
          </div>
        ))}
    </div>
  </div>
  )
}

export default HomePageDumm
