import ReactDOM from 'react-dom';
import './Overlay.scss';
const overlayElement = document.getElementById('overlay');
export const Overlay = ({opened}) => {

  if (!opened) return null;
  return (
    ReactDOM.createPortal(
      <div className={`overlay`}/>,
      overlayElement
    )
  )
}