import {useContext, useEffect, useRef} from "react";
import avatar from '../../assets/img/avatar.jpg';
import pen from '../../assets/img/pen.svg';
import './MyProfile.scss'
import {ProfileContext} from "../../context/Profile/ProfileContext";



export const MyProfile = () => {

  const avatarInputRef = useRef();
  const avatarImageRef = useRef()
  const formRef = useRef();

  const profileContext = useContext(ProfileContext);

  const uploadAvatarHandle = () => {
    avatarInputRef.current.click();
  }

  const onchangeUploadFile = () => {
    const input = avatarInputRef.current;
    if (input.files && input.files[0]) {
      const avatar = avatarImageRef.current;
      avatar.onload = () => {
        //URL.revokeObjectURL(avatar.src);  // no longer needed, free memory
      }
      avatar.src = URL.createObjectURL(input.files[0]); // set src to blob url
      profileContext.setImage(avatar.src);
    }
  }

  const submitHandle = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const firstName = form.get('firstname');
    const lastName = form.get('lastname');
    const email = form.get('email');
    const information = {
      firstName, lastName, email
    }
    console.log(information);
    profileContext.setInformation(information);
  }

  return (
    <section className="profile">
      <div className="profile__avatar">
        <img
          className="profile__avatar__image"
          ref={avatarImageRef}
          src={profileContext.image}
        />
        <button onClick={uploadAvatarHandle}>
          <img src={pen} />
        </button>
        <input
          ref={avatarInputRef}
          type="file"
          hidden
          onChange={onchangeUploadFile}
          accept="image/jpeg, image/png, image/jpg"
        />

      </div>
      <form
        ref={formRef}
        className="profile__form"
        onSubmit={submitHandle}>
        <div className="profile__input">
          <label for="firstname">First Name</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder={profileContext.firstName} />
        </div>
        <div className="profile__input">
          <label for="lastname">Last Name</label>
          <input id="lastname" type="text" name="lastname" placeholder={profileContext.lastName}/>
        </div>
        <div className="profile__input">
          <label for="email">E-mail</label>
          <input id="email" type="email" name="email" placeholder={profileContext.email}/>
        </div>
        <div className="profile__button">
          <button type="submit" className="button button--save">Save Changes</button>
        </div>
      </form>
    </section>

  )

}

