import {createContext} from "react";
const defaultProfileContext = {
  firstName : '',
  lastName : '',
  fullName: '',
  email: '',
  image: '',
  isLogged: false,
  password: '',
  activePlanId: 'team',
  bills : [],
  addBill : (bill) => {},
  setInformation : (information) => {},
  setImage: (image) => {},
  setLogged: (logged) => {},
  setActivePlanId: (id) => {}
}
export const ProfileContext = createContext(defaultProfileContext);

