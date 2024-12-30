import Input from "./Input";
import Button from "./Button";
import { useRef, useState, useEffect } from "react";
import { LuFile } from "react-icons/lu";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPostForm() {
  const [post, setPost] = useState({
    user_id: null,
    content: "",
    img_url: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [initialImage, setInitialImage] = useState(null);

  const editImage = useRef();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/post/detail/${postId}`, { withCredentials: true });

        if (response.status === 200) {
          const { user_id, content, img_url } = response.data[0];
          setPost({ user_id, content, img_url });
          // setInitialImage(img_url);
        }
        console.log(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleImageData = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        editImage.current.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
    setPost({ ...post, img_url: file });
  };

  const handlePostData = (fieldName, e) => {
    setPost({ ...post, [fieldName]: e.target.value });
  };

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("user_id", post.user_id);
      formData.append("content", post.content);
      if (post.img_url) {
        formData.append("img_url", post.img_url);
      }

      const response = await axios.patch(
        `/post/${postId}/edit`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
      }
      setIsLoading(false);
      navigate(`/profile/${post.user_id}`);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={handleEditPostSubmit}
      className="pb-20 lg:pb-0 max-w-lg mx-auto w-full"
    >
      <label
        htmlFor="edit-file-input"
        className="cursor-pointer"
      >
        <div className="mb-5 h-48 rounded-lg border-2 border-secondary bg-background flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="flex flex-col items-center">
            <LuFile className="text-white text-5xl" />
            <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
            <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
            <input
              onChange={handleImageData}
              id="edit-file-input"
              className="h-full w-full hidden opacity-0 cursor-pointer"
              type="file"
            />
          </div>
        </div>
      </label>
      <div className="mb-5">
        <img
          ref={editImage}
          src={`http://localhost:3000${post.img_url}`}
          alt="Preview"
          // className="max-h-48"
        />
      </div>
      <Input
        onChange={(e) => handlePostData("content", e)}
        placeholder="Edit your description..."
        label="Post Description"
        value={post.content}
        textarea
      />
      <Button disabled={isLoading}>
        <div className="flex items-center justify-center gap-x-2">
          {isLoading && <div className="w-5 h-5 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin" />}
          {isLoading ? "Saving..." : "Save Changes"}
        </div>
      </Button>
    </form>
  );
}

export default EditPostForm;
