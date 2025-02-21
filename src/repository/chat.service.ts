import { db } from "@/utils/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, where, doc, getDoc } from "firebase/firestore";
import { collection, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const sendMessage = async (senderId, receiverId, text) => {
    if (!senderId || !receiverId || !text) {
      console.error("Invalid message data:", { senderId, receiverId, text });
      return;
    }
  
    const chatId = [senderId, receiverId].sort().join("_");
  
    try {
      const chatRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatRef);
      if (!chatDoc.exists()) {
        await setDoc(chatRef, { members: [senderId, receiverId] });
      }
  
      await addDoc(collection(chatRef, "messages"), {
        senderId,
        receiverId,
        text,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };
  

export const getMessages = (senderId, receiverId, setMessages) => {
  const chatId = [senderId, receiverId].sort().join("_");
  const messagesQuery = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
  
  return onSnapshot(messagesQuery, (snapshot) => {
    setMessages(snapshot.docs.map((doc) => doc.data()));
  });
};

