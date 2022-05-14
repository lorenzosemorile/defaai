import './MyPlan.scss';
import check from '../../assets/img/check.svg';
import {useState} from "react";

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

export const MyPlan = () => {

  const [activePlan, setActivePlan] = useState(plans[2]);

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

export const Plan = ({data, active, label}) => {

  const renderButton = () => {
    if (active){
      return <button className="button button--plan button--plan--active" disabled={true}>{label}</button>;
    }
    return <button className="button button--plan">{label}</button>;
  }
  return (
    <div className={`plan${active ? ` active` : ''}`}>
      <h3>{data.title}</h3>
      <ul>
        {data.benefits.map(benefit => <li><img src={check} /><span>{benefit}</span></li>)}
      </ul>
      <div className="plan__price">
        <span className="plan__price__currency">$</span>
        <span className="plan__price__amount">{data.price}</span>
      </div>
      {renderButton()}
    </div>
  )

}