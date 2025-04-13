import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="flex p-4 justify-between items-center">
      <h1 className="font-extrabold text-2xl text-primary">LOGO</h1>
      <div className="flex gap-2">
        <Link to="auth/login" className="">
          <Button>Login</Button>
        </Link>
        <Link to="auth/register">
          <Button variant="secondary">Register</Button>
        </Link>
      </div>
    </div>
  );
};
