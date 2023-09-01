import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ courseObj }) => {
  console.log(courseObj, "course");
  return (
    <div
      key={courseObj.id}
      className={`   card h-[228px] min-w-[250px] lg:w-[400px]    ring-1 rounded-2xl p-5 shadow-lg`}
    >
      <div className="sm:w-[358px] space-y-3">
        <div className="flex mx-3">
          <h1 className="text-[16px] text-[#800080] font-bold ">
            {courseObj.name}
          </h1>
        </div>

        <div className="flex flex-wrap  text-[16px] font-normal  gap-3 mx-3 mr-4 overflow-y-auto h-20 scrollbar-style">
          {courseObj.description}
        </div>
        <h1 className="text-[#800080] text-[14px] font-medium mx-3">
          No of Attendees{" "}
          <span className="text-[16px] text-black">
            ({courseObj.attendees})
          </span>
        </h1>

        <div className=" flex justify-center items-center">
          <Link to={`/singleCourse/${courseObj.name}`}>
            <button className=" text-center text-white  rounded-full p-1 px-8 sm:text-[16px] font-medium bg-[#800080] sm:p- hover:brightness-90">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
