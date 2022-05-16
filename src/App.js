import {Fragment, useContext} from "react";
import {Routes, Route, useLocation} from 'react-router-dom';
import {Header, HeaderStatic} from './components/Header/Header';
import {Sidebar} from './components/Sidebar/Sidebar';
import {VideoProvider} from "./context/Video/VideoProvider";
import {VideoList} from "./components/Video/Video";
import {SignIn} from "./components/SignIn/SignIn";
import {SignUp} from "./components/SignUp/SignUp";
import {MyAccount} from "./components/MyAccount/MyAccount";
import {Preview} from "./components/Preview/Preview";
import {Toolbox} from "./components/Toolbox/Toolbox";
import {ProfileContext} from "./context/Profile/ProfileContext";
import './App.scss';
import 'animate.css';

/*
  Homepage
 */
const Home = () => {
  return (
    <Fragment>
      <Header/>
      <main className="video__settings__container">
        <Preview />
        <Toolbox />
      </main>
    </Fragment>
  )
}

/*
  My Video Section
*/
const MyVideos = () => {
  return (
    <Fragment>
      <HeaderStatic title="Saved Videos" button="newvideo" />
      <main>
        <VideoList />
      </main>
    </Fragment>
  )
}

/*
  Login Page
 */
const Login = () => {
  return (
    <Fragment>
      <HeaderStatic title="Login" />
      <main>
        <SignIn />
      </main>
    </Fragment>
  )
}

/*
  Registration Page
 */
const Registration = () => {
  return (
    <Fragment>
      <HeaderStatic title="Create an account" button="logout" />
      <main>
        <SignUp />
      </main>
    </Fragment>
  )
}

/*
  Profile section
 */
const Profile = () => {
  return (
    <Fragment>
      <HeaderStatic title="My Account" button="logout"/>
      <main>
        <MyAccount />
      </main>
    </Fragment>
  )
}



const App = () => {
  const profileContext = useContext(ProfileContext);
  const location = useLocation();

  /* Check if User is logged in */
  if (!profileContext.isLogged){
    /* Leave Signup Page accessible */
    if (location.pathname !== '/signup'){
      return (
        <Fragment>
          <Sidebar />
          <div className="w-full">
            <Login />
          </div>
        </Fragment>
      )
    }
  }

  return (
    <Fragment>
      <Sidebar />
        <div className="w-full">
        <VideoProvider>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/myvideos" element={<MyVideos/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </VideoProvider>
      </div>
    </Fragment>
  );
}

export default App;
