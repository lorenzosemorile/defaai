import {ProfileContext} from "./ProfileContext";
import {
  SET_INFORMATION,
  SET_IMAGE, SET_LOGGED
} from "./actions";
import {useReducer} from 'react';

const defaultProfileState = {
  firstName : '',
  lastName: '',
  fullName: '',
  email: '',
  password: '',
  isLogged: false,
  image : require('../../assets/img/avatar.jpg')
};

export const defaultProfileImage = defaultProfileState.image;

const ProfileReducer = (state, action) => {
  const {type, payload} = action;
  switch (type){
    case SET_INFORMATION:
      const p = {...state, ...payload}
      console.log(p);
      return p;
    case SET_IMAGE:
      return {...state, image: payload};
    case SET_LOGGED:
      return {...state, isLogged: payload};
    default:
      return defaultProfileState
  }
}

export const ProfileProvider = ({children}) => {

  const [profileState, dispatchProfileAction] = useReducer(ProfileReducer, defaultProfileState);

  const setInformation = (information) => {
    dispatchProfileAction({type: SET_INFORMATION, payload: information});
  }

  const setLogged = (logged) => {
    dispatchProfileAction({type: SET_LOGGED, payload: logged});
  }

  const setImage = (image) => {
    dispatchProfileAction({type: SET_IMAGE, payload: image});
  };


  const profileCtx = {
    firstName : profileState.firstName,
    lastName : profileState.lastName,
    fullName : profileState.fullName,
    email: profileState.email,
    image : profileState.image,
    password: profileState.password,
    isLogged: profileState.isLogged,
    setInformation: setInformation,
    setLogged : setLogged,
    setImage: setImage
  }

  return (
    <ProfileContext.Provider value={profileCtx}>
      {children}
    </ProfileContext.Provider>
  )
}

export const checkLogin = (data, profileContext) => {

  console.log(data);


};