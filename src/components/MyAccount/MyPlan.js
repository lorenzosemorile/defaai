import React, {useContext, useState} from "react";
import './MyPlan.scss';
import {ProfileContext} from "../../context/Profile/ProfileContext";

const plans = [
  {
    id : 'free',
    order: 1,
    title : 'Free',
    benefits : [
      'Pellentesque interdum libero et',
      'Pellentesque posuere jdfkdfkdfhd',
      'Cras sed felis eget',
      'Maecenas eget luctus',
      'Nullam vitae augue'
    ],
    price : 0
  },
  {
    id : 'pro',
    order: 2,
    title : 'Pro',
    benefits : [
      'Maecenas eget luctus purus',
      'Graesent in sollicitudin velit',
      'Donec in orci vitae nisi',
      'Class aptent taciti',
      'Ut blandit vestibulum'
    ],
    price : 12
  },
  {
    id : 'team',
    order: 3,
    title : 'Team',
    benefits : [
      'Etiam ac finibus nisi, a porttitor',
      'Quisque tincidunt velit a sapien vulputate',
      'Vivamus pulvinar',
      'In hac habitasse platea',
      'Nullam vitae augue'
    ],
    price : 23
  },
  {
    id : 'agency',
    order: 4,
    title : 'Agency',
    benefits : [
      'Praesent in sollicitudin velit',
      'Nulla tincidunt finibus interdum',
      'Nullam vitae augue',
      'Curabitur eleifend',
      'Quisque vel ex enim'
    ],
    price : 43
  }
]

export const MyPlan = ({onChangePlan}) => {

  const profileContext = useContext(ProfileContext);
  const [activePlan, setActivePlan] = useState(() => {
    return plans.find(plan => plan.id === profileContext.activePlanId)
  });

  return (
    <section className="myplan">
      {plans.map(plan => {
        const active = (plan.id === activePlan.id);
        let label = (activePlan.order > plan.order) ? 'Downgrade' : 'Upgrade';
        if (active){
          label = 'Current Plan';
        }
        return (
          <Plan
            onChangePlan={onChangePlan}
            onPlanSelected={setActivePlan}
            key={plan.id}
            data={plan}
            active={active}
            label={label}
          />
        )
      })}
    </section>
  )
}

export const Plan = React.memo( ({data, active, label, onPlanSelected, onChangePlan}) => {

  const profileContext = useContext(ProfileContext);

  /*
  Select Plan, add bill to profile context and call the callbacks
   */
  const selectPlan = () => {
    profileContext.setActivePlanId(data.id);
    const bill = {
      id : Math.random().toString(16).substring(2, 10),
      date : Date.now(),
      amount : data.price
    };
    profileContext.addBill(bill);
    onPlanSelected(data);
    onChangePlan();
  }

  const renderButton = () => {
    if (active){
      return <button className="button button--plan button--plan--active" disabled={true}>{label}</button>;
    }
    return <button className="button button--plan" onClick={selectPlan}>{label}</button>;
  }

  return (
    <div className={`plan${active ? ` active` : ''}`}>
      <h3>{data.title}</h3>
      <ul>
        {data.benefits.map(benefit => (
          <li>
            <CheckIcon />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="plan__price">
        <span className="plan__price__currency">$</span>
        <span className="plan__price__amount">{data.price}</span>
      </div>
      {renderButton()}
    </div>
  )

});

export const CheckIcon = () => {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.80679 8C3.50258 8 3.21445 7.88399 3.02982 7.68397L0.531061 4.986C0.453806 4.90268 0.397406 4.80774 0.365083 4.70659C0.332761 4.60545 0.32515 4.50009 0.342686 4.39654C0.360223 4.29299 0.402562 4.19329 0.467284 4.10312C0.532006 4.01295 0.617842 3.93409 0.719884 3.87104C0.821889 3.80774 0.938181 3.7615 1.06209 3.73499C1.18601 3.70848 1.3151 3.70221 1.44198 3.71654C1.56887 3.73088 1.69104 3.76553 1.8015 3.81852C1.91196 3.87151 2.00854 3.9418 2.0857 4.02534L3.72986 5.79922L7.86369 0.374717C8.00079 0.195615 8.21922 0.0682581 8.47107 0.0205834C8.72292 -0.0270913 8.98763 0.00880839 9.20713 0.120408C9.6638 0.352429 9.80437 0.843904 9.51904 1.21765L4.63482 7.62397C4.55144 7.73382 4.43652 7.82538 4.30002 7.89071C4.16352 7.95604 4.00958 7.99316 3.85155 7.99886C3.83616 8 3.82218 8 3.80679 8Z"/>
    </svg>
  )
}