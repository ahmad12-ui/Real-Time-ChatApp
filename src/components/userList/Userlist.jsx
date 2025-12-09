import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataBase from "../../Appwrite/database";
import { activeUserlist } from "../../store/usersSlice";
import { setSelectedUser } from "../../store/chatSlice";
import { UserCard } from "../index";

function Userlist() {
  const dispatch = useDispatch();
  const { status, userList } = useSelector((state) => state.users);
  const { selectedUser } = useSelector((state) => state.chat);
  const selectedUserId = selectedUser?.userId;

  useEffect(() => {
    listHandler();
  }, []);

  const listHandler = async () => {
    try {
      const response = await DataBase.listDocuments();
      console.log("list document response", response);

      dispatch(activeUserlist({ userList: response }));
    } catch (error) {
      console.log("listHandler error:", error);
    }
  };

  const openChat = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div className="userlist-container">
      {status && userList && userList.length > 0 ? (
        userList.map((user) => (
          <div key={user.userId} className="user-card">
            <UserCard
              user={user}
              isActive={selectedUserId === user.userId}
              onClick={() => openChat(user)}
            />
          </div>
        ))
      ) : (
        <p className="text-red-500">No active users</p>
      )}
    </div>
  );
}

export default Userlist;
