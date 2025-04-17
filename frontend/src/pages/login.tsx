import { useState } from "react";
import { Button } from "../components/ui/button";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { LoginDataType } from "../types/authTypes";
import { useAuth } from "../context/authContext";

export const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState<LoginDataType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      await fetchUser();
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setError((error as string) || "Login failed");
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-10 mb-5">
        <div className="grid w-full  items-center gap-1.5">
          <label htmlFor="email" className="text-white font-medium">
            Email
          </label>
          <input
            id="email"
            className={`border border-white px-2 py-2 rounded text-black outline-none`}
            type="email"
            placeholder="enter your email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label htmlFor="password" className="text-white font-medium">
            Password
          </label>
          <input
            id="password"
            className={`border border-white px-2 py-2 rounded text-black outline-none`}
            type="text"
            placeholder="enter your password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="outline"
        className="w-full mt-4"
        onClick={handleLogin}
      >
        Login
      </Button>
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </>
  );
};