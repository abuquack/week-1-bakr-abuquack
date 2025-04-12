import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="bg-primary text-white flex p-4 justify-between items-center">
      <h1 className="font-semibold text-2xl">LOGO</h1>
      <div className="flex gap-2">
        <Link to="auth/login" className="">
          <Button size="sm">Login</Button>
        </Link>
        <Link to="auth/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    </div>
  );
};
