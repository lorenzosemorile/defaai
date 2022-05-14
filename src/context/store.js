import {createContext, useState, useContext} from 'react'

export const StoreContext = createContext({});

export const StoreProvider = ({children}) => {
  const [store, setStore] = useState(useContext(StoreContext));
  return (
    <StoreContext.Provider value={[store, setStore]}>{children}</StoreContext.Provider>
  )
}

export const useStore = () => {
  const [store, setStore] = useContext(StoreContext);
  return [store, setStore];
}

