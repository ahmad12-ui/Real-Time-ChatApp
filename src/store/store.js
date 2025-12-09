import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    users: usersSlice,
  },
});

export default store;
