import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import Recomendation from "../components/Recomendation";
import defaultProfile from "../assets/images/defaultProfile.png";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../lib/axios";

function ProfileEdit() {
  const profileRef = useRef();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  const handleImageData = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        profileRef.current.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
    setUserProfile({ ...userProfile, img_url: file });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img_url", userProfile.img_url);
      formData.append("username", userProfile.username);
      formData.append("bio", userProfile.bio);

      const response = await axios.patch(
        `/profile/edit`,
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

      navigate(`/profile/${Cookies.get("id")}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.get(`/profile/user`, { withCredentials: true });
        setUserProfile(response.data);
        profileRef.current.src = `http://localhost:3000${response.data.img_url}` ?? defaultProfile;
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    handleGetUserData();
  }, []);

  return (
    <>
      {!Cookies.get("token") ? (
        <Navigate to="/" />
      ) : (
        <section className="min-h-screen flex items-center bg-background md:pl-72">
          <Navbar />
          <div className="h-screen text-white overflow-scroll p-5 w-full">
            <h1 className="text-white text-xl mx-auto max-w-lg lg:text-2xl font-roboto tracking-wide mb-5">Edit Your Profile</h1>
            <form
              onSubmit={handleUpdateProfile}
              className="pb-20 lg:pb-0 max-w-lg mt-10 mx-auto w-full"
            >
              <div className="flex items-center mb-7 w-full gap-x-10">
                <img
                  className="h-28 w-28 rounded-full object-cover"
                  ref={profileRef}
                  alt="profile"
                />
                <input
                  className="hidden"
                  onChange={handleImageData}
                  id="profile_img"
                  type="file"
                />
                <label
                  className="bg-gradient-to-r from-teal-400 to-secondaryDark rounded-md hover:from-primary hover:to-secondary py-3 px-5 cursor-pointer"
                  htmlFor="profile_img"
                >
                  Upload Image
                </label>
              </div>
              <Input
                value={userProfile.username}
                onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}
                label="Username"
                placeholder="New Username"
                id="u-username"
              />
              <Input
                value={userProfile.bio}
                onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                label="Bio"
                placeholder="New Bio"
                id="u-bio"
              />
              <Button>Update</Button>
            </form>
          </div>
          <Recomendation />
        </section>
      )}
    </>
  );
}

export default ProfileEdit;