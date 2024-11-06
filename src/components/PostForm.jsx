import Input from "./Input";
import Button from "./Button";
import { useRef, useState } from "react";
import { LuFile } from "react-icons/lu";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [post, setPost] = useState({
    user_id: localStorage.getItem("id"),
    content: null,
    img_url: null,
  });
  const image = useRef();
  const navigate = useNavigate();

  const handleImageData = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        image.current.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
    setPost({ ...post, img_url: file });
  };

  const handlePostData = (fiedName, e) => {
    const temp = { ...post };

    temp[fiedName] = e.target.value;
    setPost(temp);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("user_id", post.user_id);
      formData.append("content", post.content);
      formData.append("img_url", post.img_url);

      const response = await axios.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log(response.data);
      }

      navigate("/home");
    } catch (err) {
      console.error(err);
    }
    

  }

  return (
    <form
    onSubmit={handlePostSubmit}
      className="pb-20 lg:pb-0"
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
        textarea
      />
      <Button>Post</Button>
    </form>
  );
}

export default PostForm;
