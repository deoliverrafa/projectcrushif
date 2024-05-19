import { Button, Input, Switch } from "@nextui-org/react";
import { GiDoubleFaceMask } from "react-icons/gi";
import { NavBar } from "../../components/navbar";
import { getUserData } from "../../utils/getUserData";
import { ChangeEvent, useEffect, useState } from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Card from "../../components/card";

interface CardData {
    nickname: string;
    email: string;
    campus: string;
    references: string;
    content: string;
    isAnonymous: boolean;
    photoURL?: string;
    userPhotoUrl?: string
}


export default function Publish() {

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

    useEffect(() => {
        if (userData) {
            setCardData((prevData) => ({
                ...prevData,
                nickname: userData.nickname,
                email: userData.email,
                campus: userData.campus,
                isAnonymous: isAnonymous
            }));
            setAvatarPath(localStorage.getItem('avatar') ?? "")
        }
    }, [userData]);

    useEffect(() => {
        setCardData((prevData) => ({
            ...prevData,
            isAnonymous: isAnonymous
        }));
    }, [isAnonymous]);

    useEffect(() => {
        if (selectedFile) {
            if (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png" || selectedFile.type === "image/gif") {
                setErrorMessage('');
                const imageUrl = URL.createObjectURL(selectedFile);
                setCardData((prevData) => ({
                    ...prevData,
                    photoURL: imageUrl
                }));
            } else {
                setErrorMessage("Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).");
            }
        }
    }, [selectedFile]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nickname', cardData.nickname);
        formData.append('email', cardData.email);
        formData.append('campus', cardData.campus);
        formData.append('content', cardData.content || "");
        formData.append('references', cardData.references ? cardData.references : "");
        formData.append('isAnonymous', isAnonymous.toString());

        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        try {
            const response = await fetch('https://crushapi-4ped.onrender.com/post/publish', {
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
                <div className="flex flex-row items-start max-sm:flex-col max-sm:justify-start max-sm:items-center pl-20 pr-20 w-full relative top-20 text-black dark:text-white">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 max-sm:justify-center max-sm:items-center">
                        <div className="">
                            <h1 className="font-Poppins font-semibold text-xl">Publique</h1>
                        </div>

                        <div>
                            <Switch onClick={handleIsAnonymous} color="secondary" thumbIcon={!isAnonymous ? <MdOutlinePeopleAlt /> : <GiDoubleFaceMask />}>
                                {!isAnonymous ? (<p>Público</p>) : (<p>Anônimo</p>)}
                            </Switch>
                        </div>

                        <div className="flex flex-col gap-1 w-1/3 min-w-56 max-w-96">
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

                        {!isAnonymous &&
                            <div className="flex flex-col gap-1 w-1/3 min-w-56 max-w-96">
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
                        }

                        <div className="flex flex-col gap-1 w-1/3 min-w-56 max-w-96">
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

                        <div className="w-1/3 min-w-56 max-w-96">
                            <Button type="submit" color="secondary" className="w-full">Enviar</Button>
                        </div>
                    </form>

                    <div className="flex flex-row justify-center items-center max-sm:mt-5">
                        <div className="flex flex-col items-center w-full text-center gap-3">
                            <h1 className="text-black dark:text-white font-semibold">Acompanhe seu Post</h1>
                            <Card
                                campus={cardData.campus}
                                content={cardData.content}
                                email={cardData.email}
                                isAnonymous={cardData.isAnonymous}
                                nickname={cardData.nickname}
                                references={cardData.references}
                                photoURL={cardData.photoURL}
                            />
                            {isAnonymous && (
                                <div>
                                    <h1 className="animate-appearance-in text-center text-black dark:text-white font-semibold">Seu nome não aparecerá no seu post</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
