/*************  ✨ Codeium Command 🌟  *************/
import { db } from '@/utils/firebase'
import { collection, doc, getDocs, setDoc, updateDoc, arrayUnion, query, orderBy } from 'firebase/firestore'

interface Message {
  senderId: string
  text: string
  timestamp: number
}

/**
 * Fetch all users except the logged-in user
 */
export const getUsers = async () => {
  const usersRef = collection(db, 'users')
  const snapshot = await getDocs(usersRef)
  const users = snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data()
  }))

  return users
}

/**
 * Send a message between two users
 */
export const sendMessage = async (senderId: string, receiverId: string, message: Message) => {
  const chatId = [senderId, receiverId].sort().join('_') // Unique chat ID

  const chatRef = doc(db, 'chats', chatId)
  await setDoc(chatRef, { messages: [] }, { merge: true }) // Ensure chat document exists
  await updateDoc(chatRef, {
    messages: arrayUnion(message) // Append new message
  })
}

/**
 * Retrieve messages between two users
 */
export const getMessages = async (userId: string, otherUserId: string) => {
  const chatId = [userId, otherUserId].sort().join('_')
  const chatRef = doc(db, 'chats', chatId)
  const snapshot = await getDocs(query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc')))

  return snapshot.docs.map((doc) => doc.data() as Message)
}
