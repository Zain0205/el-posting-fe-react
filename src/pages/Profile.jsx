import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import Cookies from "js-cookie";
import defaultProfile from "../assets/images/defaultProfile.png";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get("/profile/user", { withCredentials: true });
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    const handleGetPost = async () => {
      try {
        const response = await axios.get("/post/user/feed", {withCredentials: true});
        console.log(response.data);
        if (response.status === 200) {
          setPosts(response.data);
        }
        console.log(posts);
      } catch (err) {
        console.error("error");
      }
    };

    handleGetPost();
    handleGetUser();
  }, []);

  console.log(user);

  return (
    <>
      {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex bg-background lg:pl-72">
          <Navbar />
          <div className="h-screen overflow-scroll w-full pb-7">
            <div className="w-full h-96 relative flex justify-center items-center">
              <img
                src={defaultProfile}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="h-32 w-32 overflow-hidden rounded-full absolute -bottom-12 lg:-bottom-16 flex justify-center items-center">
                <img
                  src={defaultProfile}
                  className="object-cover"
                  alt=""
                />
              </div>
            </div>
            <div className="text-white gap-x-10 flex justify-center mt-20 px-5">
              <h1 className="text-2xl font-semibold font-roboto">{user.username}</h1>
            </div>

            <div className="flex justify-center mt-5 px-5 gap-x-10 text-center">
              <div>
                <h3 className="font-semibold text-lg text-white">Follower</h3>
                <p className="text-sm text-gray-400">{user.follower_count}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Following</h3>
                <p className="text-sm text-gray-400">{user.following_count}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Posts</h3>
                <p className="text-sm text-gray-400">{posts.length}</p>
              </div>
            </div>

            <div className="px-5 my-5">
              {true ? (
                <div className="flex gap-x-5">
                  <Button>Follow</Button>
                  <Button>Message</Button>
                </div>
              ) : (
                <Button>Edit Profile</Button>
              )}
            </div>

            <div className="px-5 text-center">
              <p className="text-sm text-gray-400 mt-2">{user.bio ? user.bio : "add bio"}</p>
            </div>

            <div className="mt-10 px-5">
              <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
              <div className="grid grid-cols-3 gap-4 mt-5">
                {/* Map through the posts array to render posts */}
                {posts.map((post) => {
                  return (
                    <div className="relative h-40 w-full bg-gray-300 overflow-hidden">
                      <img
                        src={`http://localhost:3000${post.img_url}`}
                        alt="Post"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Recomendation />
        </section>
      )}
    </>
  );
}
