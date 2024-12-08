import defaultProfile from "../assets/images/defaultProfile.png";

function BubbleChat({ content, sender_img, isOwn }) {
  return (
    <>
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
        {/* {!isOwn && (
          <div className="text-sm text-gray-500 mr-2">
            <img
              src={sender_img ? `http://localhost:3000${sender_img}` : defaultProfile}
              className="h-10 w-10 rounded-full"
              alt=""
            />
          </div>
        )} */}
        <div className={`max-w-xs break-words px-4 gap-x-3 py-1.5 overflow- rounded-xl flex shadow-lg ${isOwn ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-200 text-gray-800 rounded-tl-none"}`}>
          <p className="text-base whitespace-pre-wrap max-w-full break-words">{content}</p>
          <div className="flex items-end">
            <p className="text-[8px] place-items-end text-black mt-1 text-right">12.00</p>
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
    </>
  );
}

export default BubbleChat;
