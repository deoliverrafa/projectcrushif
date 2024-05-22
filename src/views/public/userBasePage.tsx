import { useEffect, useState } from 'react';
import { NavBar } from "../../components/navbar";
import BaseUserShow from "../../components/baseUserShow";
import {getUserData} from "../../utils/getUserData";

export default function UserBasePage() {
    const [avatarPath, setAvatarPath] = useState(localStorage.getItem('avatar') ?? "");
    const userData = getUserData();

    useEffect(() => {
        const handleStorageChange = () => {
            setAvatarPath(localStorage.getItem('avatar') ?? "");
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <>
            <NavBar user={userData} avatarPath={userData?.avatar ? userData.avatar : avatarPath } />
            <BaseUserShow user={userData} />
        </>
    );
}
