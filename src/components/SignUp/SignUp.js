import {Link, useNavigate} from "react-router-dom";
import './SignUp.scss';
import logo from "../../assets/img/bg-logo.svg";
import {useContext, useRef} from "react";
import {ProfileContext} from "../../context/Profile/ProfileContext";

export const SignUp = () => {

  const formRef = useRef();
  const profileContext = useContext(ProfileContext);
  const navigate = useNavigate();

  const submitHandle = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const fullName = form.get('fullname');
    const email = form.get('email');
    const password = form.get('password');

    profileContext.setInformation({
      fullName, email, password
    });

    navigate('/login');

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
            <span className="text-green">Strong</span>
          </div>
          <input id="password" type="password" name="password"/>
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