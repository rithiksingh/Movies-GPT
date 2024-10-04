import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
const Header = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSignOut= ()=>{

    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate('/error');
    });

  }
  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(
          addUser({
             uid: uid, 
             email: email, 
             displayName: displayName 
            }));
            navigate("/browse");
      } else {
        //user signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmmount
    return ()=> unsubscribe();
  },[]);
  return (
    <>
      <div className="absolute z-10 px-8 py-2 bg-gradient-to-b from-black w-full flex justify-between items-center p2">
        <img
          className="w-44"
          src={LOGO}
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
  