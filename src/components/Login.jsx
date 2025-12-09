import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ensure react-router-dom
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth";
import { login } from "../store/authSlice";

function Login() {
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    setError("");
    try {
      const session = await authService.createSession(data);
      if (session) {
        const userdata = await authService.getCurrentUser();
        if (userdata) {
          dispatch(login({ userData: userdata }));
          navigate("/chatlayout");
        }
      }
    } catch (error) {
      console.log("Login error:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-2xl mb-2">Sign in to your account</h2>
      <p className="mb-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-red-700">
          Signup
        </Link>
      </p>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="flex flex-col gap-3 w-80"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (value) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                "Email must be valid",
            },
          })}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          label="Password"
          {...register("password", { required: "Password is required" })}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
