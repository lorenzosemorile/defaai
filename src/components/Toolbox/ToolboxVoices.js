import wave from '../../assets/img/wave.svg';
import play from '../../assets/img/play.svg';
import pause from '../../assets/img/pause.svg';

import './ToolboxVoices.scss';
import {Player} from "../Player/Player";
import {useContext, useEffect, useRef, useState} from "react";
import {VideoContext} from "../../context/Video/VideoContext";
const defaultVoices = [
  {
    id : 'asian',
    label : 'Asian',
    media : require('../../assets/audio/asian.mp3')
  },
  {
    id : 'british',
    label : 'British',
    media : require('../../assets/audio/british.mp3')
  },
  {
    id : 'american',
    label : 'American',
    media: require('../../assets/audio/american.mp3')
  }
]

export const ToolboxVoices = () => {

  const [activeVoice, setActiveVoice] = useState(defaultVoices[0]);

  return (
    <section className="toolbox__voices">
      {defaultVoices.map(voice => {
        return (
          <Voice
            key={voice.id}
            voice={voice}/>
        )
      })}
    </section>
  )
}

const Voice = ({voice}) => {

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const clickHandle = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  }

  const playerRef = useRef();


  useEffect(() => {
    if (playing){
      playerRef.current.play();
    }else{
      playerRef.current.pause();
    }
  }, [playing])

  const onProgressHandle = (progress) => {
    setProgress(progress);
  }

  const videoContext = useContext(VideoContext);

  const onVoiceClick = () => {
    videoContext.setActor(voice);
  }

  const active = (videoContext.actor.id === voice.id);



  return (
    <div className={`toolbox__voice${active ? ` active` : ''}`} onClick={onVoiceClick}>
      <button
        className="button button--play"
        onClick={clickHandle}>
        <img src={playing ? play : pause}/>
      </button>
      <div className="sample">
        <span className="sample__title">{voice.label}</span>
        <img className="sample__image" src={wave} alt="wave" />
        <span className="sample__percentage">{(progress > 0) ? `${progress}%` : ''}</span>
        <Player
          ref={playerRef}
          getProgress={onProgressHandle}
          data={{
            title : voice.label,
            src : voice.media,
            type: 'audio/mp3'
          }}
        />
      </div>
    </div>
  )
}