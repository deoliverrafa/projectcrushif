import { Avatar } from "@nextui-org/react";
import { Eye, Users } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { isValidImage } from "../controllers/avatarUpdate";

interface User {
    _id: string;
    nickname: string;
    email: string;
    campus: string;
    className?: string;
}

interface userData {
    user: User | null
}

export default function BaseUserShow(props: userData) {
    const [errorImage, setErrorImage] = useState("");

    const handleImageChange = async (event: React.BaseSyntheticEvent) => {
        const imageFile = event.target.files[0];
        if (isValidImage(imageFile)) {
            setErrorImage('')
            const formData = new FormData();
            formData.append("avatar", imageFile);

            const response = await axios.post(`https://crushapi-4ped.onrender.com/profile/updatePhoto/${localStorage.getItem('userId')}`, formData);

            if (response.data.updated) {
                const imageUrl = URL.createObjectURL(imageFile);
                localStorage.setItem('avatar', imageUrl);
                window.dispatchEvent(new Event('storage'));
            }
        } else {
            setErrorImage("Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).");
        }
    };



    const [avatarPath, setAvatarPath] = useState(localStorage.getItem('avatar') ?? "");

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
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full h-fit max-w-[1000px] rounded-lg bg-zinc-300 dark:bg-zinc-800 shadow-lg shadow-default-400">
                <div className="flex justify-center">
                    <form action="updateAvatar" method="POST" className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 items-center">
                            <label htmlFor="avatarInput">
                                <Avatar
                                    isBordered
                                    className="transition-transform mt-4 cursor-pointer"
                                    color="secondary"
                                    size="sm"
                                    name={props.user?.nickname}
                                    src={avatarPath ?? ""}
                                />
                            </label>
                            <input className="hidden" type="file" name="avatar" id="avatarInput" accept="image/*" onChange={handleImageChange} />
                            <div className="flex w-full justify-center mt-3">
                                <p className="text-bold font-Poppins text-black dark:text-white">Rafael Oliveira</p>
                            </div>
                            <div className="mt-3">
                                {errorImage && (
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-black dark:text-red-400" role="alert">
                                        <span className="font-medium">Atenção!</span> {errorImage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-4">
                    <div className="flex w-full h-auto justify-evenly items-center gap-1">
                        <div className="flex flex-col">
                            <Users size={32} weight="bold" />
                            <p className="text-bold font-Poppins text-black dark:text-white">1302</p>
                        </div>
                        <div className="flex flex-col">
                            <Eye size={32} weight="bold" />
                            <p className="text-bold font-Poppins text-black dark:text-white">1302</p>
                        </div>
                        <div className="flex flex-col">
                            <Eye size={32} weight="bold" />
                            <p className="text-bold font-Poppins text-black dark:text-white">1302</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
