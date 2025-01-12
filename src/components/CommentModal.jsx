import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import axios from "../lib/axios";
import BubbleChat from "./BubbleChat";
import CommentChat from "./CommentChat";

function CommentModal({ setIsOpen, img, postId }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    const payload = {
      user_id: null,
      post_id: postId,
      content: newComment,
    };

    if (newComment.trim()) {
      try {
        setIsLoading(true);
        const response = await axios.post("/comment/add", payload, { withCredentials: true });
        if (response.status !== 201) {
          throw new Error("Failed to add comment");
        }
        setComments([...comments, handleGetComments()]);
        setNewComment("");
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    }
  };

  const handleGetComments = async () => {
    try {
      const response = await axios.get(`/comment/list/${postId}`);
      setComments(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background relative w-full h-full max-w-6xl lg:h-[90%] flex shadow-lg overflow-hidden flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-background flex items-center justify-center">
          <img
            src={img}
            alt="Post"
            className="w-full h-full object-contain hidden md:block"
          />{" "}
        </div>{" "}
        <div className="w-full lg:w-1/2 flex flex-col lg:relative text-white overflow-scroll">
          <div className="p-4 flex-1 overflow-y-auto pb-40">
            {comments.map((comment) => (
              <CommentChat
                key={comment.id}
                comment_id={comment.id}
                sender_id={comment.user_id}
                sender_img={comment.img_url}
                content={comment.content}
                username={comment.username}
              />
            ))}
          </div>

          <div className="p-4 border-gray-300 fixed bottom-0 lg:absolute lg:left-0 bg-background w-full">
            <Input
              type="text"
              value={newComment}
              onChange={handleNewCommentChange}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
            <div className="flex items-center justify-center gap-x-2">
              {isLoading && <div className="w-5 h-5 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin" />}
              {isLoading ? "Loading..." : "Post"}
            </div>
            </Button>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default CommentModal;
