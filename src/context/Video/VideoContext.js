import {createContext} from "react";
const defaultVideoContext = {
  title : '',
  description : '',
  script: '',
  alignment: {},
  tags : [],
  voice : {},
  background : {},
  actor: {},
  videos: [],
  setTitle : (title) => {},
  setDescription: (description) => {},
  setAlignment : () => {},
  setTags: (tag) => {},
  setVoice: (voice) => {},
  setBackground : (background) => {},
  setActor : (actor) => {},
  addVideo: () => {},
  reset: () => {}
}
export const VideoContext = createContext(defaultVideoContext);

