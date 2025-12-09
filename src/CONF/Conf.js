const Conf = {
  AppWriteUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
  AppWriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  AppWriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,

  AppWriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  AppWriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  AppWriteChatCollectionId: import.meta.env.VITE_APPWRITE_CHAT_COLLECTION_ID,
};
export default Conf;
