import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/authSlice";
import authService from "../../Appwrite/auth";

function Header() {
  const dispatch = useDispatch();

  const { status, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    const response = await authService.getCurrentUser();
    if (response) {
      console.log("response", response.name);

      dispatch(login(response));
    } else {
      dispatch(logout());
    }
  };
  return (
    <div>
      <h3>
        Welcome:
        {status && userData ? ` ${userData.name}` : " Guest"}
      </h3>
    </div>
  );
}

export default Header;
