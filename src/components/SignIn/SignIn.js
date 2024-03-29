import {useContext, useRef, useState} from "react";
import './SignIn.scss';
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/img/bg-logo.svg';
import {ProfileContext} from "../../context/Profile/ProfileContext";

export const SignIn = () => {

  const formRef = useRef();
  const profileContext = useContext(ProfileContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  /*
    Check email and password for login and response management
   */
  const checkLogin = (data) => {
    const response = {
      RESP : 'OK',
      MSG : 'Logged in'
    };

    if (data.email !== profileContext.email){
      response.RESP = 'KO';
      response.MSG = 'Email Incorrect';
      return response;
    }

    if (data.password !== profileContext.password){
      response.RESP = 'KO';
      response.MSG = 'Password Incorrect';
      return response
    }

    return response;
  }

  /*
    On user submit, manage the response to login or deny the access
   */
  const submitHandle = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const email = form.get('email');
    const password = form.get('password');

    const response = checkLogin({
      email, password
    });

    if (response.RESP === 'OK'){
      profileContext.setLogged(true);
      navigate('/');
    }else {
      formRef.current.classList.add('animate__animated', 'animate__shakeX');
      formRef.current.addEventListener('animationend', () => {
        formRef.current.classList.remove('animate__animated', 'animate__shakeX');
        setError(response.MSG);
      });
    }
    console.log(response);

  }

  return (
    <section className="signin">
      <form ref={formRef} className="signin__form" onSubmit={submitHandle}>
        <div className="signin__input">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" name="email"/>
        </div>
        <div className="signin__input">
          <div className="flex justify-between">
            <label htmlFor="email">Password</label>
            <span className="text-blue">Forgot?</span>
          </div>
          <input id="password" type="password" name="password"/>
        </div>
        <div className="signin__button">
          <button type="submit" className="button button--save">Login</button>
        </div>
        <div className="signin__signup">Now here? <Link to='/signup'>Signup</Link></div>
        {error && (
          <div className="signin__error  animate__animated animate__bounceIn">{error}</div>
        )}
      </form>
      <div className="signin__logo"><img src={logo} alt="Logo"/></div>
    </section>
  )
}