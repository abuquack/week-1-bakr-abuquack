import { useState } from "react";
import { Button } from "../components/ui/button";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "abuquack@gmail.com",
    password: "123456",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    try {
      const data = await login(email, password);
      setFormData(data.user);
      localStorage.setItem("token", data?.token);
      navigate("/");
    } catch (error) {
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
            type="password"
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
    </>
  );
};
