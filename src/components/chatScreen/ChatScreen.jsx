import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import msgDataService from "../../Appwrite/msgDatabase";

function ChatScreen() {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const currentUser = useSelector((state) => state.auth.userData);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const scrollRef = useRef();

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

    return () => unsubscribe && unsubscribe();
  }, [selectedUser?.$id, currentUser?.$id]);

  const loadMessages = async () => {
    const response = await msgDataService.listMessage({
      user1: currentUser.$id,
      user2: selectedUser.$id,
    });

    if (response?.documents) {
      setMessages(response.documents);
    }
  };

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
      <div className="h-full flex items-center justify-center text-gray-500 text-lg">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-gray-900 bg-gray-950 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-medium">
          {selectedUser.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <h2 className="font-semibold text-lg">{selectedUser.name}</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.$id;
          return (
            <div
              key={msg.$id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[70%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                  ${
                    isMine
                      ? "bg-[#8B0000] text-white rounded-br-none"
                      : "bg-gray-900 text-gray-100 rounded-bl-none"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-900 bg-gray-950">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            className="flex-1 px-6 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:border-[#8B0000] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-all"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendHandler()}
          />
          <button
            onClick={sendHandler}
            className="px-8 py-4 bg-[#8B0000] hover:bg-maroon-700 text-white font-medium rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-[#8B0000]/30 active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
