import './ToolboxActors.scss';
import {useContext, useEffect, useState} from "react";
import {VideoContext} from "../../context/Video/VideoContext";

const defaultActors = [
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
    src : require('../../assets/img/actors/3.jpg'),
  },
  {
    id : 'actor4',
    label : 'Peter',
    src : require('../../assets/img/actors/4.jpg'),
  },
  {
    id : 'actor5',
    label : 'Mike',
    src : require('../../assets/img/actors/5.png'),
  },
  {
    id : 'actor6',
    label : 'Skey',
    src : require('../../assets/img/actors/6.jpg'),
  },
  {
    id : 'actor7',
    label : 'Vincent',
    src : require('../../assets/img/actors/7.jpg'),
  }
]

export const ToolboxActors = () => {

  const [actors, ] = useState(defaultActors);
  const videoContext = useContext(VideoContext);
  const defaultActor = videoContext.actor || defaultActors[0]
  const [activeActor, setActiveActor] = useState(defaultActor);

  const actorClickHandler = (e, actor) => {
    setActiveActor(actor);
  }

  useEffect(() => {
    videoContext.setActor(activeActor);
  }, [activeActor])


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