import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { isValidImage } from "../controllers/avatarUpdate";
import { Pencil } from "phosphor-react";

interface User {
    _id: string;
    nickname: string;
    email: string;
    campus: string;
    className?: string;
    avatar: string;
}

interface userData {
    user: User | null
}

export default function BaseUserShow(props: userData) {
    // Change Image

    const [errorImage, setErrorImage] = useState("");

    const handleImageChange = async (event: React.BaseSyntheticEvent) => {
        const imageFile = event.target.files[0];
        if (isValidImage(imageFile)) {
            setErrorImage('')
            const formData = new FormData();
            formData.append("avatar", imageFile);

            const response = await axios.post(`https://crush-api.vercel.app/profile/updatePhoto/${localStorage.getItem('userId')}`, formData);

            if (response.data.updated) {
                const imageUrl = URL.createObjectURL(imageFile);
                localStorage.setItem('avatar', imageUrl);
                window.dispatchEvent(new Event('storage'));
            }
            response.data.error
        } else {
            setErrorImage("Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).");
        }
    };

    // User changeData Logic

    const [changeDataErrorMessage, setChangeDataErrorMessage] = useState<String>();
    const [selectedData, setSelectedData] = useState<String>('nome');

    function handleSelectedData(data: string) {
        setSelectedData(data);
    }

    const handleChangeData = () => {
        try {
            // const response = axios.post('https://crush-api.vercel.app/profile/changeProfile').then()
            setChangeDataErrorMessage('Opção indisponível no momento')
        } catch (error) {
        }
    }
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-fit w-3/4 min-w-[200px] max-w-[1000px] rounded-lg bg-zinc-300 dark:bg-zinc-800 shadow-lg shadow-default-400">
                <div className="flex justify-center relative">
                    <form action="updateAvatar" method="POST" className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 items-center">
                            <label htmlFor="avatarInput">
                                <Avatar
                                    isBordered
                                    className="transition-transform mt-4 cursor-pointer"
                                    color="secondary"
                                    size="sm"
                                    name={props.user?.nickname}
                                    src={props.user?.avatar}
                                />
                            </label>
                            <input className="hidden" type="file" name="avatar" id="avatarInput" accept="image/*" onChange={handleImageChange} />
                            <div className="flex w-full justify-center mt-3">
                                <p className="text-bold font-Poppins text-zinc-700 dark:text-white">{props.user?.nickname}</p>
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

                    <div className="absolute right-3 top-3">
                        <Dropdown className="bg-gray-300 dark:bg-zinc-800 w-auto h-auto" placement="bottom-end">
                            <DropdownTrigger>
                                <i className="fi fi-rr-menu-dots-vertical"></i>
                            </DropdownTrigger>

                            <DropdownMenu aria-label="Profile Actions" variant="flat">

                                {selectedData !== "email" ?
                                    (
                                        <DropdownItem key="email" className="font-Poppins" color="default" onClick={() => { handleSelectedData('email') }}>Email </DropdownItem>
                                    )
                                    :
                                    (
                                        <DropdownItem key="email" className="hidden" color="default" onClick={() => { handleSelectedData('email') }}>Email </DropdownItem>
                                    )
                                }

                                {selectedData !== "password" ?
                                    (
                                        <DropdownItem key="password" className="font-Poppins" color="default" onClick={() => { handleSelectedData('password') }}>Senha</DropdownItem>
                                    )
                                    :
                                    (
                                        <DropdownItem key="password" className="hidden" color="default" onClick={() => { handleSelectedData('password') }}>Senha</DropdownItem>
                                    )
                                }

                                {selectedData !== "nome" ?
                                    (
                                        <DropdownItem key="nome" className="font-Poppins" color="default" onClick={() => { handleSelectedData('nome') }}>Nome</DropdownItem>
                                    )
                                    :
                                    (
                                        <DropdownItem key="nome" className="hidden" color="default" onClick={() => { handleSelectedData('nome') }}>Nome</DropdownItem>
                                    )
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col items-center">
                    <div className="flex flex-col w-full justify-start items-center gap-5">
                        <div className="flex flex-row w-full h-full gap-3 items-center justify-center">

                            {selectedData == 'nome' ?

                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-row items-center">
                                        <Input placeholder="Nome" variant="underlined" label='Nome' value={props.user?.nickname}></Input>
                                    </div>

                                    <div className="flex flex-row items-center">
                                        <Input placeholder="Campus" variant="underlined" label='Campus' value={props.user?.campus}></Input>
                                    </div>
                                </div>
                                :
                                null
                            }

                            {selectedData == 'email' ?

                                <div>
                                    <div className="flex flex-row items-center">
                                        <Input placeholder="email" variant="underlined" label='email' value={props.user?.email}></Input>
                                    </div>

                                </div>
                                :
                                null
                            }

                            {selectedData == 'password' ?
                                <div>
                                    <div className="flex flex-row items-center">
                                        <Input type="password" variant="underlined" label='Senha' labelPlacement="inside"></Input>
                                    </div>

                                    <div className="flex flex-row items-center">
                                        <Input type="password" variant="underlined" label='Nova Senha' labelPlacement="inside"></Input>
                                    </div>

                                </div>
                                :
                                null
                            }
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <Button className="w-36" onClick={handleChangeData} variant="bordered" endContent={<Pencil />}>Alterar</Button>
                            <p className="text-bold font-Poppins text-red-500/40 hover:text-red-500/90">{changeDataErrorMessage ? changeDataErrorMessage : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
