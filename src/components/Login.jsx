import { useState, useRef } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm,setIsSignInForm]= useState(true);
    const [errMessage,setErrMessage]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const name=useRef(null);
    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick=()=>{
        // validate the form data
        const message=checkValidData(email.current.value,password.current.value);
        setErrMessage(message);
        if(message) return;

        // sign in / sign up logic
        if (!isSignInForm) {
          // sign up logic
          createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          )
            .then((userCredential) => {
              // Signed up
              const user = userCredential.user;
              updateProfile(user, {
                displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                  })
                );
                navigate("/browse");
              }).catch((error) => {
                // An error occurred
                setErrMessage(error.message);
              });
              console.log(user);
              
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrMessage(errorCode + "- " + errMessage);
            });
        } 
        else {
          // sign in logic
          signInWithEmailAndPassword(auth,
            email.current.value,
            password.current.value)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrMessage(errorCode + "- " + errMessage);
            });
        }

    }
    const handleClick = ()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg"
          alt="logo"
        />
      </div>
      <form onSubmit={(e)=> e.preventDefault()} 
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-85">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        { !isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-700"
          />
        )
        }
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-700"
        />
        <p className="text-red-600">{errMessage}</p>
        <button onClick={handleButtonClick} className="p-4 my-5 bg-red-700 w-full rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 my-2 cursor-pointer" onClick={handleClick}>
          {isSignInForm
            ? "New to Netflix? Sign Up now"
            : "Already have an account? Sign In now"}
        </p>
      </form>
    </div>
  );
}

export default Login
