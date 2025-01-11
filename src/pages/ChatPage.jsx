import Cookies from "js-cookie";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BubbleChat from "../components/BubbleChat";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import defaultProfile from "../assets/images/defaultProfile.png";
import axios from "../lib/axios";
import { LuMessageCircle } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import { getHourFromTimestamp } from "../lib/formater";

const socket = io("/", {
  path: "/socket.io/",
  transports: ['websocket', 'polling'],
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

function ChatPage() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userID = Cookies.get("id");
  const { receiverId } = useParams();

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get(`/profile/check/${receiverId}`);
        setUser(response.data);

        const loggedUserId = Cookies.get("id");
        setProfileOwner(response.data.id === parseInt(loggedUserId));
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    const handleGetChat = async () => {
      if (receiverId !== "inbox") {
        try {
          const response = await axios.get(`/chat/chat-history/${receiverId}`, { withCredentials: true });
          if (response.status !== 200) {
            throw new Error("Failed to get chat history");
          }
          await handleGetUser();
          console.log(response.data);
          setChats(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    handleGetChat();
  }, [receiverId]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("register", userID);

    socket.on("newMessage", (msg) => {
      setChats((prev) => [...prev, msg]);
    });

    const handleGetChatList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/chat/list-chat`, { withCredentials: true });

        if (response.status !== 200) {
          throw new Error("Failed to get chat list");
        }
        console.log(response.data);
        setChatList(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    handleGetChatList();
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const msg = {
      sender_id: userID,
      receiver_id: receiverId,
      content: message,
      // sender_avatar: null,
      created_at: new Date().toISOString(),
    };

    socket.emit("sendMessage", msg);
    setChats((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <>
      {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="h-screen flex justify-between bg-background md:pl-72 ">
          <Navbar />
          <div className={`border-r ${receiverId !== "inbox" ? "hidden" : "block"} border-l w-full xl:w-1/3 lg:w-2/3 h-screen overflow-scroll border-gray-900 pb-20 shadow-lg lg:flex py-3 lg:flex-col lg:py-5 lg:justify-between z-100`}>
            <div className="text-white mt-2">
              <h1 className="font-roboto px-5 text-2xl mb-2">Chat</h1>
              {isLoading && <ChatLoader />}
              {chatList.map((cl) => (
                <ChatList
                  key={cl.id}
                  id={cl.id}
                  img={cl.img_url}
                  content={cl.last_message}
                  username={cl.username}
                />
              ))}
            </div>
          </div>
          {receiverId == "inbox" ? (
            <Inbox />
          ) : (
            <div className={`h-screen w-full lg:w-2/3 bg-gray-800 overflow-scroll`}>
              {/* Header Chat */}
              <div className="sticky gap-x-3 top-0 z-10 bg-gray-900 border-b border-gray-700 py-4 px-5 flex items-center">
                <Link to="/chat/inbox">
                  <LuArrowLeft className="text-white text-2xl cursor-pointer" />
                </Link>
                <div className="flex items-center gap-3">
                  <img
                    src={user.img_url ? `http://localhost:3000${user.img_url}` : defaultProfile}
                    className="w-10 h-10 rounded-full"
                    alt="Avatar"
                  />
                  <h1 className="text-white font-semibold">{user.username}</h1>
                </div>
              </div>

              {/* Chat Content */}
              <div className="py-5 px-5 min-h-[80vh] md:min-h-[89vh] lg:min-h-[80vh] space-y-4">
                {chats.map((chat) => (
                  <BubbleChat
                    key={chat.id}
                    isOwn={chat.sender_id == userID}
                    content={chat.content}
                    sender_img={chat.sender_avatar}
                    time={chat.created_at}
                  />
                ))}
                <div ref={messageRef}></div>
              </div>

              {/* Input Chat */}
              <div className="sticky bottom-0 z-50 bg-gray-900 px-5 py-3 flex items-center gap-3">
                <textarea
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="flex-1 px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-full focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Tulis pesan..."
                  name="msg-input"
                  cols="1"
                  rows="1"
                ></textarea>
                {/* <input
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="flex-1 px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-full focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Tulis pesan..."
                /> */}
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

function ChatList({ id, username, img, content, time }) {
  return (
    <Link to={`/chat/${id}`}>
      <div className="py-5 cursor-pointer border-b border-gray-600 w-full flex items-center px-4">
        <div className="w-[15%]">
          <div>
            <img
              src={img ? `http://localhost:3000${img}` : defaultProfile}
              className="w-10 h-10 rounded-full"
              alt="@shadcn"
            />
          </div>
        </div>
        <div className="w-[64%]">
          <h1 className="text-base font-semibold">{username}</h1>
          {/* <p className="text-xs truncate mt-1">{content}</p> */}
        </div>
        <div className="w-[20%] text-end flex flex-col items-center">{/* <p className="text-[10px]">{getHourFromTimestamp(time)}</p> */}</div>
      </div>
    </Link>
  );
}

function Inbox() {
  return (
    <div className={`h-screen hidden lg:flex lg:items-center lg:justify-center w-full lg:w-2/3 overflow-y-scroll `}>
      <div className=" text-white lack p-5">
        <div className="border w-32 h-32 mx-auto flex items-center justify-center rounded-full">
          <LuMessageCircle className="text-7xl text-white mx-auto" />
        </div>
        <div className="text-center mt-5">
          <h1 className="text-2xl mb-1 font-roboto">Your Message</h1>
          <p className="text-sm">Send a message to start a chat</p>
        </div>
      </div>
    </div>
  );
}

function ChatLoader() {
  return (
    <div className="flex items-center gap-3 py-3 ml-3">
      <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12" />
      <div className="space-y-2">
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"> </div>
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]"> </div>
      </div>
    </div>
  );
}

export default ChatPage;
