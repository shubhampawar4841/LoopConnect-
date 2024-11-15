import { OutputFileEntry } from "@uploadcare/blocks";


export interface UserLogIn {
  email: string;
  password: string;
}
export interface UserSignIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FileEntry {
  files: OutputFileEntry[];
}

export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userlikes: [];
  userId: string | null;
  date: Date;
}

export interface PhotoMeta {
  cdnUrl: string;
  uuid: string;
}

export interface DocumentResponse {
  id: string;
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userlikes: [];
  userId: string | null;
  date: Date;
}

export interface PorfileInfo {
  user ? :User;
  displayName? : string;
  photoURL?:string;
}

export interface userProfile {
  userId?:string;
  displayName?:string;
  photoURL?:string;
  userBio?:string;
}

export interface userProfile {
  id?:string;
  userId?:string;
  displayName?:string;
  photoURL?:string;
  userBio?:string;
}
