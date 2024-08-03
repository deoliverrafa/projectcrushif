import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    _id: string
    nickname: string
    userName: string
    email: string
    campus: string
    avatar: string
    curso: string
    birthdaydata: string
    Nfollowing: number
    Nfollowers: number
}

export function getUserDataById(id: string) {

    const [userData, setUserData] = useState<User>({
        avatar: "",
        _id: "",
        campus: "",
        email: "",
        nickname: "",
        userName: "",
        curso: '',
        birthdaydata: "",
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

            const response = await axios.get(`http://localhost:4040/user/id/${id}`);

            setUserData(response.data.userFinded);
        }
        getData();

    }, []);

    return userData;
}