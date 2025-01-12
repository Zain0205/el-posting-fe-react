import Cookies from "js-cookie";
import defaultProfile from "../assets/images/defaultProfile.png";
import { useState } from "react";
import axios from "../lib/axios";

function CommentChat({ comment_id, content, sender_img, username, sender_id }) {
  return (
    <div className={`flex justify-start items-center mb-4`}>
      <div className="text-sm text-gray-500 mr-2">
        <img
          src={sender_img ? `http://103.52.115.175${sender_img}` : defaultProfile}
          className="h-10 w-10 rounded-full"
          alt=""
        />
      </div>
      <div className="">
        <p className="text-sm font-semibold">{username}</p>
        <div className={`max-w-xs px-3 py-1 bg-white break-words gap-x-3 rounded-xl flex text-black shadow-lg rounded-tl-none mt-1`}>
          <p className="text-sm whitespace-pre-wrap max-w-full break-words">{content}</p>
          <div className="flex items-end">
            <p className="text-[8px] place-items-end text-black mt-1 text-right">12.00</p>
          </div>
        </div>
      </div>
      {/* {isOwn && (
        <div className="text-sm text-gray-500 ml-2">
          <img
            src={sender_img ? `http://localhost:3000${sender_img}` : defaultProfile}
            className="h-10 w-10 rounded-full"
            alt=""
          />
        </div>
      )} */}
    </div>
  );
}

export default CommentChat;
