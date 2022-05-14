import caret from '../../assets/img/caret.svg';
import './Header.scss';
import {Overlay} from "../Overlay/Overlay";
import {useContext, useEffect, useRef, useState} from "react";
import {VideoContext} from "../../context/Video/VideoContext";
import {useNavigate} from 'react-router-dom';
import {ProfileContext} from "../../context/Profile/ProfileContext";

const defaultTags = [
  {
    id : 'email',
    label : 'Email'
  },
  {
    id : 'marketing',
    label : 'Marketing'
  },
  {
    id : 'greeting',
    label : 'Greeting'
  },
  {
    id : 'email',
    label : 'Email'
  },
  {
    id : 'marketing',
    label : 'Marketing'
  },
  {
    id : 'greeting',
    label : 'Greeting'
  },
]

export const Header = () => {

  const [filling, setFilling] = useState(false);
  const videoContext = useContext(VideoContext);
  const navigate = useNavigate();
  const inputRef = useRef();
  const textareaRef = useRef();

  const saveInfoHandle = () => {
    videoContext.setTitle(inputRef.current.value);
    videoContext.setDescription(textareaRef.current.value)
    setFilling(false);
  }

  const saveVideoHandle = () => {
    videoContext.addVideo();
    navigate('/myvideos');
  }

  const cancelVideoHandle = () => {
    videoContext.reset();
  }

  const renderSettingsForm = () => {
    if (!filling) return;
    return (
      <div className="settings">
        <textarea ref={textareaRef} rows="2" defaultValue={videoContext.description} />
        <div className="settings__tags">
          {defaultTags.map(tag => {
            return (
              <button
                key={tag.id}
                className="button button--tag">
                {tag.label}
              </button>
            )
          })}
        </div>
        <div className="settings__save">
          <button className="button button--save" onClick={saveInfoHandle} >Save</button>
        </div>
      </div>
    )
  }

  return (
    <header className="header">
      <div className={`header__input${filling ? ' filling' : ''}`}>
        <div className="z-10 relative">
          <input
            ref={inputRef}
            className="header__input__text"
            defaultValue={videoContext.title}
            onFocus={() => setFilling(true)}/>
          {renderSettingsForm()}
        </div>
        <Overlay opened={filling} />
        <span className="caret"><img src={caret} alt="caret" /></span>
      </div>
      <div className="header__actions">
        <button className="button button--cancel" onClick={cancelVideoHandle}>Cancel</button>
        <button className="button button--save" onClick={saveVideoHandle}>Save</button>
      </div>
    </header>
  )
}

export const HeaderStatic = ({title, button, children}) => {

  const profileContext = useContext(ProfileContext);
  const navigate = useNavigate();

  const logoutClickHandle = () => {
    profileContext.setLogged(false);
  }

  const newClickHandle = () => {
    navigate('/');
  }

  const renderButton = () => {
    if (!button) return;
    switch (button){
      case 'logout':
        return (
          <button className="button button--logout" onClick={logoutClickHandle}>Logout</button>
        )
      case 'newvideo':
        return (
          <button className="button button--save" onClick={newClickHandle}>Create New</button>
        )
    }
  }

  return (
    <header className="header">
      <div className="header__input">
        <span>{title}</span>
      </div>
      <div className="header__actions">
        {renderButton()}
      </div>
    </header>
  )
}