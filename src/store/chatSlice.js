import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null, // The user you are currently chatting with
  messages: {}, // Messages stored as { [userId]: [msg1, msg2, ...] }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Set the currently selected chat user
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      // Optionally clear messages for this user
      // state.messages[action.payload?.id] = [];
    },

    // Set all messages for a specific chat
    setMessages: (state, action) => {
      const { userId, messages } = action.payload;
      state.messages[userId] = messages;
    },

    // Add a single message to a chat (real-time updates)
    addMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.messages[userId]) state.messages[userId] = [];
      state.messages[userId].push(message);
    },

    // Update a single message (like marking as seen)
    updateMessage: (state, action) => {
      const { userId, messageId, updatedFields } = action.payload;
      if (state.messages[userId]) {
        state.messages[userId] = state.messages[userId].map((msg) =>
          msg.$id === messageId ? { ...msg, ...updatedFields } : msg
        );
      }
    },

    // Clear chat messages for a user (optional)
    clearMessages: (state, action) => {
      const { userId } = action.payload;
      delete state.messages[userId];
    },
  },
});

export const {
  setSelectedUser,
  setMessages,
  addMessage,
  updateMessage,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
