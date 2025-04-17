import { createBrowserRouter } from "react-router-dom";
import { Home, Login, NotFoundPage, Register } from "../pages";
import { AuthLayouts } from "../layouts/authLayouts";
import { MainLayouts } from "../layouts/mainLayouts";

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
    children: [
      {
        path: "login",
        element: (
          <AuthLayouts titleCard="Login User">
            <Login />
          </AuthLayouts>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayouts titleCard="Create an account">
            <Register />
          </AuthLayouts>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
