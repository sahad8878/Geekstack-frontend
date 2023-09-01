import React, { useState } from "react";
import { courses } from "../config/constants";
import CourseCard from "../components/CourseCard/CourseCard";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
const  [cours,setCourse] = useState(courses)
const [visibleCourses, setVisibleCourses] = useState(6);

const visibleFilteredCourse = cours.slice(0, visibleCourses);
const remainingCoursesCount =
  cours.length - visibleFilteredCourse.length;
const handleLoadMore = () => {
    setVisibleCourses((prevVisible) => prevVisible + 6);
  };

  return (
    <>
  <Navbar/>
    <div className="mb-10">
      <div className="carousel grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-11 sm:px-16 items-center justify-start  scrollbar-hide gap-6 space-y-5 sm:space-y-0 rounded-xl mr-[5px] ">
        {visibleFilteredCourse.map((courseObj) => (
          <CourseCard
          courseObj={courseObj}
          />
        ))}
        {remainingCoursesCount > 0 && (
          <div className="flex justify-start items-center  ">
            <button
              onClick={handleLoadMore}
              className="moreButton border-2 px-10 py-1 rounded-full shadow-sm text-[#800080] font-semibold shadow-slate-700"
            >
              Load More ({remainingCoursesCount} left)
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default HomePage;
