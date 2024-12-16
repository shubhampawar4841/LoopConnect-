import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

//Types
import type { DocumentResponse, Post, ProfileInfo } from '@/types'

//Utils
import { db } from '@/utils/firebase'

const COLLECTION_NAME = 'posts'

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post)
}

export const getPosts = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'))
  try {
    const querySnapshot = await getDocs(q)

    const tempArr: DocumentResponse[] = []
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Post
        const responseObj: DocumentResponse = {
          id: doc.id,
          ...data
        }

        tempArr.push(responseObj)
      })
      return tempArr
    } else {
      console.log('No such document')
    }
  } catch (error) {
    console.log(error)
  }
}

export const getPostByUserId = async (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where('userId', '==', id))
  try {
    const querySnapshot = await getDocs(q)

    const tempArr: DocumentResponse[] = []
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Post
        const responseObj: DocumentResponse = {
          id: doc.id,
          ...data
        }

        tempArr.push(responseObj)
      })
      return tempArr
    } else {
      console.log('No such document')
    }
  } catch (error) {
    console.log(error)
  }
}

export const getPost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return getDoc(docRef)
}

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id))
}

export const updateLikesOnPost = (
  id: string,
  userLikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id)
  return updateDoc(docRef, {
    likes: likes,
    userLikes: userLikes
  })
}
// post.service.ts
export const addCommentToPost = async (postId: string, comment: string) => {
  const docRef = doc(db, COLLECTION_NAME, postId);
  const postDoc = await getDoc(docRef);
  if (postDoc.exists()) {
    const updatedComments = [...(postDoc.data().comments || []), comment];
    return updateDoc(docRef, { comments: updatedComments });
  }
  throw new Error('Post not found');
};


export const updateUserInfoOnPosts = async (profileInfo: ProfileInfo) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', profileInfo.user?.uid)
  )
  const querySnapshot = await getDocs(q)
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((document) => {
      const docRef = doc(db, COLLECTION_NAME, document.id)
      updateDoc(docRef, {
        userName: profileInfo.displayName,
        photoURL: profileInfo.photoURL
      })
    })
  } else {
    console.log('The user doesn;t have anu post')
  }
}