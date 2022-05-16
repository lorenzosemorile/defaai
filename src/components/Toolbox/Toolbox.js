import {useState} from "react";
import './Toolbox.scss';
import {ToolboxActors} from "./ToolboxActors";
import {ToolboxVoices} from "./ToolboxVoices";
import {ToolboxAlignment} from "./ToolboxAlignment";
import {ToolboxBackground} from "./ToolboxBackground";

const navItems = [
  {
    id: 'actor',
    label : 'Actor',
  },
  {
    id: 'voice',
    label : 'Voice',
  },
  {
    id: 'alignment',
    label : 'Alignment',
  },
  {
    id: 'background',
    label : 'Background'
  }
]

/*
  Render different tool based on active navigation tab
 */
const renderTool = (active) => {
  switch (active){
    case 'actor':
      return <ToolboxActors />
    case 'voice':
      return <ToolboxVoices />
    case 'alignment':
      return <ToolboxAlignment />
    case 'background':
      return <ToolboxBackground />
    default:
      return;
  }
}

export const Toolbox = () => {

  const [activeItem, setActiveItem] = useState(navItems[0].id);

  const itemClickHandle = (e, label) => {
    e.preventDefault();
    setActiveItem(label);
  }

  return (
    <section className="toolbox">
      <nav className="toolbox__nav">
        <ul className="toolbox__list">
          {navItems.map(item => {
            const classes = ['toolbox__list__item'];
            if (item.id === activeItem){
              classes.push('toolbox__list__item--active');
            }
            return (
              <li
                key={item.id}
                className={classes.join(' ')}>
                <button onClick={(e) => itemClickHandle(e, item.id)}>
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      {renderTool(activeItem)}
    </section>

  )
}