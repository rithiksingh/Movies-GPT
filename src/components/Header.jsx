import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  const navigate=useNavigate();
  const handleSignOut= ()=>{

    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate('/error');
    });

  }
  return (
    <>
      <div className="absolute z-10 px-8 py-2 bg-gradient-to-b from-black w-full flex justify-between items-center p2">
        <img
          className="w-44"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix-logo"
        />

        {user && (
          <div>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white w-24 h-9 font-bold rounded-md"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header
  