import {createContext} from "react";
const defaultProfileContext = {
  firstName : '',
  lastName : '',
  fullName: '',
  email: '',
  image: '',
  isLogged: false,
  password: '',
  setInformation : (information) => {},
  setImage: (image) => {},
  setLogged: (logged) => {}
}
export const ProfileContext = createContext(defaultProfileContext);

