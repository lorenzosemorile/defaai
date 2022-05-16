import React from 'react';
import {useContext, useEffect, useRef, useState} from "react";
import './ToolboxVoices.scss';
import wave from '../../assets/img/wave.svg';
import play from '../../assets/img/play.svg';
import pause from '../../assets/img/pause.svg';
import {Player} from "../Player/Player";
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

export const ToolboxVoices = React.memo(() => {

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
});

const Voice = ({voice}) => {

  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoContext = useContext(VideoContext);

  /*
    On button click toogle playing state
  */
  const clickHandle = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  }

  /*
    On playing state start to play or pause the player
   */
  useEffect(() => {
    if (playing){
      playerRef.current.play();
    }else{
      playerRef.current.pause();
    }
  }, [playing])

  /*
    Manage played progress in a state
   */
  const onProgressHandle = (progress) => {
    setProgress(progress);
  }

  /*
    Save selected voice in a context
   */
  const onVoiceClick = () => {
    videoContext.setVoice(voice);
  }

  const active = (videoContext.voice.id === voice.id);

  return (
    <div className={`toolbox__voice${active ? ` active` : ''}`} onClick={onVoiceClick}>
      <button
        className={`button button--play ${playing ? 'playing' : 'paused'}`}
        onClick={clickHandle}>
        <img src={playing ? play : pause} alt="plaing icon"/>
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