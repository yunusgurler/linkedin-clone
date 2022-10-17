import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./features/userSlice";
import { auth } from "./firebase";
import "./Login.css";

function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginToApp = (e) => {

    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .then(userAuth => {
      dispatch(
        login({
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: userAuth.user.displayName,
        photoURL: userAuth.user.photoURL,
      }))
      navigate('/home')

    })
    .catch((error) => alert(error.message))
  };

  const register = () => {
    if(!name){
      return alert("Please enter a full name")
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      userAuth.user.updateProfile({
        displayName: name,
        photoURL: photoUrl
      })
      .then(() => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
          photoURL: photoUrl,
        }))
        
      })
      navigate('/home');

    }).catch(error => alert(error.message))
  }

  return (
    <div className="login">
      <img
        src="https://blog.waalaxy.com/wp-content/uploads/2021/01/Linkedin-Logo-2048x1280.png"
        alt=""
      />
      <h1>Make the most of your professional life</h1>

      <div className="login-body">
        <div className="login-topContainer">
          <div className="login-formContainer">
            <form>
              <p>Full Name</p>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text"></input>
              
              <p>Profile pic URL</p>
              <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type="text"></input>

              <p>Email</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"></input>

              <p>Password (6 or more characters)</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"></input>
            </form>
          </div>
        </div>

        <div className="login-bottomContainer">
          <div className="login-buttonAndText">
            <p>
              By clicking Agree & Join, you agree to the LinkedIn User
              Agreement, Privacy Policy, and Cookie Policy.
            </p>

            <button type="submit" onClick={loginToApp}>Login</button>
          </div>
        </div>
        <div className="login-googleContainer">
          <hr></hr>
          <p>or</p>
          <hr></hr>
        </div>

        <div className="login-googleSign">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt=""
          ></img>
          <p>Continue with Google</p>
        </div>

        <h3>Already on LinkedIn?</h3>
        <p onClick={register}>Sign up</p>
      </div>

      <p>Looking to create a page for a business? Get help</p>
    </div>
  );
}

export default Login;
