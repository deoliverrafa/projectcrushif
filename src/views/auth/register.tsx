import { ThemeSwitcher } from "../../components/themeSwitcher";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import logo from "../../../public/images/CrushIf_Logo-removebg-preview.png"
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegisterPage() {

    const institutosFederaisPorEstado = [
        // Acre
        "IFAC",
        // Alagoas
        "IFAL",
        // Amapá
        "IFAP",
        // Amazonas
        "IFAM",
        // Bahia
        "IFBA",
        // Ceará
        "IFCE",
        // Distrito Federal
        "IFB",
        // Espírito Santo
        "IFES",
        // Goiás
        "IFG",
        // Maranhão
        "IFMA",
        // Mato Grosso
        "IFMT",
        // Mato Grosso do Sul
        "IFMS",
        // Minas Gerais
        "IFMG",
        // Pará
        "IFPA",
        // Paraíba
        "IFPB",
        // Paraná
        "IFPR",
        // Pernambuco
        "IFPE",
        // Piauí
        "IFPI",
        // Rio de Janeiro
        "IFRJ",
        // Rio Grande do Norte
        "IFRN",
        // Rio Grande do Sul
        "IFRS",
        // Rondônia
        "IFRO",
        // Roraima
        "IFRR",
        // Santa Catarina
        "IFSC",
        // São Paulo
        "IFSP",
        // Sergipe
        "IFS",
        // Tocantins
        "IFTO"
    ];

    interface UserDataRegister {
        nickname: string
        email: string
        password: string
        birthdaydata: string
        campus: string
    }

    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        password: "",
        birthdaydata: "",
        campus: "",
    })


    const [messageError, setMessageError] = useState(String);
    const [clickedButton, setClickedButton] = useState(Boolean);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setClickedButton(false);
        const { name, value } = e.target;

        setFormData((prevData: UserDataRegister) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setClickedButton(false);
        setMessageError("")

        e.preventDefault()

        try {
            const response = await axios.post("https://crushapi-4ped.onrender.com/auth/register", formData)

            if (response.data.isRegistered) {
                window.location.href = "/"
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const messageError = error;

                console.log(messageError.response?.data.message);

                setMessageError(messageError.response?.data.message ? messageError.response.data.message : "Verifique sua conexão")
            }
        } finally {
            setClickedButton(false)
        }
    }

    console.log(clickedButton);
    
    return (
        <div className="flex flex-col w-full h-full bg-gray-200 dark:bg-zinc-900">
            <div className="flex flex-row w-full justify-end items-center">
                <ThemeSwitcher className="mt-2 mr-4" />
            </div>

            <form action="register" method="POST" className="flex flex-col justify-center items-center mt-10" onSubmit={handleSubmit}>
                <div className="flex flex-col relative w-full h-full gap-10">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-center items-baseline mr-20">
                            <img src={logo} alt="logo crush ifto" className="w-20 h-20" />
                            <p className="text-black dark:text-white font-Poppins font-semibold text-3xl text-center" >Crush ifto</p>
                        </div>
                        <p className="text-black dark:text-white font-semibold font-Poppins text-2xl mt-5">Registre-se</p>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Input errorMessage={messageError ? (messageError == "Nickname já está em uso. Por favor, escolha outro." ? messageError : null) : messageError} type="text" label="nickname" placeholder="" isClearable className="w-5/6 max-w-lg border-1 border-zinc-900 rounded-lg" name="nickname" value={formData.nickname} onChange={handleChange} />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Input errorMessage={messageError ? (messageError == "Email já está em uso" ? messageError : null) : null} type="email" label="email" placeholder="" isClearable className="w-5/6 max-w-lg border-1 border-zinc-900 rounded-lg" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Input errorMessage={messageError ? (messageError == "Preencha todos os campos" ? messageError : null) : messageError} type="password" label="senha" className="w-5/6 max-w-lg border-1 border-zinc-900 rounded-lg" name="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className="flex flex-row justify-center items-center ">
                        <Input errorMessage={messageError ? (messageError == "Preencha todos os campos" ? messageError : null) : messageError} type="date" label="nascimento" className="w-5/6 max-w-lg border-1 border-zinc-900 rounded-lg" name="birthdaydata" value={formData.birthdaydata} onChange={handleChange} />
                    </div>

                    <div className="flex flex-row justify-center items-center ">
                        <div className="flex w-full justify-center items-center ">
                            <Select
                                label="Instituto"
                                className="w-5/6 max-w-lg"
                                name="campus"
                                value={formData.campus}
                                required
                                errorMessage={messageError ? (messageError == "Preencha todos os campos" ? messageError : null) : messageError}
                                onChange={handleChange}
                            >
                                {institutosFederaisPorEstado.map((instituto) => (
                                    <SelectItem
                                        key={instituto} value={instituto}>
                                        {instituto}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <Button color="primary" className="w-5/6 max-w-lg font-Poppins" type="submit" onClick={() => setClickedButton(true)}>Criar</Button>
                    </div>


                    {clickedButton ? <Spinner size="md" /> : null }


                    <div className="flex flex-row justify-center items-center ">
                        <p className="text-black dark:text-white font-semibold font-Poppins">Possui conta? <a className="text-blue-500 " href="login">Entrar</a></p>
                    </div>

                </div>
            </form >
        </div >
    )
}