import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import authService from "../Appwrite/auth";
import { Input, Button } from "../components/index";
import { login as authlogin } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const SignupHandler = async (data) => {
    setError("");

    try {
      const newUser = await authService.createUserAccount(data);
      if (newUser) {
        const userdata = await authService.getCurrentUser();
        if (userdata) dispatch(authlogin({ userData: userdata }));
        navigate("/chatlayout");
      }
    } catch (error) {
      console.log("signup component error: ", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Signup to your account</h2>
      <p>
        Already have an account? <Link to={"/login"}>Sign In</Link>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit(SignupHandler)}>
        <Input
          type="email"
          placeholder="Enter your email"
          label="Email:"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (value) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                "Email must be in valid format",
            },
          })}
        />

        <Input
          type="text"
          placeholder="Enter your name"
          label="Name"
          {...register("name", { required: "Name is required" })}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          label="Password"
          {...register("password", { required: "Password is required" })}
        />

        <Button type="submit" className="" children={"signup"} />
      </form>
    </div>
  );
}

export default Signup;
