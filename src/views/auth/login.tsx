import { ThemeSwitcher } from "../../components/themeSwitcher";
import { Button, Input, Spinner } from "@nextui-org/react";
import logo from "../../../public/images/CrushIf_Logo-removebg-preview.png"

import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

interface UserDataLogin {
    nickname: string
    password: string
}

export default function LoginPage() {
    const [clickedButton, setClickedButton] = useState(Boolean);
    const [messageError, setMessageError] = useState(String);

    const [formData, setFormData] = useState({
        nickname: "",
        password: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData: UserDataLogin) => ({
            ...prevData,
            [name]: value
        }
        ));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setClickedButton(true);
            setMessageError("")

            const response = await axios.post(`https://crushapi-4ped.onrender.com/auth/login`, formData);

            localStorage.setItem("userId", response.data.user._id)
            localStorage.getItem("userId")

            if (!response.data.logged) {
                setMessageError(response.data.message);
            }
            else {
                window.location.href = '/';
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messageError: any = error;

                console.log(messageError.response?.data.messsage);
                setMessageError(messageError.response?.data.message ? messageError.response.data.message : "Verifique sua conexão")
            }
        } finally {
            setClickedButton(false)
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200 dark:bg-zinc-900">

            <div className="flex flex-row w-full justify-end items-center">
                <ThemeSwitcher className="mt-2 mr-4" />
            </div>

            <div className="flex flex-col justify-center items-center mt-10 w-full h-full" >
                <form action="register" method="POST" className="flex flex-col relative w-full h-full gap-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-baseline mr-20">
                            <img src={logo} alt="logo crush ifto" className="w-20 h-20" />
                            <p className="text-black dark:text-white font-Poppins font-semibold text-3xl text-center" >Crush ifto</p>
                        </div>
                        <p className="text-black dark:text-white font-semibold font-Poppins text-2xl mt-5">Login</p>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Input type="nickname" label="nickname" placeholder="" isClearable className="w-5/6 max-w-lg border-1 border-zinc-900 rounded-lg" name="nickname" onChange={handleChange} errorMessage={messageError == "Nickname não encontrado" ? messageError : null} />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Input type="password" label="senha" className="w-5/6 max-w-lg border-1 border-zinc-900 rounded-lg" name="password" onChange={handleChange} errorMessage={messageError == "Senha incorreta tente novamente" ? messageError : null} />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Button color="primary" className="w-5/6 max-w-lg font-Poppins font-semibold" type="submit" onClick={() => setClickedButton(true)}>Entrar</Button>
                    </div>

                    <div className="flex flex-col justify-center items-center text-center">

                        {clickedButton && !messageError && <Spinner size="md" className="hidden" />}

                        <div className="flex flex-col justify-center items-center">
                            <p className="text-black dark:text-white font-medium font-Poppins">Não possui conta? <a href="register" className="text-blue-500 font-semibold">criar</a></p>
                        </div>

                    </div>
                </form >
            </div>
        </div >

    );
}