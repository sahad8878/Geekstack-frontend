import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import UploadForm from "../components/UploadForm/UploadForm";
import { BACKEND_URI } from "../config/constants";
import { getVidoes } from "../utils/Api";


const SingleCoursePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { courseName } = useParams();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getAllVideos();
  }, []);
  const getAllVideos = () => {
    getVidoes(courseName)
      .then((result) => {
        setVideos(result);
      })
      .catch((err) => {
        setVideos([]);
        console.log(err);
        alert("Error happened");
      });
  };

  return (
    <>
      <Navbar />

      <div className=" flex flex-col justify-center items-center mt-7 px-5">
        <div className="font-bold p-5 text-xl">{courseName}</div>
        <div
          id="selectClass"
          onClick={handleOpenModal}
          className={`bg-gradient-to-r  from-[#FF864C] to-[#800080] text-white hover:shadow-lg  flex justify-center items-center rounded-full w-72 sm:w-96 p-1 font-semibold cursor-pointer`}
        >
          Add video
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className=" sm:w-[300px]">
            <UploadForm
              handleCloseModal={handleCloseModal}
              getAllVideos={getAllVideos}
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-slate-600 px-4 rounded-lg"
              >
                {" "}
                close
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="mb-10">
        {videos.length > 0 ? (
          <div className="carousel grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-11 sm:px-16 items-center justify-start  scrollbar-hide gap-6 space-y-5 sm:space-y-0 rounded-xl mr-[5px] ">
            {videos.map((video,index) => (
              <div
              key={index}
                className={`   card h-[258px] min-w-[250px] lg:w-[400px]    ring-1 rounded-2xl p-5 shadow-lg`}
              >
                  <>
                    <video preload="auto"  className="h-[208px] min-w-[250px] w-full lg:w-[400px] "  controls>
                      <source
                        src={video.videos}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </>
    
                <div className="flex justify-center font-medium text-lg ">
                  <span>{video.title}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" flex justify-center p-10 w-full text-red-500 text-lg">
            <span>videos not uploaded yet</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCoursePage;
