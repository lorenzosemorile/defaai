import './ToolboxActors.scss';
import {useContext, useState} from "react";
import {VideoContext} from "../../context/Video/VideoContext";

const actors = [
  {
    id : 'actor1',
    label : 'YoYo',
    src : require('../../assets/img/actors/1.png'),
  },
  {
    id : 'actor2',
    label : 'Anna',
    src : require('../../assets/img/actors/2.png'),
  },
  {
    id : 'actor3',
    label : 'May',
    src : require('../../assets/img/actors/3.png'),
  },
  {
    id : 'actor4',
    label : 'Peter',
    src : require('../../assets/img/actors/4.png'),
  },
  {
    id : 'actor5',
    label : 'Mike',
    src : require('../../assets/img/actors/5.png'),
  },
  {
    id : 'actor6',
    label : 'Skey',
    src : require('../../assets/img/actors/6.png'),
  },
  {
    id : 'actor7',
    label : 'Vincent',
    src : require('../../assets/img/actors/7.png'),
  }
]

export const ToolboxActors = () => {

  const videoContext = useContext(VideoContext);
  const defaultActor = videoContext.actor || actors[0];
  const [activeActor, setActiveActor] = useState(defaultActor);

  /* Save selected actor in a video context */
  const actorClickHandler = (e, actor) => {
    videoContext.setActor(activeActor);
    setActiveActor(actor);
  }

  return (
    <div className="toolbox__actors">
      {actors.map(actor => {
        const classes = ['actor'];
        if (actor.id === activeActor.id){
          classes.push('actor--active');
        }
        return (
          <figure
            key={actor.id}
            className={classes.join(' ')}
            onClick={(e) => actorClickHandler(e, actor) }>
            <button>
              <img src={actor.src} alt={actor.label}/>
              <span className="actor__label">{actor.label}</span>
            </button>
          </figure>
        )
      })}
    </div>
  )
}