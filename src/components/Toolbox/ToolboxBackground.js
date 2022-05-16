import {Fragment, useContext, useRef, useState} from "react";
import './ToolboxBackground.scss';
import {Accordion} from "../Accordion/Accordion";
import upload from '../../assets/img/upload.svg';
import {VideoContext} from "../../context/Video/VideoContext";

const accordions = [
  {
    id : 'images',
    title : 'Images'
  },
  {
    id : 'solidcolours',
    title : 'Solid Colours'
  },
  {
    id : 'videos',
    title : 'Videos'
  }
]

export const ToolboxBackground = () => {

  const activeAccordion = accordions[0];
  return (
    <section className="toolbox__background">
      {accordions.map(accordion => {
        const active = (accordion.id === activeAccordion.id);
        return (
          <Accordion
            key={accordion.id}
            title={accordion.title}
            active={active}>
            <div className={`toolbox__background__container toolbox--${accordion.id}`}>
              {(accordion.id === 'images') ? <Backgrounds /> : ''}
            </div>
          </Accordion>
        )
      })}
    </section>
  )
}

const Backgrounds = () => {

  const uploadRef = useRef();
  const videoContext = useContext(VideoContext);
  const backgrounds = videoContext.backgrounds;
  const [activeBackground, setActiveBackground] = useState(videoContext.background);

  const onchangeUploadFile = () => {
    const input = uploadRef.current;
    if (input.files && input.files[0]) {
      const background = uploadRef.current;
      const file = input.files[0]
      background.src = URL.createObjectURL(file); // set src to blob url
      videoContext.addBackground({
        id : Math.random().toString(16).substring(2, 10),
        label : file.name,
        src : background.src
      });
    }
  }

  const uploadClickHandle = () => {
    uploadRef.current.click();
  }

  const backgroundSelectHandle = (img) => {
    setActiveBackground(img);
    videoContext.setBackground(img);

  }

  return (
    <Fragment>
      <div className="toolbox__background__image toolbox__background__upload">
        <button onClick={uploadClickHandle}>
          <img src={upload} alt="upload icon"/>
        </button>
        <input
          ref={uploadRef}
          onChange={onchangeUploadFile}
          type="file"
          hidden/>
      </div>
      {backgrounds.map(img => {
        const active = img.id === activeBackground.id;
        return (
          <div key={img.id} className={`toolbox__background__image${active ? ' active' : ''}`}>
            <button onClick={() => backgroundSelectHandle(img)}>
              <img src={img.src} alt={img.label}/>
            </button>
          </div>
        )
      })}
    </Fragment>
  )
}