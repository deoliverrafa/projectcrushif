import { Button, Input, Switch, card } from "@nextui-org/react";
import { NavBar } from "../../components/navbar";
import { getUserData } from "../../utils/getUserData";
import { ChangeEvent, isValidElement, useEffect, useState } from "react";
import { MagnifyingGlass, SmileyNervous } from "phosphor-react";
import Card from "../../components/card";

interface CardData {
    nickname: string;
    email: string;
    campus: string;
    references?: string;
    content?: string;
    isAnonymous: boolean;
}

interface CardProps {
    CardData: CardData;
}


export default function Publish() {
    console.log("Renderizei");

    const userData = getUserData();

    const [isAnonymous, setAnonymous] = useState<boolean>(false);
    const [avatarPath, setAvatarPath] = useState(localStorage.getItem('avatar') ?? "");
    const [errorMessage, setErrorMessage] = useState("");

    const [cardData, setCardData] = useState<CardData>({
        nickname: "",
        email: "",
        campus: "",
        references: "",
        content: "",
        isAnonymous: false
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function handleIsAnonymous() {
        setAnonymous(!isAnonymous);
    }

    function handleChangeData(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCardData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    }

    function handleAvatar() {
        setAvatarPath(localStorage.getItem('avatar') ?? "");
    }

    useEffect(() => {
        handleAvatar
        if (userData) {
            setCardData((prevData) => ({
                ...prevData,
                nickname: userData.nickname,
                email: userData.email,
                campus: userData.campus,
                isAnonymous: isAnonymous
            }));
        }
    }, [userData]);

    useEffect(() => {
        if (selectedFile) {
            console.log(selectedFile);

            if (selectedFile.type == "image/jpeg" || selectedFile.type == "image/png" || selectedFile.type == "image/gif") {
                setErrorMessage('');
                const imageUrl = URL.createObjectURL(selectedFile);
                setCardData((prevData) => ({
                    ...prevData,
                    photo: imageUrl
                }))
            } else {
                setErrorMessage("Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).")
            }

        }
    }, [selectedFile])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nickname', cardData.nickname);
        formData.append('email', cardData.email);
        formData.append('campus', cardData.campus);
        formData.append('content', cardData.content || "");
        formData.append('references', cardData.references ? cardData.references : "");

        if (selectedFile) {
            formData.append('foto', selectedFile);
        }

        try {
            const response = await fetch('YOUR_BACKEND_URL', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <NavBar user={userData} avatarPath={avatarPath} />


                <div className="flex flex-row items-start max-sm:flex-col max-sm:justify-center max-sm:items-center pl-20 pr-20 w-full relative top-20 text-black dark:text-white">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 max-sm:justify-center max-sm:items-center">
                        <div className="">
                            <h1 className="font-Poppins font-semibold text-xl">Publique</h1>
                        </div>

                        <div>
                            <Switch onClick={handleIsAnonymous} color="secondary" thumbIcon={!isAnonymous ? <MagnifyingGlass /> : <SmileyNervous />}>
                                {!isAnonymous ? (<p>Público</p>) : (<p>Anônimo</p>)}
                            </Switch>
                        </div>

                        {/* Texto */}
                        <div className="flex flex-col gap-1 w-1/3 min-w-56">
                            <Input
                                key="content"
                                type="text"
                                name="content"
                                label="Texto"
                                labelPlacement="outside"
                                description="Descrição da sua publicação"
                                className="w-full border-1 border-zinc-900 rounded-lg"
                                onChange={handleChangeData}
                            />
                        </div>

                        {/* Marcações */}
                        {!isAnonymous ?
                            <div className="flex flex-col gap-1 w-1/3 min-w-56">
                                <Input
                                    key="references"
                                    type="text"
                                    name="references"
                                    label="Marcações"
                                    labelPlacement="outside"
                                    description="Levante uma corrente"
                                    className="w-full border-1 border-zinc-900 rounded-lg"
                                    onChange={handleChangeData}
                                />
                            </div>
                            :
                            null
                        }

                        <div className="flex flex-col gap-1 w-1/3 min-w-56">
                            <label htmlFor="inputFoto" className="w-full h-fit cursor-pointer">
                                <Button className="w-full" as="span">
                                    Selecione uma Foto
                                </Button>
                            </label>
                            <input className="hidden" type="file" name="foto" id="inputFoto" onChange={handleFileChange} />

                            <div className="mt-3">
                                {errorMessage && (
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-black dark:text-red-400" role="alert">
                                        <span className="font-medium">Atenção!</span> {errorMessage}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-1/3 min-w-56">
                            <Button type="submit" color="secondary" className="w-full">Enviar</Button>
                        </div>
                    </form>

                    <div className="flex justify-center items-center mt-5">
                        {/* Card exemplo */}
                        <div className="flex flex-col w-full text-center">
                            <h1>Acompanhe seu Post</h1>
                            <Card CardData={cardData} />
                        </div>

                        <div>
                            {
                                isAnonymous ? (
                                    <div>
                                        <h1 className="animate-appearance-in text-center text-black dark:text-white font-semibold">Seu nome não aparecerá no seu post</h1>
                                    </div>
                                ) :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
