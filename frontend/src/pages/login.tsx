import React, { useState } from "react";
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { InputForm } from "../components/common/InputForm";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex flex-col gap-4 mt-10 mb-5">
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <LoginForm setErrorMessage={setErrorMessage} />
      <div className="mt-4 text-center">
        <p className="text-white">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-400 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

const LoginForm = ({
  setErrorMessage,
}: {
  setErrorMessage: React.Dispatch<string>;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await login(formData);
    setLoading(false);
    if (error) setErrorMessage(error);
    else if (data) navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Email"
        id="email"
        type="email"
        placeholder="enter your email"
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <InputForm
        label="Password"
        id="password"
        type="text"
        placeholder="enter your password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Button
        type="submit"
        variant="outline"
        className="w-full mt-4"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
