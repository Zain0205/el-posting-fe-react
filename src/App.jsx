import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPostForm from "./pages/AddPostForm";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ChatPage from "./pages/ChatPage";
import ForgotPassword from "./pages/ForgotPassword";
import PostDetail from "./pages/PostDetail";
import ResetPassword from "./pages/ResetPassword";
import ProfileLoading from "./components/ProfileLoading";
import EditPostPage from "./pages/EditPostPage";
import VerifyEmail from "./pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/add-post",
    element: <AddPostForm />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/edit/user",
    element: <ProfileEdit />,
  },
  {
    path: "/chat/:receiverId",
    element: <ChatPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/post-detail/:postId",
    element: <PostDetail />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/post-edit/:postId",
    element: <EditPostPage />
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
