import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPostForm from "./pages/AddPostForm";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";

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
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
