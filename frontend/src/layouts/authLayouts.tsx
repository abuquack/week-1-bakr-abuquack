import { Outlet, useLocation } from "react-router-dom";

export const AuthLayouts = () => {
  const { pathname } = useLocation();
  const titleMap: Record<string, string> = {
    "/auth/login": "Login User",
    "/auth/signup": "Create an account",
  };

  const titleCard = titleMap[pathname] ?? "Authentication";

  return (
    <div className="container min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-2xl p-6 bg-primary rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-white">{titleCard}</h1>
        <Outlet />
      </div>
    </div>
  );
};
