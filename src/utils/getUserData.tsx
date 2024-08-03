import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    _id: string
    nickname: string
    userName: string
    email: string
    campus: string
    avatar: string
    birthdaydata: string
    Nfollowing: number
    Nfollowers: number
    curso: string
}

export function getUserData() {

    const [userData, setUserData] = useState<User>({
        avatar: "",
        _id: "",
        campus: "",
        email: "",
        nickname: "",
        userName: "",
        birthdaydata: "",
        curso: '',
        Nfollowers: 0,
        Nfollowing: 0,
    });

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token");

            if (!token || token == "null") {
                window.location.href = "/auth/login"
                return;
            }

            const response = await axios.get(`http://localhost:4040/user/token/${token}`);

            setUserData(response.data.userFinded);
        }
        getData();

    }, []);

    return userData;
}