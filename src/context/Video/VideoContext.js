import {createContext} from "react";
const defaultVideoContext = {
  title : '',
  description : '',
  script: '',
  alignment: {},
  tags : [],
  voice : {},
  backgrounds : [],
  background : {},
  actor: {},
  videos: [],
  setTitle : (title) => {},
  setDescription: (description) => {},
  addTag: (tag) => {},
  removeTag: (id) => {},
  setAlignment : () => {},
  setTags: (tag) => {},
  setVoice: (voice) => {},
  setBackground : (background) => {},
  addBackground: (backround) => {},
  setActor : (actor) => {},
  addVideo: () => {},
  reset: () => {}
}
export const VideoContext = createContext(defaultVideoContext);

