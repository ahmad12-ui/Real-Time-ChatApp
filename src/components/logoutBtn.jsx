import React from "react";
import authService from "../Appwrite/auth";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Switch icon (arrowed logout)

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.auth.userData);

  const handleLogOut = () => {
    if (isUser) {
      authService.logOut().then(() => {
        dispatch(logout());
        navigate("/");
      });
    }
  };

  return (
    <button
      onClick={handleLogOut}
      className="group flex items-center gap-2 px-3 py-3 bg-[#8B0000] hover:bg-maroon-700 text-white font-semibold rounded-full shadow-lg border border-maroon-800 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8B0000]/60 focus:outline-none focus:ring-4 focus:ring-[#8B0000]/50"
    >
      <FiLogOut className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

export default LogoutBtn;
