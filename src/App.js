import {Header, HeaderStatic} from './components/Header/Header';
import {Sidebar} from './components/Sidebar/Sidebar';
import {Main} from './components/Main/Main';
import {
  BrowserRouter,
  Routes,
  Route, useNavigate, useLocation,
} from 'react-router-dom';
import './App.scss';
import {Fragment, useContext} from "react";
import {VideoProvider} from "./context/Video/VideoProvider";
import {VideoList} from "./components/Video/Video";
import {SignIn} from "./components/SignIn/SignIn";
import {SignUp} from "./components/SignUp/SignUp";
import {MyAccount} from "./components/MyAccount/MyAccount";
import {ProfileContext} from "./context/Profile/ProfileContext";
import {ProfileProvider} from "./context/Profile/ProfileProvider";


const Home = () => {
  return (
    <Fragment>
      <Sidebar />
      <div className="w-full">
        <Header className="w-full" />
        <Main className="flex w-full"/>
      </div>
    </Fragment>
  )
}

const MyVideos = () => {
  return (
    <Fragment>
      <Sidebar />
      <div className="w-full">
        <HeaderStatic title="Saved Videos" />
        <main>
          <VideoList />
        </main>
      </div>
    </Fragment>
  )
}

const Login = () => {
  return (
    <Fragment>
      <Sidebar />
      <div className="w-full">
        <HeaderStatic title="Login" />
        <main>
          <SignIn />
        </main>
      </div>
    </Fragment>
  )
}

const Registration = () => {
  return (
    <Fragment>
      <Sidebar />
      <div className="w-full">
        <HeaderStatic title="Create an account" />
        <main>
          <SignUp />
        </main>
      </div>
    </Fragment>
  )
}

const Profile = () => {
  return (
    <Fragment>
      <Sidebar />
      <div className="w-full">
        <HeaderStatic title="My Profile" />
        <main>
          <MyAccount />
        </main>
      </div>
    </Fragment>
  )
}



const App = () => {
  const profileContext = useContext(ProfileContext);
  const location = useLocation();
  if (!profileContext.isLogged){
    if (location.pathname !== '/signup'){
      return <Login />
    }
  }

  return (
    <VideoProvider>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/myvideos" element={<MyVideos/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </VideoProvider>
  );
}

export default App;
