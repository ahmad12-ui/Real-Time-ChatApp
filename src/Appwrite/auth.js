import { Client, Account, ID } from "appwrite";
import Conf from "../CONF/Conf";
import dataService from "./database";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(Conf.AppWriteUrl)
      .setProject(Conf.AppWriteProjectId);

    this.account = new Account(this.client);
  }

  createUserAccount = async ({ name, email, password }) => {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("User created:", user);

      const userdocs = await dataService.createUserDocument({
        userId: user.$id,
        name,
        email,
        avatar: null,
        status: "online",
        lastSeen: new Date(),
      });

      if (!userdocs) console.log("Failed to create user document!");
      else console.log("User document created:", userdocs);

      await this.createSession({ email, password });

      return user;
    } catch (error) {
      console.log("signup error:", error);
      return null;
    }
  };

  createSession = async ({ email, password }) => {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("login error:", error);
      return null;
    }
  };

  getCurrentUser = async () => {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser error:", error);
      return null;
    }
  };

  logOut = async () => {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("logout error:", error);
      return null;
    }
  };
}

const authService = new AuthService();
export default authService;
