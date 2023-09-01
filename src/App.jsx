import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import SingleCoursePage from "./Pages/SingleCoursePage";
// import HomePageDumm from "./Pages/HomePageDumm";


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthPage} exact />
        <Route path="/home" Component={HomePage} />
        <Route path="/singleCourse/:courseName" Component={SingleCoursePage} />
      </Routes>
  </Router>
  );
}

export default App;
