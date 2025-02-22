
import { User } from 'firebase/auth'
import { createContext } from 'react'

export type AuthContextData = {
  user: User | null
}

export const userAuthContext = createContext<AuthContextData>({
  user: null
})
