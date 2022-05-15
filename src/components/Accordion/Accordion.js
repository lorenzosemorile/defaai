import caret from "../../assets/img/caret.svg";
import './Accordion.scss';
import {useEffect, useState} from "react";

export const Accordion = ({title, children, active}) => {

  const [opened, setOpened] = useState(active);

  const open = () => {
    setOpened((prev) => !prev);
  };

  return (
    <div className={`accordion${opened ? ` opened animate__animated animate__fadeIn` : ''}`} >
      <div className="accordion__heading" onClick={open}>
        <span className="accordion__title">{title}</span>
        <span className="caret" ><img src={caret} alt="caret"/></span>
      </div>
      <div className="accordion__content">
        {children}
      </div>
    </div>
  )
}