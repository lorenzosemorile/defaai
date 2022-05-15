import './MyAccountNav.scss';
import {useEffect, useState} from "react";
const nav = [
  {
    id : 'myprofile',
    label : 'Profile'
  },
  {
    id : 'myplan',
    label : 'My Plan'
  },
  {
    id : 'billing',
    label : 'Billing'
  }
]

export const MyAccountNav = ({onActive, activeId}) => {

  const [activeTab, setActiveTab] = useState(nav[0]);

  const onClickHandle = (e, item) => {
    setActiveTab(item);
    onActive(item.id);
  }

  useEffect(() => {
    const active = nav.find((n) => n.id === activeId ) || nav[0];
    setActiveTab(active);
  }, [activeId])

  return (
    <nav className="myaccount-nav">
      <ul>
        {nav.map(item => {
          return (
            <li
              className={activeTab.id === item.id && `active`}
              key={item.id}>
              <button
                onClick={(e) => onClickHandle(e, item)}>
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}