import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    _id: string
    nickname: string
    email: string
    campus: string
    avatar: string
}

export function getUserData() {
    
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        async function getData() {
            const userId = localStorage.getItem("userId");

            if (!userId || userId == "null") {
                window.location.href = "/auth/login"
                return;
            }


            
            const response = await axios.get(`https://crush-api.vercel.app/user/${userId}`);

            setUserData(response.data.userFinded);
        }
        getData();

    }, []);

    return userData;
}