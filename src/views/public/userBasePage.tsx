import { useEffect, useState } from 'react';
import { NavBarReturn } from "../../components/navbar";
import BaseUserShow from "../../components/baseUserShow";
import { getUserData } from "../../utils/getUserData";
import { Spinner } from '@nextui-org/react';

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
        <div className='flex flex-col w-full h-full'>
            <NavBarReturn title="Perfil" />
            {
                userData ?
                    <BaseUserShow user={userData} />
                    :
                    <div className='flex flex-row justify-center items-center'>
                        <Spinner />Aguarde...
                    </div>
            }
            
        </div>
        </>
    );
}
