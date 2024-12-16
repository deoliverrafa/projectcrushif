export interface User {
  _id: string;
  nickname: string;
  password: string;
  gender: string
  userName: string;
  email: string;
  campus: string;
  avatar: string;
  birthdaydata: string;
  Nfollowing: number;
  Nfollowers: number;
  following: string[];
  followers: string[];
  curso: string;
  type: string;
  bio: string;
  isFollowing: boolean;
  banner: string;
  status: string;
  likedUsers: string[];
  likedBy: string[];
  to: string,
  instagram: string,
  facebook:string,
  twitter:string,
}