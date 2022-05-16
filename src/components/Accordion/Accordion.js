import {useState} from "react";
import './Accordion.scss';
import caret from "../../assets/img/caret.svg";

export const Accordion = ({title, active, children}) => {

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