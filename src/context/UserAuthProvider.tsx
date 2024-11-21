import { onAuthStateChanged, type User } from 'firebase/auth'
import { FC, useEffect, useState } from 'react'

//Utils
import { auth } from '@/utils/firebase'

//Context
import { userAuthContext } from '@/context/UserAuthContext'

interface IUserAuthProviderProps {
  children: React.ReactNode
}

export const UserAuthProvider: FC<IUserAuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserData(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userAuthContext.Provider value={{ user: userData }}>
      {children}
    </userAuthContext.Provider>
  )
}