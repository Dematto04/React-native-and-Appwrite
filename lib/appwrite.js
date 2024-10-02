import { Redirect } from "expo-router";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.long.aora",
  projectId: "66f3e951000fde2ca4aa",
  databaseId: "66f3eac700354673a6cc",
  userCollectionId: "66f3eadb0001bc556a21",
  videoCollectionId: "66f3eaf200123ff47577",
  storageId: "66f3ec1b00163eae7fe2",
};
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)
// Register User

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLastestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const searchPost = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if(type === 'video'){
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type === 'image'){
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error("Invalid file type")
    }
    if(!fileUrl) throw new Error();
    
    return fileUrl
  } catch (error) {
    console.log('ohno');
    
    throw new Error(error);
    
  }
}
export const uploadFile = async (file, type) => {
  if(!file) return 
  console.log("FIle: ", file);
  
  const asset = {
    name: file.fileName + "l",
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri
  }
  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )
    console.log("Uploaed FIle: ", uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type)

    return fileUrl
  } catch (error) {
    console.log('hehe123');

    throw new Error(error);
    
  }
}
export const createVideo = async(form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video')
    ])
    console.log(thumbnailUrl, videoUrl);
    

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    )
    return newPost
  } catch (error) {
    console.log('hehe');

    throw new Error(error);
    
    
  }
}