import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Profile from "./components/pages/Profile";
import Resume from "./components/pages/Resume";
import BaseContainer from "./components/commons/BaseContainer";
import DevideSignUp from "./components/pages/SignUp/DevideSignUp";
import CandidateSignUp from "./components/pages/SignUp/CandidateSignUp";
import RecruiterSignUp from "./components/pages/SignUp/RecruiterSignUp";
import SignUp from "./components/pages/SignUp";
import ConfirmSignUp from "./components/pages/SignUp/confirmSignUp";
import TurnOnJob from "./components/pages/Jobs/TurnOnJob";
import SearchJob from "./components/pages/Jobs/SearchJob";
import Jobs from "./components/pages/Jobs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseContainer />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<Home />} />
          <Route path="resume" element={<Resume />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Outlet />} />
        </Route>
        <Route path="jobs" element={<Jobs />}>
          <Route path="turn-on" element={<TurnOnJob />} />
          <Route path="search" element={<SearchJob />} />
          <Route path="create" element={<SearchJob />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />}>
          <Route path="" element={<DevideSignUp />} />
          <Route path="candidate" element={<CandidateSignUp />} />
          <Route path="recruiter" element={<RecruiterSignUp />} />
        </Route>
        <Route path="confirmSignUp" element={<ConfirmSignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
