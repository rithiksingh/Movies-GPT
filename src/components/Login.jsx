import { useState, useRef } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate";

const Login = () => {
    const [isSignInForm,setIsSignInForm]= useState(true);
    const [errMessage,setErrMessage]=useState("");
    const email=useRef(null);
    const password=useRef(null);


    const handleButtonClick=()=>{
        // validate the form data
        const message=checkValidData(email.current.value,password.current.value);
        setErrMessage(message);
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
