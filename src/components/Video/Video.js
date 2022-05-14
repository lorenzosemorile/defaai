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
  return (
    <div className="video-card">
      <MoreMenu />
      <img className="video-card__image" src={data.actor.src} alt={data.actor.label}/>
      <span className="video-card__title">{data.title}</span>
      <div className="video-card__tags"></div>
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