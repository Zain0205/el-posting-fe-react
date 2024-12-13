import defaultProfile from "../assets/images/defaultProfile.png";

function CommentChat({ content, sender_img, isOwn, username }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      {!isOwn && (
        <div className="text-sm text-gray-500 mr-2">
          <img
            src={sender_img ? `http://localhost:3000${sender_img}` : defaultProfile}
            className="h-10 w-10 rounded-full"
            alt=""
          />
        </div>
      )}
      <div className="">
        <p className="text-sm font-bold">{username}</p>
        <div className={`max-w-xs px-3 py-1 bg-white break-words gap-x-3 rounded-xl flex text-black shadow-lg ${isOwn ? "rounded-tr-none" : "rounded-tl-none"}`}>
          <p className="text-sm whitespace-pre-wrap max-w-full break-words">{content}</p>
          <div className="flex items-end">
            <p className="text-[8px] place-items-end text-black mt-1 text-right">12.00</p>
          </div>
        </div>
      </div>
      {isOwn && (
        <div className="text-sm text-gray-500 ml-2">
          <img
            src={sender_img ? `http://localhost:3000${sender_img}` : defaultProfile}
            className="h-10 w-10 rounded-full"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default CommentChat;
