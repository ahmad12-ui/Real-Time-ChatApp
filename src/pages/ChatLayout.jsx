import React from "react";
import UserList from "../components/userList/Userlist";
import ChatScreen from "../components/chatScreen/ChatScreen";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function ChatLayout() {
  return (
    <>
      <Header />
      <div className="flex h-screen bg-black">
        {/* Left Sidebar / Menu */}
        <div className="w-16 bg-gray-900 flex flex-col items-center py-4 border-r border-gray-800">
          {/* Menu Icons / buttons */}
          <div className="mb-4 cursor-pointer hover:text-red-700 text-gray-400">
            🏚️
          </div>
          <div className="mb-4 cursor-pointer hover:text-red-700 text-gray-400">
            🔯
          </div>
          <div className="mb-4 cursor-pointer hover:text-red-700 text-gray-400">
            🛎️
          </div>
        </div>

        {/* Users List Panel */}
        <div className="w-80 border-r border-gray-800 overflow-y-auto">
          <UserList />
        </div>

        {/* Chat Screen Panel */}
        <div className="flex-1">
          <ChatScreen />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChatLayout;
