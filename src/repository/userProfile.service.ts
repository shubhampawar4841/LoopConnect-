import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where
  } from 'firebase/firestore'
  
  //Utils
  import { db } from '@/utils/firebase'
  
  //Types
  import type { UserProfile, UserProfileResponse } from '@/types/index'
  
  const COLLECTION_NAME = 'users'
  
  export const createUserProfile = (user: UserProfile) => {
    try {
      return addDoc(collection(db, COLLECTION_NAME), user)
    } catch (err) {
      console.log(err)
    }
  }
  
  export const updateUserProfile = async (id: string, user: UserProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {
      ...user
    })
  }
  
  export const getUserProfile = async (userId: string) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('userId', '==', userId)
      )
      const querySnapshot = await getDocs(q)
      let tempData: UserProfileResponse = {}
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data() as UserProfile
          tempData = {
            id: doc.id,
            ...userData
          }
        })
        return tempData
      } else {
        console.log('No such document')
        return null
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getAllUsers = async (userId: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
      const tempArr: UserProfileResponse[] = []
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data() as UserProfile
          const responeObj: UserProfileResponse = {
            id: doc.id,
            ...userData
          }
          tempArr.push(responeObj)
        })
        return tempArr.filter((item) => item.userId != userId)
      } else {
        console.log('No such documents')
      }
    } catch (error) {
      console.log(error)
    }
  }