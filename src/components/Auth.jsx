import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase-config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-screen bg-black text-white w-full flex justify-center items-center">
        <div className="bg-gray-200 w-11/12 md:w-auto  text-black px-4 py-8 rounded flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold text-green-500 ">VAIBHAV TALKS</h1>
          <p className="text-2xl flex-wrap items-center justify-center flex font-semibold uppercase">
            Sign In with <span className="text-red-400 ml-2 mr-2"> Google </span> to
            Continue
          </p>
          <button
            className="bg-indigo-400 py-2 px-4 rounded text-white font-bold"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
