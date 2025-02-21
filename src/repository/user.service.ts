import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getUsers = async () => {
  const usersCollection = await getDocs(collection(db, "users"));
  return usersCollection.docs.map((doc) => doc.data());
};
