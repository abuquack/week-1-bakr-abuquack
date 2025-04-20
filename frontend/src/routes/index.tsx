import { createBrowserRouter } from "react-router-dom";
import { Home, Login, NotFoundPage, Signup } from "../pages";
import { AuthLayouts } from "../layouts/AuthLayouts";
import { MainLayouts } from "../layouts/MainLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayouts />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
