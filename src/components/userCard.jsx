import React from "react";

function UserCard({ user, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 cursor-pointer 
        rounded-lg transition-all
        ${isActive ? "bg-[#2a2a2a]" : "hover:bg-[#1f1f1f]"}
      `}
      style={{
        borderLeft: isActive ? "4px solid #8B0000" : "4px solid transparent",
      }}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-sm">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Text area */}
      <div className="flex flex-col">
        <span className="text-white font-medium">{user.name}</span>

        {/* Optional last message */}
        {user.lastMessage && (
          <span className="text-gray-400 text-sm truncate w-40">
            {user.lastMessage}
          </span>
        )}
      </div>

      {/* Online dot */}
      <div
        className={`ml-auto w-3 h-3 rounded-full 
        ${user.online ? "bg-green-500" : "bg-gray-500"}`}
      ></div>
    </div>
  );
}

export default UserCard;
