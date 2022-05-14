import {MyAccountNav} from "./MyAccountNav";
import {Fragment, useState} from "react";
import {MyProfile} from "./MyProfile";
import {MyPlan} from "./MyPlan";
import {Billing} from "./Billing";

export const MyAccount = () => {

  const [contentActive, setContentActive] = useState('myprofile');

  const onActiveChange = (id) => {
    setContentActive(id);
  }

  const renderContent = () => {
    switch (contentActive){
      case 'myprofile':
        return <MyProfile />
      case 'myplan':
        return <MyPlan />
      case 'billing':
        return <Billing />
      default:
        return null;
    }
  }

  return (
    <Fragment>
      <MyAccountNav onActive={onActiveChange}/>
      {renderContent()}
    </Fragment>
  )
}