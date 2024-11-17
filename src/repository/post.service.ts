import { db } from "@/firebaseConfig";
import { Post } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME)); // Adjust query based on requirements
    const querySnapshot = await getDocs(q);
    const tempArr: DocumentResponse[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Post;
        const responseObj: DocumentResponse = {
          id: doc.id,
          ...data, // Ensure data matches DocumentResponse structure
        };
        tempArr.push(responseObj);
      });
      return tempArr;
    } else {
      console.log("No documents found.");
      return []; // Return an empty array instead of undefined
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array in case of an error
  }
};


export const getPostByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return getDoc(docRef);
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};
