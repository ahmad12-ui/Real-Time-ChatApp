import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import msgDataService from "../../Appwrite/msgDatabase";

function ChatScreen() {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const currentUser = useSelector((state) => state.auth.userData);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const scrollRef = useRef();

  // Load messages & realtime listener
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    loadMessages();

    const unsubscribe = msgDataService.subscribeMessages((newMsg) => {
      const { senderId, receiverId } = newMsg;

      const isMyChat =
        (senderId === selectedUser.$id && receiverId === currentUser.$id) ||
        (receiverId === selectedUser.$id && senderId === currentUser.$id);

      if (isMyChat) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedUser?.$id, currentUser?.$id]);

  // Load chat history
  const loadMessages = async () => {
    const response = await msgDataService.listMessage({
      user1: currentUser.$id,
      user2: selectedUser.$id,
    });

    if (response?.documents) {
      setMessages(response.documents);
    }
  };

  // Send message
  const sendHandler = async () => {
    if (!text.trim()) return;

    await msgDataService.sendMessage({
      text,
      senderId: currentUser.$id,
      receiverId: selectedUser.$id,
    });

    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a user to start chat
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Top Bar */}
      <div className="p-4 border-b border-gray-800 flex items-center">
        <h2 className="text-white text-lg">{selectedUser.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.$id;
          return (
            <div
              key={msg.$id}
              className={`max-w-xs p-3 rounded-xl text-sm ${
                isMine
                  ? "ml-auto bg-[#8B0000] text-white"
                  : "mr-auto bg-gray-800 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 outline-none"
          placeholder="Type message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendHandler()}
        />

        <button
          onClick={sendHandler}
          className="bg-[#8B0000] px-4 py-2 rounded-xl text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;

// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import msgDataService from "../../Appwrite/msgDatabase";

// function ChatScreen() {
//   const selectedUser = useSelector((state) => state.chat.selectedUser);
//   const currentUser = useSelector((state) => state.auth.userData);

//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");

//   const scrollRef = useRef();

//   // Load messages when user selected
//   useEffect(() => {
//     if (!selectedUser || !currentUser) return;

//     loadMessages();
//     const unsub = liveListener();

//     return () => unsub && unsub();
//   }, [selectedUser, currentUser]);

//   // Load chat history
//   const loadMessages = async () => {
//     try {
//       const response = await msgDataService.listMessage({
//         user1: currentUser.$id,
//         user2: selectedUser.$id,
//       });

//       setMessages(response.documents);
//     } catch (error) {
//       console.log("Error loading messages:", error);
//     }
//   };

//   // Live listener (Appwrite Realtime)
//   const liveListener = () => {
//     const unsubscribe = msgDataService.subscribeMessages((newMsg) => {
//       const { senderId, receiverId } = newMsg;

//       const isMyChat =
//         (senderId === selectedUser.$id && receiverId === currentUser.$id) ||
//         (receiverId === selectedUser.$id && senderId === currentUser.$id);

//       if (isMyChat) {
//         setMessages((prev) => [...prev, newMsg]); // LOCAL UPDATE
//       }
//     });

//     return unsubscribe;
//   };

//   // Send message
//   const sendHandler = async () => {
//     if (!text.trim()) return;

//     const msgData = {
//       text,
//       senderId: currentUser.$id,
//       receiverId: selectedUser.$id,
//       seen: false,
//     };

//     try {
//       await msgDataService.sendMessage(msgData);
//       setText(""); // clear input
//     } catch (error) {
//       console.log("Send message error:", error);
//     }
//   };

//   // Auto scroll
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // If no user selected
//   if (!selectedUser) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-400">
//         Select a user to start chat
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col bg-black">
//       {/* Top Bar */}
//       <div className="p-4 border-b border-gray-800 flex items-center">
//         <h2 className="text-white text-lg">{selectedUser.name}</h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg) => {
//           const isMine = msg.senderId === currentUser.$id;

//           return (
//             <div
//               key={msg.$id}
//               className={`max-w-xs p-3 rounded-xl text-sm ${
//                 isMine
//                   ? "ml-auto bg-[#8B0000] text-white"
//                   : "mr-auto bg-gray-800 text-gray-200"
//               }`}
//             >
//               {msg.text}
//             </div>
//           );
//         })}
//         <div ref={scrollRef} />
//       </div>

//       {/* Input Box */}
//       <div className="p-3 border-t border-gray-800 flex gap-2">
//         <input
//           type="text"
//           className="flex-1 px-3 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 outline-none"
//           placeholder="Type message…"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendHandler()}
//         />

//         <button
//           onClick={sendHandler}
//           className="bg-[#8B0000] px-4 py-2 rounded-xl text-white"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatScreen;
