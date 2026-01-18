// import React from "react";

// function UserCard({ user, isActive, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center gap-3 p-3 cursor-pointer
//         rounded-lg transition-all
//         ${isActive ? "bg-[#2a2a2a]" : "hover:bg-[#1f1f1f]"}
//       `}
//       style={{
//         borderLeft: isActive ? "4px solid #8B0000" : "4px solid transparent",
//       }}
//     >
//       {/* Avatar */}
//       <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
//         {user?.avatar ? (
//           <img
//             src={user.avatar}
//             alt={user.name || "User"}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <span className="text-white text-sm">
//             {user.name?.charAt(0).toUpperCase()}
//           </span>
//         )}
//       </div>

//       {/* Text area */}
//       <div className="flex flex-col">
//         <span className="text-white font-medium">{user.name}</span>

//         {/* Optional last message */}
//         {user.lastMessage && (
//           <span className="text-gray-400 text-sm truncate w-40">
//             {user.lastMessage}
//           </span>
//         )}
//       </div>

//       {/* Online dot */}
//       <div
//         className={`ml-auto w-3 h-3 rounded-full
//         ${user.online ? "bg-green-500" : "bg-gray-500"}`}
//       ></div>
//     </div>
//   );
// }

// export default UserCard;
import React from "react";

function UserCard({ user, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 p-4 mx-2 rounded-xl cursor-pointer transition-all duration-200
        ${
          isActive
            ? "bg-gray-900/80 border-l-4 border-[#8B0000] shadow-md"
            : "hover:bg-gray-900/60"
        }
      `}
    >
      {/* Avatar */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium">
            {user.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}

        {/* Online status dot */}
        {user.online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-950"></span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white truncate">
          {user.name || "Unknown"}
        </div>
        {user.lastMessage && (
          <div className="text-sm text-gray-400 truncate mt-0.5">
            {user.lastMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
