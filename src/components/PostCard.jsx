import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import defaultProfile from "../assets/images/defaultProfile.png";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import { useState } from "react";
import axios from "../lib/axios";

function PostCard({ content, img, username, like, profile, userId, postId }) {
  const [isOpen, setIsOpen] = useState(false);

  // const handleGetComments = async () => {
  //   setIsOpen(true);

  //   try {
  //     const response = await axios.get(`/comment/list/${postId}`);
  //     setComments(response.data);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      {img ? (
        <div className="mx-auto max-w-lg rounded-lg mt-5">
          <div className="flex items-center justify-between py-4">
            <Link to={`/profile/${userId}`}>
              <div className="flex items-center">
                <img
                  src={profile ? profile : defaultProfile}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-3 text-white font-roboto font-semibold">{username}</span>
              </div>
            </Link>
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
              <button onClick={() => setIsOpen(true)}>
                <LuMessageCircle className="text-white text-2xl" />
              </button>
            </div>

            {isOpen && (
              <CommentModal
                img={img}
                postId={postId}
                setIsOpen={setIsOpen}
              />
            )}

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
                src={profile ? profile : defaultProfile}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 text-white font-roboto font-semibold">{username}</span>
            </div>
            <button className="text-white font-bold">...</button>
          </div>

          <div className="py-4">
            <div className="">
              <p className="text-white">{content}</p>
              <p className="text-gray-400">Liked by {like} others</p>
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
