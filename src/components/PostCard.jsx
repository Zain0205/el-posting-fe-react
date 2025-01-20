import { LuHeart } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import defaultProfile from "../assets/images/defaultProfile.png";
import { Link, useNavigate } from "react-router-dom";
import CommentModal from "./CommentModal";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "../lib/axios";
import Cookies from "js-cookie";
import { formatTimeAgo } from "../lib/formater";

function PostCard({ content, img, username, time, detail, like, profile, userId, postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const id = Cookies.get("id");
  const postOwner = userId == id;

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
      setIsLoading(true);
      const response = await axios.post("/like/add", payload, { withCredentials: true });
      if (response.status === 200) {
        setLikeCount(likeCount + 1);
        await handleGetLikeStatus();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleUnlikePost = async () => {
    const payload = {
      post_id: postId,
      user_id: null,
    };

    try {
      setIsLoading(true);
      const response = await axios.post("/like/remove", payload, { withCredentials: true });
      if (response.status === 200) {
        setLikeCount(likeCount - 1);
        await handleGetLikeStatus();
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`/post/delete/${postId}`);
      if (response.status === 200) {
        setShowDeleteConfirm(false);
        setShowNotification(true);
        setTimeout(() => {
          navigate(`/profile/${id}`);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mx-auto relative max-w-lg rounded-lg mt-5">
        {/* Action Modal */}
        {showActionModal && (
          <div className="w-40 rounded-lg bg-gray-700 cursor-pointer text-white overflow-hidden right-0 top-16 absolute">
            <Link to={`/post-edit/${postId}`}>
              <div className="hover:bg-gray-800">
                <button className="w-full p-3 text-left">Edit</button>
              </div>
            </Link>
            <div className="hover:bg-gray-800">
              <button
                className="w-full p-3 text-left"
                onClick={() => {
                  setShowActionModal(false);
                  setShowDeleteConfirm(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-sm mx-4 w-full">
              <h2 className="text-xl font-bold text-white mb-4">Delete Post</h2>
              <p className="text-gray-300 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {showNotification && <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">Post deleted successfully!</div>}

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
          {postOwner && detail && (
            <button
              onClick={() => setShowActionModal(!showActionModal)}
              className="text-white font-bold"
            >
              ...
            </button>
          )}
        </div>

        <div className="w-full rounded-lg overflow-hidden">
          <img
            src={img}
            alt="post"
            className="w-full object-cover"
          />
        </div>

        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <button onClick={isLiked ? handleUnlikePost : handleLikePost}>
                {isLoading ? <div className="w-5 h-5 border-2 border-t-gray-500 border-gray-300 rounded-full animate-spin" /> : isLiked ? <FaHeart className="text-red-500 text-2xl" /> : <LuHeart className="text-white text-2xl" />}
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
            <p className="text-gray-400">Liked by {likeCount} people</p>
            <p className="text-white whitespace-pre-wrap">{content}</p>
            <p className="text-white">Created {formatTimeAgo(time)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
