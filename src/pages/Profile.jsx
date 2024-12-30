import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recomendation from "../components/Recomendation";
import Cookies from "js-cookie";
import defaultProfile from "../assets/images/defaultProfile.png";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { motion } from "framer-motion";
import ProfileLoading from "../components/ProfileLoading";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [profileOwner, setProfileOwner] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [followLoader, setFollowLoader] = useState(false);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        setIsUserLoading(true);
        const response = await axios.get(`/profile/check/${id}`);
        setUser(response.data);

        const loggedUserId = Cookies.get("id");
        setProfileOwner(response.data.id === parseInt(loggedUserId));
        setIsUserLoading(false);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    const handleGetPost = async () => {
      try {
        const response = await axios.get(`/post/user/feed/${id}`);
        if (response.status === 200) {
          setPosts(response.data);
        }
        setIsPostLoading(false);
        console.log(posts);
      } catch (err) {
        console.error("error");
      }
    };

    handleGetPost();
    handleGetUser();
    if (!profileOwner) {
      handleGetFollowStatus();
    }
  }, [id]);

  const handleGetFollowStatus = async () => {
    const followerId = Cookies.get("id");
    const followingId = id;

    try {
      const response = await axios.get(`/follow/status/${followerId}/${followingId}`);
      setIsFollowing(response.data.isFollowing);
    } catch (err) {
      console.error("error getting follow status");
    }
  };

  const handleFollowUser = async () => {
    const payload = {
      userFollowing: Cookies.get("id"),
      userFollowed: id,
    };

    try {
      setFollowLoader(true);
      const response = await axios.post("/follow/add", payload);
      if (response.status === 200) {
        setUser({ ...user, follower_count: user.follower_count + 1 });
        await handleGetFollowStatus();
      }
      setFollowLoader(false);
    } catch (err) {
      setFollowLoader(false);
      console.error(err);
    }
  };

  const handleUnfollowuser = async () => {
    const payload = {
      userFollowing: Cookies.get("id"),
      userFollowed: id,
    };

    try {
      setFollowLoader(true);
      const response = await axios.post("/follow/remove", payload);
      if (response.status === 200) {
        setUser({ ...user, follower_count: user.follower_count - 1 });
        await handleGetFollowStatus();
      }
      setFollowLoader(false);
    } catch (err) {
      setFollowLoader(false);
      console.error(err);
    }
  };

  return (
    <>
      {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex bg-background md:pl-72 pb-24 md:pb-0">
          <Navbar />
          <div className="h-screen text-white overflow-scroll w-full pb-7">
            {isUserLoading ? (
              <ProfileLoading />
            ) : (
              <motion.div
                className="max-w-xl w-full mx-auto shadow-md rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Header */}
                <div className="relative">
                  <img
                    src={user.img_url ? `http://localhost:3000${user.img_url}` : defaultProfile}
                    alt={`profile`}
                    className="w-32 h-32 rounded-full border-4 border-white mx-auto mt-6"
                  />
                </div>

                {/* Profile Info */}
                <div className="text-center px-6 py-4">
                  <h1 className="text-xl font-semibold text-white">{user.username}</h1>
                  <p className="text-gray-600 text-sm mt-2">{user.bio ?? "Add Bio"}</p>

                  <div className="flex justify-center items-center gap-6 mt-4">
                    <div className="text-center flex items-center gap-x-2">
                      <p className="font-bold text-white">{user.follower_count}</p>
                      <p className="text-gray-500 text-sm">Followers</p>
                    </div>
                    <div className="text-center flex items-center gap-x-2">
                      <p className="font-bold text-white">{user.following_count}</p>
                      <p className="text-gray-500 text-sm">Following</p>
                    </div>
                    <div className="text-center flex items-center gap-x-2">
                      <p className="font-bold text-white">{posts.length}</p>
                      <p className="text-gray-500 text-sm">Posts</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6">
                  {profileOwner ? (

                    <Link to={`/edit/user`}>
                      <motion.button
                        className={`w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit Profile
                      </motion.button>
                    </Link>
                  ) : (
                    <div className="flex gap-x-5 mt-2">
                      <button
                        className={`w-full py-2 px-4 ${isFollowing ? "bg-gray-200 hover:bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"} text-gray-800 font-bold rounded-md shadow-md focus:outline-none`}
                        onClick={isFollowing ? handleUnfollowuser : handleFollowUser}
                      >
                        {followLoader ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
                        {/* {isFollowing ? "Unfollow" : "Follow"} */}
                      </button>
                      <button
                        className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-bold rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
                      >
                        <Link className="py-2.5 px-16" to={`/chat/${user.id}`}>Message</Link>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            {/* Posts Section */}
            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 px-2">
              {posts.map((post) => (
                <Link to={`/post-detail/${post.id}`}>
                  <motion.div
                    key={post.id}
                    className="bg-gray-900 shadow-md cursor-pointer rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={`http://localhost:3000${post.img_url}`}
                      alt={post.caption}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm line-clamp-1 text-gray-500 font-semibold">{post.content}</p>
                      <div className="flex justify-between text-gray-400 text-xs mt-2">
                        <span>❤️ {post.like_count} Likes</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
          <Recomendation />
        </section>
      )}
    </>
  );
}
