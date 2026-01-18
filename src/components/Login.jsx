import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center px-4">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/20 via-black to-maroon-900/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card Container */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-maroon-900/50 p-10">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-[#8B0000] drop-shadow-2xl mb-2">
              ChatApp
            </h1>
            <h2 className="text-2xl font-bold text-white">
              Sign in to your account
            </h2>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-400 mb-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#8B0000] font-semibold hover:text-maroon-600 transition-colors duration-300"
            >
              Signup
            </Link>
          </p>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center bg-red-900/30 border border-red-800/50 rounded-lg py-3 mb-6">
              {error}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email"
              className="bg-gray-800/50 border-gray-700 focus:border-[#8B0000] text-white placeholder-gray-500"
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
              className="bg-gray-800/50 border-gray-700 focus:border-[#8B0000] text-white placeholder-gray-500"
              {...register("password", { required: "Password is required" })}
            />

            <Button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-maroon-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-[#8B0000]/60"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
