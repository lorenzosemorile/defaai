import {useContext, useEffect, useRef, useState} from "react";
import pen from '../../assets/img/pen.svg';
import './MyProfile.scss'
import {ProfileContext} from "../../context/Profile/ProfileContext";


/*
  Component to manage user profile
 */
export const MyProfile = () => {

  const avatarInputRef = useRef();
  const avatarImageRef = useRef()
  const messageRef = useRef();
  const formRef = useRef();
  const [message, setMessage] = useState(null);

  /*
    Animated Feedback
   */
  useEffect(() => {
    if (!message) return
    messageRef.current.addEventListener('animationend', () => {
      setTimeout(() => {
        messageRef.current.classList.add('animate__fadeOut');
        setMessage(null);
      }, 1000);

    });

  }, [message])

  const profileContext = useContext(ProfileContext);

  /*
    Triggering click to Input File
  */
  const uploadAvatarHandle = () => {
    avatarInputRef.current.click();
  }

  /*
    Saving the new uploaded Avatar
  */
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

  /*
    Save the user information
   */
  const submitHandle = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const firstName = form.get('firstname');
    const lastName = form.get('lastname');
    const email = form.get('email');
    const information = {
      firstName, lastName, email
    }
    profileContext.setInformation(information);
    setMessage({
      class : 'success',
      text : 'Your profile has been correctly updated'
    })

  }

  /*
    Render message box
   */
  const renderMessage = () => {
    if (!message) return;
    const classes = [
      'profile__message',
      `profile__message--${message.class}`,
      'animate__animated',
      'animate__bounceIn'
    ]
    return (
      <div ref={messageRef} className={classes.join(' ')}>
        {message.text}
      </div>
    )
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
            defaultValue={profileContext.firstName}
           />
        </div>
        <div className="profile__input">
          <label for="lastname">Last Name</label>
          <input id="lastname" type="text" name="lastname" defaultValue={profileContext.lastName}/>
        </div>
        <div className="profile__input">
          <label for="email">E-mail</label>
          <input id="email" type="email" name="email" defaultValue={profileContext.email}/>
        </div>
        <div className="profile__button">
          <button type="submit" className="button button--save">Save Changes</button>
          {renderMessage()}
        </div>
      </form>
    </section>

  )

}

