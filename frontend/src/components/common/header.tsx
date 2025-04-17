import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/authContext";

export const Header = () => {
  const { user, loading, logoutService } = useAuth();

  return (
    <div className="flex p-4 justify-between items-center">
      <h1 className="font-extrabold text-2xl text-primary">LOGO</h1>
      <div className="flex gap-4 items-center">
        {loading ? null : user ? (
          <>
            <span>welcome {user?.name}</span>
            <Button onClick={logoutService}>Logout</Button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="auth/login" className="">
              <Button>Login</Button>
            </Link>
            <Link to="auth/signup">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
