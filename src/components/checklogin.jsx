import authService from "../Appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // v6
import Button from "./Button";
import { login } from "../store/authSlice";

function CheckLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CheckSession = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        // dispatch(login(user));
        navigate("/chatlayout"); // redirect to chatlayout
      } else {
        console.log("No active session");
      }
    } catch (err) {
      console.error("Error checking session:", err);
    }
  };

  return (
    <Button
      children={"already have session"}
      type={"button"}
      onClick={CheckSession}
    />
  );
}

export default CheckLogin;
