import {Link, useNavigate} from "react-router-dom";
import './SignUp.scss';
import logo from "../../assets/img/bg-logo.svg";
import {useContext, useRef, useState} from "react";
import {ProfileContext} from "../../context/Profile/ProfileContext";

export const SignUp = () => {

  const formRef = useRef();
  const passwordRef = useRef();
  const [strength, setStrength] = useState(null);
  const profileContext = useContext(ProfileContext);
  const navigate = useNavigate();

  const checkPassword = () => {
    const value = passwordRef.current.value;
    const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    const mediumRegex = new RegExp("^(?=.{4,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    let response;
    if (strongRegex.test(value)) {
      response = {'class' : 'green', 'message': 'Strong!' };
    } else if (mediumRegex.test(value)) {
      response = {'class' : 'orange', 'message': 'Medium' };
    }
    setStrength(response);

  }

  const submitHandle = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const fullName = form.get('fullname');
    const email = form.get('email');
    const password = form.get('password');

    profileContext.setInformation({
      fullName, email, password
    });

    formRef.current.classList.add('animate__animated', 'animate__flipOutX');
    formRef.current.addEventListener('animationend', () => {
      //formRef.current.classList.remove('animate__animated', 'animate__shakeX');
      navigate('/login');
    });



  }

  const renderStrength = () => {
    if (!strength) return;
    return (
      <span className={`signup__strength--${strength.class}`}>{strength.message}</span>
    )
  }

  return (
    <section className="signup">
      <form ref={formRef} className="signup__form" onSubmit={submitHandle}>
        <div className="signup__input">
          <label htmlFor="fullname">Full name</label>
          <input id="fullname" type="text" name="fullname"/>
        </div>
        <div className="signup__input">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" name="email"/>
        </div>
        <div className="signup__input">
          <div className="flex justify-between">
            <label htmlFor="email">New Password</label>
            {renderStrength()}
          </div>
          <input ref={passwordRef} id="password" type="password" name="password" onInput={checkPassword}/>
        </div>
        <div className="signup__button">
          <button type="submit" className="button button--save">Signup</button>
        </div>
        <div className="signup__signup">Already user? <Link to='/login'>Login</Link></div>
      </form>
      <div className="signup__logo"><img src={logo}/></div>
    </section>
  )
}