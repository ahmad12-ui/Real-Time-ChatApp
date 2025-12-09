import { Client, Databases, Query, ID } from "appwrite";
import Conf from "../CONF/Conf";

export class MsgDatabase {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(Conf.AppWriteUrl)
      .setProject(Conf.AppWriteProjectId);

    this.database = new Databases(this.client);
  }

  // Send message
  sendMessage = async ({ senderId, receiverId, text, imageUrl }) => {
    try {
      return await this.database.createDocument(
        Conf.AppWriteDatabaseId,
        Conf.AppWriteChatCollectionId,
        ID.unique(),
        {
          senderId,
          receiverId,
          text,
          imageUrl,
          timestamp: new Date(), // correct field
          seen: false,
        }
      );
    } catch (error) {
      console.log("sendMessage error:", error);
      return null;
    }
  };

  // Get chat between two users
  listMessage = async ({ user1, user2 }) => {
    try {
      return await this.database.listDocuments(
        Conf.AppWriteDatabaseId,
        Conf.AppWriteChatCollectionId,
        [
          Query.or(
            Query.and(
              Query.equal("senderId", user1),
              Query.equal("receiverId", user2)
            ),
            Query.and(
              Query.equal("senderId", user2),
              Query.equal("receiverId", user1)
            )
          ),
          Query.orderAsc("timestamp"),
        ]
      );
    } catch (error) {
      console.log("listMessage error:", error);
      return null;
    }
  };

  // Mark message as seen
  updateMsg = async ({ msgId }) => {
    try {
      return await this.database.updateDocument(
        Conf.AppWriteDatabaseId,
        Conf.AppWriteChatCollectionId,
        msgId,
        { seen: true }
      );
    } catch (error) {
      console.log("updateMsg error:", error);
      return null;
    }
  };

  // Real-time subscribe to new messages
  subscribeMessages = (callback) => {
    try {
      const unsubscribe = this.client.subscribe(
        `databases.${Conf.AppWriteDatabaseId}.collections.${Conf.AppWriteChatCollectionId}.documents`,
        (event) => {
          if (
            event.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            callback(event.payload); // new message
          }
        }
      );

      return unsubscribe;
    } catch (error) {
      console.log("subscribeMessages error:", error);
      return null;
    }
  };
}

const msgDataService = new MsgDatabase();
export default msgDataService;
