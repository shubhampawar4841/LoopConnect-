export interface UserSignIn {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface UserLogIn {
    email: string;
    password: string;
  }
  
  export interface NavItem {
    name: string;
    link: string;
    icon: (props?: React.SVGProps<SVGSVGElement>) => JSX.Element;
  }
  
  export interface FileEntry {
    files: OutputFileEntry[];
  }
  
  export interface Post {
    caption: string;
    photos: PhotoMeta[];
    likes: number;
    userLikes: string[];
    userId?: string;
    userName?: string;
    photoURL?: string;
    date: Date;
  }
  
  export interface PhotoMeta {
    cdnUrl: string | null;
    uuid: string | null;
  }
  
  export interface DocumentResponse {
    id?: string;
    caption?: string;
    photos?: PhotoMeta[];
    likes?: number;
    userLikes: string[];
    userId?: string;
    userName?: string;
    photoURL?: string;
    date?: Date;
  }
  
  export interface LikesInfo {
    likes?: number;
    isLike?: boolean;
  }
  
  export interface ProfileInfo {
    user?: User;
    displayName?: string;
    photoURL?: string;
  }
  
  export interface UserProfile {
    userId?: string;
    displayName?: string;
    photoURL?: string;
    userBio?: string;
  }
  
  export interface UserProfileResponse {
    id?: string;
    userId?: string;
    displayName?: string;
    photoURL?: string;
    userBio?: string;
  }
  