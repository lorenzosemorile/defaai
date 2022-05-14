import './SignIn.scss';
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/img/bg-logo.svg';
import {useContext, useRef} from "react";
import {ProfileContext} from "../../context/Profile/ProfileContext";
import {checkLogin, CheckLogin} from "../../context/Profile/ProfileProvider";

export const SignIn = () => {

  const formRef = useRef();
  const profileContext = useContext(ProfileContext);
  const navigate = useNavigate();

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
      </form>
      <div className="signin__logo"><img src={logo}/></div>
    </section>
  )
}