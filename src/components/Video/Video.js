import {useContext} from "react";
import {VideoContext} from "../../context/Video/VideoContext";
import more from '../../assets/img/more.svg';
import './Video.scss';

export const VideoList = () => {

  const videoContext = useContext(VideoContext);

  return (
    <section className="video-list">
      {videoContext.videos.map((video) => <VideoCard data={video} />)}
    </section>
  )
}

export const VideoCard = ({data}) => {


  const setTranslate = () => {
    const {alignment} = data;
    if (alignment.id === 'center') return '';
    if (alignment.id === 'left') return 'translate(-20%)';
    if (alignment.id === 'right') return 'translate(20%)';
  }

  return (
    <div className="video-card">
      <MoreMenu />
      <figure className="overflow-hidden" style={{
        background: `url(${data.background.src})`,
        backgroundSize: 'cover'
      }}>
        <img className="video-card__image" src={data.actor.src} alt={data.actor.label} style={{
          transform: setTranslate()
        }}/>
      </figure>
      <span className="video-card__title">{data.title}</span>
      <div className="video-card__tags">
        {data.tags.map(tag => {
          return (
            <button
              key={tag.id}
              className={`button button--tag`}>
              {tag.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export const MoreMenu = ({id}) => {
  return (
    <div className="more-menu">
      <button>
        <img src={more} alt="more icon"/>
      </button>
    </div>
  )
}