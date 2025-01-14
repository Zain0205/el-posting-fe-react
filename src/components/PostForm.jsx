import Input from "./Input";
import Button from "./Button";
import { useRef, useState } from "react";
import { LuFile } from "react-icons/lu";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [post, setPost] = useState({
    user_id: null,
    content: null,
    img_url: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const image = useRef();
  const navigate = useNavigate();

  const handlePostData = (fiedName, e) => {
    const temp = { ...post };

    temp[fiedName] = e.target.value;
    setPost(temp);
  };

  const handleImageData = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file); // Debug log

    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        image.current.src = e.target.result;
      };
      reader.readAsDataURL(file);

      // Simpan file ke state
      setPost((prev) => {
        console.log("Setting file to state:", file); // Debug log
        return {
          ...prev,
          img_url: file, // Pastikan ini adalah File object
        };
      });
    }
  };

    const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();

      // Debug log sebelum append
      console.log("Post data before append:", {
        user_id: post.user_id,
        content: post.content,
        img_url: post.img_url
      });

      // Append data dengan pengecekan lebih ketat
      if (post.user_id) formData.append("user_id", post.user_id);
      if (post.content) formData.append("content", post.content);
      if (post.img_url instanceof File) {  // Pastikan img_url adalah File
        console.log("Appending file:", post.img_url.name);
        formData.append("img_url", post.img_url);
      }

      // Debug log setelah append
      for (let [key, value] of formData.entries()) {
        console.log(`FormData entry - ${key}:`, value instanceof File ? value.name : value);
      }

      const response = await axios.post("/post/create", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setIsLoading(false);
        navigate("/home");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", err);
    }
  };

  return (
    <form
      onSubmit={handlePostSubmit}
      className="pb-20 lg:pb-0 max-w-lg mx-auto w-full"
      action=""
    >
      <label
        htmlFor="file-input"
        className="cursor-pointer"
      >
        <div className=" mb-5 h-48 rounded-lg border-2 border-secondary bg-background flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className=" flex flex-col items-center">
            <LuFile className="text-white text-5xl" />
            <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
            <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
            <input
              onChange={handleImageData}
              id="file-input"
              className="h-full w-full hidden opacity-0 cursor-pointer"
              type="file"
            />
          </div>
        </div>
      </label>
      <div className="mb-5">
        <img
          ref={image}
          alt=""
        />
      </div>
      {/* <Input
        placeholder="Add your title..."
        label="Post Title"
      /> */}
      <Input
        onChange={(e) => handlePostData("content", e)}
        placeholder="Add your description..."
        label="Post Description"
        value={post.content}
        textarea
      />
      <Button disabled={isLoading}>
        <div className="flex items-center justify-center gap-x-2">
          {isLoading && <div className="w-5 h-5 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin" />}
          {isLoading ? "Loading..." : "Post"}
        </div>
      </Button>
    </form>
  );
}

export default PostForm;
