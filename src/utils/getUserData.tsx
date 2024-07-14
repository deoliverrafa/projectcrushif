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
            const token = localStorage.getItem("token");

            if (!token || token == "null") {
                window.location.href = "/auth/login"
                return;
            }
            
            const response = await axios.get(`https://crushapi-4ped.onrender.com/user/token/${token}`);
            
            setUserData(response.data.userFinded);
        }
        getData();

    }, []);

    return userData;
}