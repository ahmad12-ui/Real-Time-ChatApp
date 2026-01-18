import authService from "../Appwrite/auth";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";

function CheckLogin() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("login");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        setMsg("already have session");
      }
    };

    fetchUser();
  }, []);

  const CheckSession = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        navigate("/chatlayout");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error checking session:", err);
    }
  };
  return <Button children={msg} type={"button"} onClick={CheckSession} />;
}

export default CheckLogin;
