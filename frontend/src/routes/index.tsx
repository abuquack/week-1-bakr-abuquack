import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import { AuthLayouts } from "../layouts/authLayouts";
import { MainLayouts } from "../layouts/mainLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/auth",
    element: <AuthLayouts />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
