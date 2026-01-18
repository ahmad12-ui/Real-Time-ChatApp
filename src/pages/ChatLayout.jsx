// import React from "react";
import UserList from "../components/userList/Userlist";
import ChatScreen from "../components/chatScreen/ChatScreen";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LogoutBtn from "../components/logoutBtn";
import { FiMenu, FiUsers, FiMessageSquare } from "react-icons/fi";

function ChatLayout() {
  return (
    <div className="flex flex-col h-screen bg-black text-gray-100 overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Narrow left sidebar - menu */}
        <aside className="w-16 bg-gray-950 border-r border-gray-900 flex flex-col items-center py-6">
          <div className="flex flex-col gap-8 items-center flex-1">
            <button
              className="text-gray-400 hover:text-[#8B0000] transition-colors duration-200 text-2xl"
              title="Home"
            >
              <FiMenu />
            </button>
            <button
              className="text-gray-400 hover:text-[#8B0000] transition-colors duration-200 text-2xl"
              title="Users"
            >
              <FiUsers />
            </button>
            <button
              className="text-gray-400 hover:text-[#8B0000] transition-colors duration-200 text-2xl"
              title="Chats"
            >
              <FiMessageSquare />
            </button>
          </div>

          {/* Logout at bottom */}
          <div className="mt-auto pb-6">
            <LogoutBtn />
          </div>
        </aside>

        {/* Users list */}
        <div className="w-80 border-r border-gray-900 bg-gray-950 overflow-y-auto">
          <UserList />
        </div>

        {/* Main chat area */}
        <div className="flex-1 bg-black overflow-hidden">
          <ChatScreen />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ChatLayout;
