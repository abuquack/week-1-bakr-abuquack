import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { getMe, logout } from "../../services/auth";

interface UserType {
  id: string;
  name: string;
  email: string;
}

export const Header = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getMe();
      if (error) setUser(null);
      else setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/auth/login");
  };

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="flex p-4 justify-between items-center">
      <h1 className="font-extrabold text-2xl text-primary">LOGO</h1>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-xl">
              welcome, <span className="text-primary">{user?.name}</span>
            </span>
            <Button onClick={handleLogout}>Logout</Button>
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
