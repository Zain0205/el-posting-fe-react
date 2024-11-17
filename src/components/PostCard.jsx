import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import defaultProfile from "../assets/images/defaultProfile.png";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "../lib/axios";
import Cookies from "js-cookie";

const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const timeDifference = Math.floor((now - new Date(timestamp)) / 1000); // Time difference in seconds

  if (timeDifference < 60) {
    return `${timeDifference} second${timeDifference !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 604800) { // Less than a week
    const days = Math.floor(timeDifference / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 2419200) { // Less than a month (~28 days)
    const weeks = Math.floor(timeDifference / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 29030400) { // Less than a year (~12 months)
    const months = Math.floor(timeDifference / 2419200);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / 29030400); // ~12 months in a year
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};


function PostCard({ content, img, username, time, like, profile, userId, postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const id = Cookies.get("id");
  const postOwner = userId == id

  useEffect(() => {
    handleGetLikeStatus();
  }, []);

  const handleGetLikeStatus = async () => {
    const id = Cookies.get("id");
    try {
      const response = await axios.get(`/like/status/${id}/${postId}`);
      setIsLiked(response.data.isLiked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikePost = async () => {
    const payload = {
      post_id: postId,
      user_id: null,
    };

    try {
      const response = await axios.post("/like/add", payload, { withCredentials: true });
      if (response.status === 200) {
        setLikeCount(likeCount + 1);
        await handleGetLikeStatus();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlikePost = async () => {
    const payload = {
      post_id: postId,
      user_id: null,
    };

    try {
      const response = await axios.post("/like/remove", payload, { withCredentials: true });
      console.log(response);
      if (response.status === 200) {
        setLikeCount(likeCount - 1);
        await handleGetLikeStatus();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-lg rounded-lg mt-5">
        <div className="flex items-center justify-between py-4">
          <Link to={`/profile/${userId}`}>
            <div className="flex items-center">
              <img
                src={profile ? `http://localhost:3000${profile}` : defaultProfile}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 text-white font-roboto font-semibold">{username}</span>
            </div>
          </Link>
          {postOwner && <button className="text-white font-bold">...</button>}
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
              <button onClick={isLiked ? handleUnlikePost : handleLikePost}>{isLiked ? <FaHeart className="text-red-500 text-2xl" /> : <LuHeart className="text-white text-2xl" />}</button>
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
            <p className="text-gray-400">Liked by {likeCount} people</p>
            <p className="text-white">{content}</p>
            <p className="text-white">Created {formatTimeAgo(time)}</p>
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
    </>
  );
}

export default PostCard;
