import { OutputFileEntry } from '@uploadcare/blocks'
import { User } from 'firebase/auth'

interface UserSignIn {
  email: string
  password: string
  confirmPassword: string
}
interface UserLogIn {
  email: string
  password: string
}
interface NavItem {
  name: string
  link: string
  icon: (props?: React.SVGProps<SVGSVGElement>) => JSX.Element
}

interface FileEntry {
  files: OutputFileEntry[]
}

interface Post {
  caption: string
  photos: PhotoMeta[]
  likes: number
  userLikes: string[]
  userId?: string
  userName?: string
  photoURL?: string
  date: Date
}

interface PhotoMeta {
  cdnUrl: string | null
  uuid: string | null
}

interface DocumentResponse {
  id?: string
  caption?: string
  photos?: PhotoMeta[]
  likes?: number
  userLikes: string[]
  userId?: string
  userName?: string
  photoURL?: string
  date?: Date
}

interface LikesInfo {
  likes?: number
  isLike?: boolean
}

interface ProfileInfo {
  user?: User
  displayName?: string
  photoURL?: string
}

interface UserProfile {
  userId?: string
  displayName?: string
  photoURL?: string
  userBio?: string
}

interface UserProfileResponse {
  id?: string
  userId?: string
  displayName?: string
  photoURL?: string
  userBio?: string
}