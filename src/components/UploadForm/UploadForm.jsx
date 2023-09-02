import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { uploadVideos } from "../../utils/Api";

function UploadForm({getAllVideos,handleCloseModal}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const { courseName } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData()
     for(let key in videos) {
        formdata.append('videos',videos[key])
     }
     formdata.append('title',title)
     formdata.append('description',description)
     formdata.append('courseName',courseName)
     uploadVideos(formdata).then((success) =>{
      message.success("Videos uploaded successfully")
      getAllVideos()
        handleCloseModal()
     } ).catch((err)=> {
        console.log(err);
        message.error("error happend")
     })
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
            multiple
            className="border border-black w-full"
            accept=".mp4, .mkv"
            onChange={(e) => {
                setVideos(e.target.files)
            }}
          />
        </div>
        <div className="flex justify-center">
        <button type="submit"  className=" bg-slate-400 px-2 rounded-lg">submit</button>

        </div>
      </form>
    </>
  );
}

export default UploadForm;
