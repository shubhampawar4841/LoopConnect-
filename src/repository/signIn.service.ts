import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    UserCredential
  } from 'firebase/auth'
  
  //Utils
  import { auth } from '@/utils/firebase'
  
  //Types
  import { ProfileInfo } from '@/types'
  
  export const firebaseAuthRequests = {
    logIn: (email: string, password: string): Promise<UserCredential> => {
      return signInWithEmailAndPassword(auth, email, password)
    },
  
    logOut: (): Promise<void> => {
      return signOut(auth)
    },
  
    signUp: (email: string, password: string): Promise<UserCredential> => {
      return createUserWithEmailAndPassword(auth, email, password)
    },
  
    googleSignIn: (): Promise<UserCredential> => {
      const googleAuthProvider = new GoogleAuthProvider()
      return signInWithPopup(auth, googleAuthProvider)
    },
    githubSignIn: (): Promise<UserCredential> => {
      const githubAuthProvider = new GithubAuthProvider()
      return signInWithPopup(auth, githubAuthProvider)
    },
  
    updateProfileInfo: (profileInfo: ProfileInfo): Promise<void> => {
      return updateProfile(profileInfo.user!, {
        displayName: profileInfo.displayName,
        photoURL: profileInfo.photoURL
      })
    }
  }