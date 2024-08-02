import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    _id: string
    nickname: string
    email: string
    campus: string
    avatar: string
}

export function getUserDataById(id: string) {

    const [userData, setUserData] = useState<User>({
        avatar: "",
        _id: "",
        campus: "",
        email: "",
        nickname: "",
    });

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem("token");

            if (!token || token == "null") {
                window.location.href = "/auth/login"
                return;
            }

            const response = await axios.get(`https://crush-api.vercel.app/user/id/${id}`);

            setUserData(response.data.userFinded);
        }
        getData();

    }, []);

    return userData;
}