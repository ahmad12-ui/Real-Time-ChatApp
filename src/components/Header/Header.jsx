import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/authSlice";
import authService from "../../Appwrite/auth";
import { FiUser, FiLogIn } from "react-icons/fi";

function Header() {
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response) {
        dispatch(login(response));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8B0000]/20 flex items-center justify-center text-[#8B0000] font-bold text-xl border border-[#8B0000]/40">
            C
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-white">Chat</span>
            <span className="text-[#8B0000]">App</span>
          </h1>
        </div>

        {/* User Greeting / Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gray-900/60 px-5 py-1 rounded-full border border-gray-800">
            {status && userData ? (
              <>
                <FiUser className="text-[#8B0000] text-xl" />
                <span className="font-medium text-gray-200">
                  Welcome,{" "}
                  <span className="text-[#8B0000]">
                    {userData.name || "User"}
                  </span>
                </span>
              </>
            ) : (
              <>
                <FiLogIn className="text-gray-400 text-xl" />
                <span className="text-gray-400 font-medium">Guest</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
