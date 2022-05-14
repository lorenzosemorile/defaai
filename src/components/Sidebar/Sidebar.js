import logo from '../../assets/img/logo.svg';
import cam from '../../assets/img/cam.svg';
import allvideo from '../../assets/img/allvideo.svg';
import avatar from '../../assets/img/avatar.jpg';
import './Sidebar.scss';
import { Link, useLocation } from "react-router-dom";
import {useContext, useEffect} from "react";
import {ProfileContext} from "../../context/Profile/ProfileContext";

const navigation = [
  {
    id : 'home',
    url: '/'
  },
  {
    id : 'myvideos',
    url : '/myvideos'
  },
  {
    id : 'login',
    url : '/login'
  },
  {
    id : 'profile',
    url : '/profile'
  }
]

export const Sidebar = () => {

  const location = useLocation();
  const profileContext = useContext(ProfileContext);

  const checkActive = (url) => {
    if (location.pathname === url){
      return ' sidebar__icon--active';
    }
    return '';
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__icon">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
        </div>
        {profileContext.isLogged && (
          <div className={`sidebar__icon${checkActive('/')}`}>
            <Link to="/">
              <img src={cam} alt="set video"/>
            </Link>
          </div>
        )}
        {profileContext.isLogged && (
          <div className={`sidebar__icon${checkActive('/myvideos')}`}>
            <Link to="/myvideos">
              <img src={allvideo} alt="all video"/>
            </Link>
          </div>
        )}
      </div>
      {profileContext.isLogged && (
        <div className="sidebar__bottom">
          <div className={`sidebar__icon sidebar__icon--avatar${checkActive('/profile')}`}>
            <Link to="/profile">
              <img src={profileContext.image} alt="avatar"/>
            </Link>
          </div>
        </div>
      )}

    </aside>
  )
}