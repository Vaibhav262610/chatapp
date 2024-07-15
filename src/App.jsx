import { useRef, useState } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return (
    <>
      {room ? (
        <div>
          <Chat room={room} />
        </div>
      ) : (
        <div className="h-screen flex-col gap-8 bg-black w-full flex justify-center items-center">
          <div className=" bg-gray-200 px-4 py-8 flex flex-col rounded">
            <h1 className="text-3xl uppercase font-bold">Enter Room Name </h1>
            <input
              type="text"
              ref={inputRef}
              className="p-2 outline-none mt-12"
              placeholder="enter your room name here..."
            />
            <button
              onClick={() => setRoom(inputRef.current.value)}
              className="bg-indigo-400 py-2 px-4 rounded text-white font-bold mt-4"
            >
              Enter Room
            </button>
          </div>
          <div>
            <button
              className="bg-red-400 h-fit py-2 px-4 rounded text-white font-bold"
              onClick={signUserOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
