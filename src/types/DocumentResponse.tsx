// types/documentResponse.d.ts

export interface PhotoMeta {
    cdnUrl: string;
  }
  
  export interface DocumentResponse {
    likes: number;
    userlikes: string[];
    photos: PhotoMeta[];
    // Add any other properties that you expect to have in DocumentResponse
  }
  