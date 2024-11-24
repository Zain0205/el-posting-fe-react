import defaultProfile from "../assets/images/defaultProfile.png";

function BubbleChat({ content, username, img, isOwn }) {
  return (
    <>
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
        {!isOwn && (
          <div className="text-sm text-gray-500 mr-2">
            <img
              src={defaultProfile}
              className="h-10 w-10 rounded-full"
              alt=""
            />
          </div>
        )}
        <div className={`max-w-xs px-4 py-2 rounded-lg shadow-lg ${isOwn ? "bg-blue-500 text-white rounded-tr-none" : "bg-gray-200 text-gray-800 rounded-tl-none"}`}>
          <p>{content}</p>
          <div className="text-xs text-gray-400 mt-1 text-right">12.00</div>
        </div>
        {isOwn && (
          <div className="text-sm text-gray-500 ml-2">
            <img
              src={defaultProfile}
              className="h-10 w-10 rounded-full"
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
}

export default BubbleChat;
