import {VideoContext} from "./VideoContext";
import {SET_TITLE, SET_DESCRIPTION, SET_SCRIPT, SET_ACTOR, ADD_VIDEO, SET_ALIGNMENT, RESET} from "./actions";
import {useReducer} from 'react';

const defaultVideoState = {
  title : 'Say Hi to my costumer',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus justo nisi, ultricies ut turpis eget, bibendum tempor mauris. Curabitur sodales lobortis bibendum.',
  script : 'Type or paste your videoscript here. You can also request a translation of an English script to any of 27 other languages',
  alignment : {},
  actor: {},
  videos: []
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
        alignment: state.alignment
      };
      return {
        ...state,
        videos: state.videos.concat(video)
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

  const setAlignment = (align) => {
    dispatchVideoAction({type: SET_ALIGNMENT, payload: align});
  }

  const addVideo = () => {
    dispatchVideoAction({type: ADD_VIDEO});
  }

  const reset = () => {
    dispatchVideoAction({type: RESET});
  }

  const videoCtx = {
    title : videoState.title,
    description : videoState.description,
    alignment: videoState.alignment,
    actor: videoState.actor,
    script: videoState.script,
    videos: videoState.videos,
    setTitle: setTitle,
    setDescription: setDescription,
    setScript: setScript,
    setActor: setActor,
    setAlignment: setAlignment,
    addVideo: addVideo,
    reset: reset
  }

  return (
    <VideoContext.Provider value={videoCtx}>
      {children}
    </VideoContext.Provider>
  )
}