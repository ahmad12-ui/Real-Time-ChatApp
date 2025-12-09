import { Client, Storage, ID } from "appwrite";
import Conf from "../CONF/Conf";

export class Bucket {
  client = new Client();
  bucket;
  constructor() {
    this.client
      .setEndpoint(Conf.AppWriteUrl)
      .setProject(Conf.AppWriteProjectId);
    this.bucket = new Storage(this.bucket);
  }
  async uploadImage() {
    try {
      const result = await this.bucket.createFile(
        Conf.AppWriteBucketId,
        ID.unique(),
        file
      );
      return result;
    } catch (error) {
      console.log("referrence error :: UploadImage :: error", error);
    }
  }
  async getUrl(fileId) {
    try {
      return `${
        Conf.AppWriteUrl
      }/storage/buckets/${Conf.AppWriteBucketId()}/files/${fileId}/view?project=${
        Conf.AppWriteProjectId
      }`;
    } catch (error) {
      console.log("referrence error :: geturl :: error", error);
    }
  }

  async deletefile(fileId) {
    await this.bucket.deleteFile(Conf.AppWriteBucketId(), fileId);
  }
}

const bucketService = new Bucket();
export default bucketService;
