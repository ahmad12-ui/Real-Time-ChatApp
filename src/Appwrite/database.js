import { Client, Databases } from "appwrite";
import Conf from "../CONF/Conf";

export class DataBase {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(Conf.AppWriteUrl)
      .setProject(Conf.AppWriteProjectId);

    this.database = new Databases(this.client);
  }

  // Create user document
  createUserDocument = async ({
    userId,
    name,
    email,
    avatar,
    status,
    lastSeen,
  }) => {
    try {
      return await this.database.createDocument(
        Conf.AppWriteDatabaseId,
        Conf.AppWriteCollectionId,
        userId, // use same as auth ID
        {
          userId,
          name,
          email,
          avatar,
          status,
          lastSeen,
        }
      );
    } catch (error) {
      console.log("CreateDocument error:", error);
      return null;
    }
  };

  // List all users
  listDocuments = async () => {
    try {
      const res = await this.database.listDocuments(
        Conf.AppWriteDatabaseId,
        Conf.AppWriteCollectionId
      );
      return res?.documents ?? [];
    } catch (error) {
      console.log("listDocuments error:", error);
      return [];
    }
  };
}

const dataService = new DataBase();
export default dataService;
