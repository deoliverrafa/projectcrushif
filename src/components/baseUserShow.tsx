// IMPORT - LIBRARYS //
import { useState } from "react";
import axios from "axios";
import { Alert } from "flowbite-react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Badge,
  Select,
  SelectItem
} from "@nextui-org/react";

// IMPORT - SCRIPTS //
import { isValidImage } from "../controllers/avatarUpdate";

// IMPORT - ICONS //
import {
  PencilIcon,
  EmailIcon,
  PasswordIcon,
  PersonIcon,
  EyeInvisibleIcon,
  EyeIcon
} from './../icons/icons.tsx';

// CREATE - INTERFACE //
interface User {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  className?: string;
  avatar: string;
}

interface userData {
  user: User
}

// Campos IF'S

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

// COMPONENT - EDIT PROFILE //
export const BaseUserShow = (props: userData) => {

  const [errorImage, setErrorImage] = useState("");

  const handleImageChange = async (event: React.BaseSyntheticEvent) => {
    const imageFile = event.target.files[0];
    console.log(imageFile)
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

  // User changeData Logic
  const [errorMessage, setdataErrorMessage] = useState<String>();
  const [successMessage, setdataSuccessMessage] = useState<String>();
  const [selectedData, setSelectedData] = useState<String>('nome');
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);


  // Estados de dados
  const [nickname, setNickname] = useState(props.user?.nickname || "");
  const [campus, setCampus] = useState(props.user?.campus || "");
  const [email, setEmail] = useState(props.user?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  function handleSelectedData(data: string) {
    setSelectedData(data);
  }


  const handleChangeData = async () => {
    try {
      setdataErrorMessage('')
      setdataSuccessMessage('')

      const formData = new FormData

      formData.append('nickname', nickname)
      formData.append('campus', campus)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('novasenha', newPassword)

      formData.forEach((data) => {
        console.log(data);
      })

      if (selectedData == 'nome') {
        console.log('EntreiNom');

        const response = await axios.post(`https://crushapi-4ped.onrender.com/profile/changeNameCampus/${localStorage.getItem('token')}`, formData);

        if (response.data.updated == true) {
          setdataSuccessMessage('Nome alterado com sucesso')
        } else {
          setdataErrorMessage(response.data.message)
        }
      }

      if (selectedData == 'email') {
        console.log('Entrei email');

        const response = await axios.post(`https://crushapi-4ped.onrender.com/profile/changeEmail/${localStorage.getItem('token')}`, formData)

        if (response.data.updated == true) {
          setdataSuccessMessage('Email alterado com sucesso')
        } else {
          setdataErrorMessage(response.data.message)
        }
      }

      if (selectedData == 'password') {
        console.log("EntreiPassword");

        const response = await axios.post(`https://crushapi-4ped.onrender.com/profile/changePassword/${localStorage.getItem('token')}`, formData)

        if (response.data.updated == true) {
          setdataSuccessMessage('Senha alterado com sucesso')
        } else {
          setdataErrorMessage(response.data.message)
        }
      }


    } catch (error: any) {
      setdataErrorMessage(error.response?.message)
    }
  }
  
  return (
    <Card className="flex flex-col w-11/12 max-w-[768px]">
      <CardHeader className="flex flex-row justify-between items-center">
        <form action="updateAvatar" method="POST" className="flex flex-col">
          <div className="flex flex-row gap-5 items-center">
            <label htmlFor="avatarInput">
              <Badge
                content={<PencilIcon />}
                color="default"
                className="p-1"
                shape="rectangle"
                showOutline={false}>
                <Avatar
                  size="lg"
                  radius="lg"
                  isBordered
                  className="cursor-pointer"
                  color="primary"
                  name={props.user?.nickname}
                  src={props.user?.avatar} />
              </Badge>
            </label>

            <input
              className="hidden"
              type="file"
              name="avatar"
              id="avatarInput"
              accept="image/*"
              onChange={handleImageChange} />
            <div className="flex flex-col justify-center gap-1 w-full">
              <p className="font-Poppins font-semibold leading-none">{nickname}</p>
              <p className="font-Poppins text-default text-xs leading-none">@{nickname}</p>
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

        <div>
          <Dropdown>
            <DropdownTrigger>
              <i className="fi fi-rr-menu-dots-vertical"></i>
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions">
              <DropdownSection
                title="Editar"
                className="font-Poppins">
                <DropdownItem
                  className="gap-2">
                  <p className="font-semibold">Logado como:</p>
                  <p className="font-regular text-default">{props.user?.email}</p>
                </DropdownItem>

                {selectedData !== "email" ? (
                  <DropdownItem
                    key="email"
                    className="font-Poppins"
                    description="Alterar e-mail do usuário"
                    startContent={<EmailIcon className="size-4" />}
                    onClick={() => { handleSelectedData('email') }}>
                    E-mail
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="email"
                    className="hidden"
                    color="default"
                    onClick={() => { handleSelectedData('email') }}>
                    E-mail
                  </DropdownItem>)}

                {selectedData !== "password" ? (
                  <DropdownItem
                    key="password"
                    className="font-Poppins"
                    description="Alterar senha do usuário"
                    startContent={<PasswordIcon className="size-4" />}
                    onClick={() => { handleSelectedData('password') }}>
                    Senha
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="password"
                    className="hidden"
                    onClick={() => { handleSelectedData('password') }}>
                    Senha
                  </DropdownItem>)}

                {selectedData !== "nome" ? (
                  <DropdownItem
                    key="nome"
                    className="font-Poppins"
                    description="Alterar nome do usuário"
                    startContent={<PersonIcon className="size-4" />}
                    onClick={() => { handleSelectedData('nome') }}>
                    Nome
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="nome"
                    className="hidden"
                    onClick={() => { handleSelectedData('nome') }}>
                    Nome
                  </DropdownItem>)}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <form
          action="updateData"
          className="flex flex-col relative gap-3">
          {selectedData == 'nome' ?
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex flex-row items-center w-full">
                <Input
                  isClearable
                  radius="full"
                  label='Usuário'
                  placeholder="Ex: nickname"
                  className="font-Poppins font-medium w-full"
                  defaultValue={props.user?.nickname}
                  onChange={(e: React.BaseSyntheticEvent) => { setNickname(e.target.value) }}
                ></Input>
              </div>

              <div className="w-full flex flex-row justify-center items-center">
                <Select
                  isRequired
                  radius="full"
                  label="Instituto"
                  className="font-Poppins font-medium w-5/6"
                  name="campus"
                  defaultSelectedKeys={[props.user.campus]}
                  onChange={(e: React.BaseSyntheticEvent) => { setCampus(e.target.value) }}
                  value={campus}>
                  {institutosFederaisPorEstado.map((instituto) => (
                    <SelectItem
                      key={instituto} value={instituto}>
                      {instituto}
                    </SelectItem>
                  ))}
                </Select>
              </div>

            </div>
            :
            null
          }

          {selectedData == 'email' ?
            <div>
              <div className="flex flex-row items-center">
                <Input
                  isClearable
                  radius="full"
                  label='E-mail'
                  type="email"
                  placeholder="Ex: user@email.com"
                  className="font-Poppins font-medium w-full"
                  onChange={(e: React.BaseSyntheticEvent) => { setEmail(e.target.value) }}
                  defaultValue={props.user?.email}></Input>
              </div>
            </div>
            :
            null
          }

          {selectedData == 'password' ?
            <div>
              <div className="flex flex-row items-center my-1">
                <Input
                  radius="full"
                  label='Senha'
                  placeholder="Ex: senha"
                  className="font-Poppins font-medium w-full"
                  onChange={(e: React.BaseSyntheticEvent) => { setPassword(e.target.value) }}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeInvisibleIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}></Input>
              </div>
              <div className="flex flex-row items-center my-1">
                <Input
                  radius="full"
                  label='Nova Senha'
                  placeholder="Ex: novasenha"
                  className="font-Poppins font-medium w-full"
                  onChange={(e: React.BaseSyntheticEvent) => { setnewPassword(e.target.value) }}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeInvisibleIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}></Input>
              </div>
            </div>
            :
            null
          }

          <Divider />
          <CardFooter className="flex-col justify-center items-center">
            <Button
              onClick={handleChangeData}
              variant="flat"
              size="lg"
              color="primary"
              className="font-Poppins font-semibold uppercase">
              SALVAR
            </Button>

            {
              successMessage ? (
                <Alert color="success">
                  <span className="font-medium">Tudo Certo!</span> {successMessage}
                </Alert>
              ) : errorMessage ? (
                <Alert color="failure">
                  <span className="font-medium">Erro!!</span> {errorMessage}
                </Alert>
              ) : null
            }

          </CardFooter>
        </form>
      </CardBody >

    </Card >
  );
};