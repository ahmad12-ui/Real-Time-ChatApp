import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Set active user list
    activeUserlist: (state, action) => {
      state.status = true;
      state.userList = action.payload.userList; // or action.payload if you send array directly
    },

    // Clear user list
    inActiveUserList: (state) => {
      state.status = false;
      state.userList = [];
    },
  },
});

export const { activeUserlist, inActiveUserList } = usersSlice.actions;
export default usersSlice.reducer;
