import caret from '../../assets/img/caret.svg';
import './Header.scss';
import {Overlay} from "../Overlay/Overlay";
import {useContext, useEffect, useRef, useState} from "react";
import {VideoContext} from "../../context/Video/VideoContext";
import {useNavigate} from 'react-router-dom';

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
    navigate('/myvideos');
  }

  const renderSettingsForm = () => {
    if (!filling) return;
    return (
      <div className="settings">
        <textarea ref={textareaRef} rows="2" defaultValue={videoContext.description}></textarea>
        <button className="button button--save" onClick={saveInfoHandle} >Save</button>
        <div className="settings__tags">
          <button className="button">Marketing</button>
          <button className="button">Marketing</button>
          <button className="button">Marketing</button>
          <button className="button">Marketing</button>
          <button className="button">Marketing</button>
        </div>
      </div>
    )
  }

  return (
    <header className="header">
      <div className="header__input">
        <div className="z-10 relative">
          <input
            ref={inputRef}
            className="header__input__text"
            placeholder={videoContext.title}
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

export const HeaderStatic = ({title, children}) => {

  return (
    <header className="header">
      <div className="header__input">
        <span>{title}</span>
      </div>
      <div className="header__actions">
        <button className="button button--save">Create New</button>
      </div>
    </header>
  )
}