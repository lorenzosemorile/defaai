import {useContext, useRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import './Header.scss';
import caret from '../../assets/img/caret.svg';
import {Overlay} from "../Overlay/Overlay";
import {VideoContext} from "../../context/Video/VideoContext";
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
    id : 'email2',
    label : 'Email'
  },
  {
    id : 'marketing2',
    label : 'Marketing'
  },
  {
    id : 'greeting3',
    label : 'Greeting'
  },
]

export const Header = () => {

  const [filling, setFilling] = useState(false);
  const inputRef = useRef();
  const textareaRef = useRef();
  const videoContext = useContext(VideoContext);
  const navigate = useNavigate();

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

  const tagClickHandle = (tag) => {
    if (videoContext.tags.some(t => tag.id === t.id)){
      videoContext.removeTag(tag.id);
      return;
    }
    videoContext.addTag(tag);
  }

  const renderSettingsForm = () => {
    if (!filling) return;
    return (
      <div className="settings">
        <textarea
          ref={textareaRef}
          rows="2"
          defaultValue={videoContext.description}
        />
        <div className="settings__tags">
          {defaultTags.map(tag => {
            const selected = videoContext.tags.some((selectedTag) => tag.id === selectedTag.id);
            return (
              <button
                onClick={() => tagClickHandle(tag)}
                key={tag.id}
                className={`button button--tag ${selected ? 'selected' : ''}`}>
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
            className="header__input__text pl-0"
            defaultValue={videoContext.title}
            onFocus={() => setFilling(true)}
          />
          {renderSettingsForm()}
        </div>
        <Overlay opened={filling} />
        <span className="caret">
          <img src={caret} alt="caret" />
        </span>
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
  const videoContext = useContext(VideoContext);
  const navigate = useNavigate();

  const logoutClickHandle = () => {
    profileContext.setLogged(false);
  }

  const newClickHandle = () => {
    videoContext.reset();
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
      default:
        return;
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