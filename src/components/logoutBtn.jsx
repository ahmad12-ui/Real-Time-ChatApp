import React, { useEffect } from "react";
import authService from "../Appwrite/auth";
import { logout, login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "./Button";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.auth.userData);
  console.log("user is ", isUser);

  const handleLogOut = () => {
    if (isUser) {
      authService.logOut().then(() => {
        dispatch(logout());
        navigate("/");
      });
    }
  };
  // useEffect(() => {
  //   if (!isUser) {
  //     navigate("/");
  //   }
  // });

  return (
    <button className="text_red_800" onClick={handleLogOut}>
      {" "}
      out
    </button>
  );
}

export default LogoutBtn;
