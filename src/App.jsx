import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import SingleCoursePage from "./Pages/SingleCoursePage";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthPage} exact />
        <Route Component={PrivateRoutes} >
        <Route path="/home" Component={HomePage} />
        <Route path="/singleCourse/:courseName" Component={SingleCoursePage} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
