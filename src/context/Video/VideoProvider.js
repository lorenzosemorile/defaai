import {VideoContext} from "./VideoContext";
import {
  SET_TITLE,
  SET_DESCRIPTION,
  SET_SCRIPT,
  SET_ACTOR,
  ADD_VIDEO,
  SET_ALIGNMENT,
  RESET,
  SET_BACKGROUND, ADD_BACKGROUND, SET_VOICE
} from "./actions";
import {useReducer} from 'react';

const defaultBackgrounds = [
  {
    id : '1',
    label : 'Office',
    src : require('../../assets/img/backgrounds/1.jpg')
  },
  {
    id : '2',
    label : 'Office',
    src : require('../../assets/img/backgrounds/2.jpg')
  },
  {
    id : '3',
    label : 'Office',
    src : require('../../assets/img/backgrounds/3.jpg')
  },
  {
    id : '4',
    label : 'Office',
    src : require('../../assets/img/backgrounds/4.jpg')
  },
  {
    id : '5',
    label : 'Office',
    src : require('../../assets/img/backgrounds/5.jpg')
  },
  {
    id : '6',
    label : 'Office',
    src : require('../../assets/img/backgrounds/6.jpg')
  },
]

const defaultVideoState = {
  title : 'Say Hi to my costumer',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus justo nisi, ultricies ut turpis eget, bibendum tempor mauris. Curabitur sodales lobortis bibendum.',
  script : 'Type or paste your videoscript here. You can also request a translation of an English script to any of 27 other languages',
  alignment : {},
  actor: {},
  voice: {},
  videos: [],
  background: {},
  backgrounds: defaultBackgrounds
};

export const defaultScriptText = defaultVideoState.script;

const VideoReducer = (state, action) => {
  const {type, payload} = action;
  switch (type){
    case SET_TITLE:
      return {...state, title : payload};
    case SET_DESCRIPTION:
      return {...state, description: payload};
    case SET_SCRIPT:
      return {...state, script: payload};
    case SET_ACTOR:
      return {...state, actor: payload};
    case SET_VOICE:
      return {...state, voice: payload};
    case SET_ALIGNMENT:
      return {...state, alignment: payload};
    case RESET:
      console.log('RESET');
      return {
        ...state,
        ...defaultVideoState
      };
    case ADD_VIDEO:
      const video = {
        title: state.title,
        description: state.description,
        actor: state.actor,
        script: state.script,
        alignment: state.alignment,
        background: state.background
      };
      return {
        ...state,
        videos: state.videos.concat(video)
      };
    case SET_BACKGROUND:
      return {...state, background: payload};
    case ADD_BACKGROUND:
      return {
        ...state,
        backgrounds: [payload, state.backgrounds]
      };
    default:
      return defaultVideoState
  }
}

export const VideoProvider = ({children}) => {

  const [videoState, dispatchVideoAction] = useReducer(VideoReducer, defaultVideoState);

  const setTitle = (title) => {
    dispatchVideoAction({type: SET_TITLE, payload: title});
  }

  const setDescription = (description) => {
    dispatchVideoAction({type: SET_DESCRIPTION, payload: description});
  };

  const setScript = (script) => {
    dispatchVideoAction({type: SET_SCRIPT, payload: script});
  }

  const setActor = (actor) => {
    dispatchVideoAction({type: SET_ACTOR, payload: actor});
  }

  const setVoice = (voice) => {
    dispatchVideoAction({type: SET_VOICE, payload: voice});
  }

  const setAlignment = (align) => {
    dispatchVideoAction({type: SET_ALIGNMENT, payload: align});
  }

  const addVideo = () => {
    dispatchVideoAction({type: ADD_VIDEO});
  }

  const setBackground = (background) => {
    dispatchVideoAction({type: SET_BACKGROUND, payload: background});
  }

  const addBackground = (background) => {
    dispatchVideoAction({type: ADD_BACKGROUND, payload: background});
  }

  const reset = () => {
    dispatchVideoAction({type: RESET});
  }

  const videoCtx = {
    title : videoState.title,
    description : videoState.description,
    alignment: videoState.alignment,
    actor: videoState.actor,
    voice: videoState.voice,
    script: videoState.script,
    videos: videoState.videos,
    background: videoState.background,
    backgrounds: videoState.backgrounds,
    setTitle: setTitle,
    setDescription: setDescription,
    setScript: setScript,
    setActor: setActor,
    setVoice: setVoice,
    setAlignment: setAlignment,
    addVideo: addVideo,
    addBackground: addBackground,
    setBackground: setBackground,
    reset: reset
  }

  return (
    <VideoContext.Provider value={videoCtx}>
      {children}
    </VideoContext.Provider>
  )
}