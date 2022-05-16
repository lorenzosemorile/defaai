import {useContext, useRef, useState} from "react";
import './Preview.scss';
import actor from '../../assets/img/actors/1.png';
import {setAlignTranslate} from "../../Utilities/setAlignTranslate";
import {VideoContext} from "../../context/Video/VideoContext";
import {defaultScriptText} from "../../context/Video/VideoProvider";

export const Preview = () => {

  const scriptTextRef = useRef();
  const [chars, setChars] = useState(0);
  const videoContext = useContext(VideoContext);

  /*
    Set script on textarea value change
   */
  const onChangeHandle = (e) => {
    const script = e.target.value;
    videoContext.setScript(script);
  }

  /*
    Manage chars number written in a script textarea
   */
  const onKeyDownHandle = ()=> {
    const chars = scriptTextRef.current.value.length;
    setChars(chars);
  }

  return (
    <section className="preview">
      <div className="preview__image" style={{
        backgroundImage: `url(${videoContext.background.src})`,
        backgroundSize: `cover`
      }}>
        <picture>
          <img src={videoContext.actor.src || actor} alt="selected video settings" style={{
            transform: setAlignTranslate(videoContext.alignment)
          }}/>
        </picture>
        <button className="button button--preview">Preview</button>
      </div>
      <div className="preview__description">
          <textarea
            ref={scriptTextRef}
            className="preview__textarea"
            rows="5"
            placeholder={defaultScriptText}
            defaultValue={videoContext.script}
            onInput={onKeyDownHandle}
            onChange={onChangeHandle}>
          </textarea>
        <button className="button button--listen absolute bottom-4 left-4">Listen</button>
        <span className="preview__counter">{chars} {chars > 1 ? 'chars' : 'char'}</span>
      </div>
    </section>
  )
}