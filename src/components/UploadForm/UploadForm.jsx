import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { uploadVideos } from "../../utils/Api";
import axios from 'axios'

function UploadForm({getAllVideos,handleCloseModal}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState("");
  const [loading,setLoading] = useState(false)
  const { courseName } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!title || !description || !videos ) {
      message.error("please fill all the fields");
      setLoading(false);
      return;
    }
     const data = {
      title,
      description,
      courseName,
      videos,
    };
     uploadVideos(data).then((success) =>{
      message.success("Videos uploaded successfully")
      getAllVideos()
        handleCloseModal()
     } ).catch((err)=> {
        console.log(err);
        message.error("error happend")
     })
  };
  const postDetails = (video) => {
    console.log(video,"pics");
    setLoading(true)
    if (video === undefined) {
      message.error("Picture is empty");
      return;
    }
    if (video.type === "video/mp4" || video.type === "image/mkv") {
      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "wwviwsyy");
      data.append("cloud_name", "deovgjvlr");

      const postImages = async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_CLOUDNARY_API}/upload`,
            data
          );
          console.log(res.data,"response");
          setVideos(res.data.url);
          setLoading(false)
        } catch (err) {
          console.log(err, "err");
          setLoading(false)
          
        }
      };
      postImages();
    } else {
      setLoading(false)

      message.error("please select a video");

      
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="text-black font-medium space-y-3">
        <div >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border w-full border-black"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="border border-black w-full "
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="videos">Upload videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            className="border border-black w-full"
            accept=".mp4, .mkv"
       
            onChange={(e) => postDetails(e.target.files[0])}

          />
        </div>
        <div className="flex justify-center">
        <button disabled={loading} type="submit"  className=" bg-slate-400 px-2 rounded-lg">{loading ? "Loading.." : "Submit"} </button>

        </div>
      </form>
    </>
  );
}

export default UploadForm;
