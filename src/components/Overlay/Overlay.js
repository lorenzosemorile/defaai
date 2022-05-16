import ReactDOM from 'react-dom';
import './Overlay.scss';
const overlayElement = document.getElementById('overlay');

/*
Manage the overlay in a Portal
 */
export const Overlay = ({opened}) => {

  if (!opened) return null;
  return (
    ReactDOM.createPortal(
      <div className={`overlay animate__animated animate__fadeIn`}/>,
      overlayElement
    )
  )
}