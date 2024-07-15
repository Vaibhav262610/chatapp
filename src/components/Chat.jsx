import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const Chat = (props) => {
  const { room } = props;
  const [msg, setMsg] = useState("");
  const [messages, setMessags] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const querySelector = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(querySelector, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessags(messages);
      console.log(auth);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msg == "") return;

    await addDoc(messageRef, {
      text: msg,
      createdAt: serverTimestamp(),
      photo: auth.currentUser.photoURL,
      user: auth.currentUser.displayName,
      room,
    });

    setMsg("");
  };

  return (
    <>
      <div className="h-screen bg-black w-full flex justify-center items-center">
        <div className="bg-gray-200 w-11/12 md:w-6/12 px-2 md:px-12 py-8 flex flex-col rounded">
            <div className="flex items-center mb-8 justify-center">
                <h1 className="text-2xl font-bold  uppercase">Welcome to {room}</h1>
            </div>
          <div className="h-96 text-area w-full rounded-lg overflow-y-scroll">
            {messages.map((message) => {
              return (
                <>
                  <div key={message.id} className="flex gap-3 items-center">
                    <img src={message.photo} alt="" className="rounded-full" height={40} width={40}/>
                    <h1 className="font-bold uppercase text-sm text-red-500">
                      {message.user}
                    </h1>
                    <h1>{message.text}</h1>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex mt-[-40px]  items-center justify-center">
            <form action="" onSubmit={handleSubmit} className="w-full flex">
              <div className="w-full">
                <input
                  type="text"
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                  className="p-2 w-full outline-none mt-12 "
                  placeholder="type your message here"
                />
              </div>
              <div className="mt-12 ">
                <button
                  className="bg-indigo-400 h-fit py-2 px-4 rounded text-white font-bold"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
