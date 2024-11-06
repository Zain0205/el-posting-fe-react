import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import defaultProfile from "../assets/images/defaultProfile.png";

function PostCard({ content, img, username, like, profile }) {

  return (
    <>
      {img ? (
        <div className="mx-auto max-w-lg bg-gr00 rounded-lg mt-5">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img
                src={profile ? profile : defaultProfile}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 text-white font-roboto font-semibold">{username}</span>
            </div>
            <button className="text-white font-bold">...</button>
          </div>

          <div className="w-full rounded-lg overflow-hidden">
            <img
              src={`http://localhost:3000${img}`}
              alt="post"
              className="w-full object-cover"
            />
          </div>

          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <button>
                  <LuHeart className="text-white text-2xl" />
                </button>
              </div>
              <button>
                <LuMessageCircle className="text-white text-2xl" />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-white font-semibold">{username}</p>
              <p className="text-gray-400">Liked by {like} others</p>
              <p className="text-white">{content}</p>
            </div>

            <div className="mt-3">
              <input
                type="text"
                className="w-full bg-gray-800 text-white rounded-lg py-1 px-3"
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-lg rounded-lg mt-5">
          <div className="flex items-center border-b  justify-between py-4">
            <div className="flex items-center">
              <img
                src="https://github.com/shadcn.png"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 text-white font-roboto font-semibold">John Doe</span>
            </div>
            <button className="text-white font-bold">...</button>
          </div>

          <div className="py-4">
            <div className="">
              <p className="text-white font-semibold">John Doe</p>
              <p className="text-gray-400">Liked by 124 others</p>
              <p className="text-white">This is an example of an Instagram-like post card using Tailwind CSS.</p>
            </div>

            <div className="flex mt-4 items-center justify-between">
              <div className="flex items-center gap-x-4">
                <button>
                  <LuHeart className="text-white text-2xl" />
                </button>
              </div>
              <button>
                <LuMessageCircle className="text-white text-2xl" />
              </button>
            </div>

            <div className="mt-3">
              <input
                type="text"
                className="w-full bg-gray-800 text-white rounded-lg py-1 px-3"
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
