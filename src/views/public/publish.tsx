import { Button, Input, Switch } from "@nextui-org/react";
import { NavBar } from "../../components/navbar";
import { getUserData } from "../../utils/getUserData";
import { useEffect, useState } from "react";

export default function Publish() {
    const userData = getUserData();

    const [isAnonymous, setAnonymous] = useState<boolean>(false);
    const [avatarPath, setAvatarPath] = useState(localStorage.getItem('avatar') ?? "")



    function handleIsAnonymous() {
        if (isAnonymous == true) {
            setAnonymous(false)
        } else {
            setAnonymous(true)
        }
    }

    function handleAvatar() {
        setAvatarPath(localStorage.getItem('avatar') ?? "")
    }

    useEffect(() => {
        handleAvatar()
    }, [])


    return (
        <>
            <NavBar user={userData} avatarPath={avatarPath} />

            <div className="flex flex-col justify-center items-center relative top-20 text-black dark:text-white gap-5">
                <div className="">
                    <h1 className="font-Poppins font-semibold text-xl">Publique</h1>
                </div>

                <div>
                    <Switch onClick={handleIsAnonymous}>
                        Anônimo
                    </Switch>
                </div>

                {/* Títutlo */}

                {!isAnonymous ?

                    <div className="flex flex-col gap-1 w-1/3">
                        <Input
                            key="outside"
                            type="Title"
                            label="Título"
                            labelPlacement="outside"
                            description="Título da sua publicação"
                            className="w-full"
                        />
                    </div>
                    :
                    <div className="hidden">
                        <Input
                            key="outside"
                            type="Title"
                            label="Título"
                            labelPlacement="outside"
                            description="Título da sua publicação"
                            className="w-full"
                        />
                    </div>

                }

                {/* Descrição */}

                <div className="flex flex-col gap-1 w-1/3">
                    <Input
                        key="outside"
                        type="desc"
                        label="Descrição"
                        labelPlacement="outside"
                        description="Descrição da sua publicação"
                        className="w-full"
                    />
                </div>

                {/* Marcações */}

                {!isAnonymous ?
                    <div className="flex flex-col gap-1 w-1/3">
                        <Input
                            key="outside"
                            type="marks"
                            label="Marcações"
                            labelPlacement="outside"
                            description="Levante uma corrente"
                            className="w-full"
                        />
                    </div>
                    :
                    <div className="hidden">
                        <Input
                            key="outside"
                            type="marks"
                            label="Marcações"
                            labelPlacement="outside"
                            description="Levante uma corrente"
                            className="w-full"
                        />
                    </div>
                }

                <div className="flex flex-col gap-1 w-1/3">

                    <label htmlFor="inputFoto" className="w-full h-fit cursor-pointer">
                        <Button className="w-full" as="span" >
                            Selecione uma Foto
                        </Button>
                    </label>

                    <input className="hidden" type="file" name="foto" id="inputFoto" />
                </div>

            </div>
        </>
    )
}