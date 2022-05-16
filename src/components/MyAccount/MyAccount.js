import {Fragment, useState} from "react";
import {MyAccountNav} from "./MyAccountNav";
import {MyProfile} from "./MyProfile";
import {MyPlan} from "./MyPlan";
import {Billing} from "./Billing";

export const MyAccount = () => {

  const [contentActive, setContentActive] = useState('myprofile');

  const onActiveChange = (id) => {
    setContentActive(id);
  }

  const onChangePlan = () => {
    setTimeout(()=> {
      setContentActive('billing');
    }, 600)
  }

  const renderContent = () => {
    switch (contentActive){
      case 'myprofile':
        return <MyProfile />
      case 'myplan':
        return <MyPlan onChangePlan={onChangePlan}/>
      case 'billing':
        return <Billing />
      default:
        return null;
    }
  }

  return (
    <Fragment>
      <MyAccountNav onActive={onActiveChange} activeId={contentActive}/>
      {renderContent()}
    </Fragment>
  )
}