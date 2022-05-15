import './ToolboxBackground.scss';
import {Fragment, useContext, useRef, useState} from "react";
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

  const videoContext = useContext(VideoContext);
  const backgrounds = videoContext.backgrounds;

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
              {(accordion.id === 'images') ? <Backgrounds backgrounds={backgrounds} /> : ''}
            </div>
          </Accordion>
        )
      })}
    </section>
  )
}

const Backgrounds = ({backgrounds}) => {

  const uploadRef = useRef();
  const videoContext = useContext(VideoContext);
  const [activeBackground, setActiveBackground] = useState(videoContext.background);

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
          <img src={upload} />
        </button>
        <input ref={uploadRef} type="file" hidden/>
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