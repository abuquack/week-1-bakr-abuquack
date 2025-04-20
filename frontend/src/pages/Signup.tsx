import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import { InputForm } from "../components/common/InputForm";

export const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex flex-col gap-4 mt-10 mb-5">
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <SignupForm setErrorMessage={setErrorMessage} />
      <div className="mt-4 text-center">
        <p className="text-white">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const SignupForm = ({
  setErrorMessage,
}: {
  setErrorMessage: React.Dispatch<string>;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await register(formData);

    if (error) setErrorMessage(error);
    else if (data) navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Name"
        id="name"
        type="name"
        placeholder="enter your name"
        required
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
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
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};
