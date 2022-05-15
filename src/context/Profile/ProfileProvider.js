import {ProfileContext} from "./ProfileContext";
import {
  SET_INFORMATION,
  SET_IMAGE, SET_LOGGED, SET_PLAN, ADD_BILL
} from "./actions";
import {useReducer} from 'react';

const defaultProfileState = {
  firstName : '',
  lastName: '',
  fullName: '',
  email: '',
  password: '',
  isLogged: false,
  activePlanId : 'team',
  bills: [
    {
      id : 'a9a6eb99a6e1f',
      date : 1608888600000,
      amount : 28
    }
  ],
  image : require('../../assets/img/avatar.jpg')
};

export const defaultProfileImage = defaultProfileState.image;

const ProfileReducer = (state, action) => {
  const {type, payload} = action;
  switch (type){
    case SET_INFORMATION:
      return {...state, ...payload};
    case SET_IMAGE:
      return {...state, image: payload};
    case SET_LOGGED:
      return {...state, isLogged: payload};
    case SET_PLAN:
      return {...state, activePlanId: payload};
    case ADD_BILL:
      return {...state, bills: state.bills.concat(payload)}
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

  const setActivePlanId = (id) => {
    dispatchProfileAction({type: SET_PLAN, payload: id});
  };

  const addBill = (bill) => {
    dispatchProfileAction({type: ADD_BILL, payload: bill});
  };

  const profileCtx = {
    firstName : profileState.firstName,
    lastName : profileState.lastName,
    fullName : profileState.fullName,
    email: profileState.email,
    image : profileState.image,
    password: profileState.password,
    isLogged: profileState.isLogged,
    activePlanId: profileState.activePlanId,
    bills: profileState.bills,
    addBill: addBill,
    setActivePlanId : setActivePlanId,
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