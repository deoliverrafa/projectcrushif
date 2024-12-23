import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../interfaces/userInterface";

// interface User {
//   _id: string;
//   nickname: string;
//   userName: string;
//   email: string;
//   campus: string;
//   avatar: string;
//   banner: string;
//   birthdaydata: string;
//   Nfollowing: number;
//   Nfollowers: number;
//   following: string[];
//   followers: string[];
//   curso: string;
//   type: string;
//   bio: string;
//   password: string;
//   gender: string;
//   isFollowing: boolean;
//   status: string;
// }

export function getUserData() {
  const [userData, setUserData] = useState<User>({
    avatar: "",
    _id: "",
    campus: "",
    email: "",
    nickname: "",
    userName: "",
    birthdaydata: "",
    curso: "",
    Nfollowers: 0,
    Nfollowing: 0,
    following: [],
    followers: [],
    type: "",
    bio: "",
    password: "",
    banner: "",
    gender: "",
    isFollowing: false,
    status: "indisponível",
    facebook: "",
    instagram: "",
    likedBy: [],
    likedUsers: [],
    to: "",
    twitter: "",
    link:"",
  });

  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token");

      if (!token || token == "null") {
        window.location.href = "/auth/login";
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_USER_TOKEN
        }${token}`
      );

      setUserData(response.data.userFinded);
    }
    getData();
  }, []);

  return userData;
}
