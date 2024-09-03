import { useEffect, useState } from "react";
import axios from "axios";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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

import {
  ImageUp,
  AlignRight,
  BadgeCheck,
  Mail,
  UserRoundPen,
  KeyRound,
} from 'lucide-react';
import {
  EyeInvisibleIcon,
  EyeIcon
} from '../../icons/icons.tsx';

import { isValidImage } from "../../controllers/avatarUpdate";

interface User {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  className?: string;
  avatar: string;
  curso: string
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

export const BaseUserShow = (props: userData) => {

  const [errorImage, setErrorImage] = useState("");
  const [responseImage, setResponseImage] = useState<string>();

  const handleImageChange = async (event: React.BaseSyntheticEvent) => {
    const imageFile = event.target.files[0];
    if (isValidImage(imageFile)) {
      setErrorImage('')
      const formData = new FormData();
      formData.append("avatar", imageFile);
      formData.append("token", `${localStorage.getItem('token')}`)

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_UPDATE_PROFILE_PHOTO}`
        ,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      if (response.data.updated) {
        setResponseImage(response.data.avatarURL);
        window.dispatchEvent(new Event('storage'));
      }

    } else {
      setErrorImage("Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).");
    }
  };

  const [errorMessage, setdataErrorMessage] = useState<String>();
  const [successMessage, setdataSuccessMessage] = useState<String>();
  const [selectedData, setSelectedData] = useState<String>('info');
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [nickname, setNickname] = useState(props.user?.nickname || "");
  const [campus, setCampus] = useState(props.user?.campus || "");
  const [email, setEmail] = useState(props.user?.email || "");
  const [curso, setCurso] = useState(props.user?.curso)
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  useEffect(() => {
    setNickname(props.user.nickname)
    setCampus(props.user.campus)
    setEmail(props.user.email)
    setCurso(props.user.curso)
  }, [props.user])

  function handleSelectedData(data: string) {
    setSelectedData(data);
  }


  const handleChangeData = async () => {
    try {
      setdataErrorMessage('')
      setdataSuccessMessage('')

      const formData = new FormData

      formData.append('nickname', nickname)
      formData.append('curso', curso)
      formData.append('campus', campus)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('novasenha', newPassword)

      if (selectedData == 'info') {
        try {

          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CHANGE_NAME_CAMPUS_CURSO}${localStorage.getItem('token')}`, formData);

          if (response.data.updated == true) {
            setdataSuccessMessage('Dados atualizados com Sucesso')
          } else {
            setdataErrorMessage(response.data.message)
          }

        } catch (error: any) {
          setdataErrorMessage(error.response.data.message)
        }
      }

      if (selectedData == 'email') {

        try {

          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CHANGE_EMAIL}${localStorage.getItem('token')}`, formData)

          if (response.data.updated == true) {
            setdataSuccessMessage('Email alterado com sucesso')
          } else {
            setdataErrorMessage(response.data.message)
          }
        } catch (error: any) {
          setdataErrorMessage(error.response.data.message);
        }
      }

      if (selectedData == 'password') {

        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_CHANGE_PASSWORD}${localStorage.getItem('token')}`, formData)

          if (response.data.updated == true) {
            setdataSuccessMessage('Senha alterado com sucesso')
          } else {

            setdataErrorMessage(response.data.message)
          }

        } catch (error: any) {
          setdataErrorMessage(error.response.data.message);
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
                content={<ImageUp className="animate-bounce size-4" />}
                color="primary"
                variant="faded"
                className="p-1"
                shape="rectangle"
                showOutline={false}>
                <Avatar
                  size="lg"
                  radius="lg"
                  className="cursor-pointer"
                  color="primary"
                  name={nickname}
                  src={responseImage ? responseImage : props.user.avatar} />
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
              <div className="flex flex-row items-center space-x-1">
                <p className="font-inter font-semibold">
                  {nickname}
                </p>
                <BadgeCheck className="text-success size-3" />
              </div>
              <p className="font-inter text-xs tracking-tight text-default">{email}</p>
            </div>

            <div className="mt-3">
              {errorImage && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-black dark:text-red-400" role="">
                  <span className="font-medium">Atenção!</span> {errorImage}
                </div>
              )}
            </div>
          </div>
        </form>

        <div>
          <Dropdown>
            <DropdownTrigger>
              <AlignRight className="cursor-pointer" />
            </DropdownTrigger>

            <DropdownMenu>
              <DropdownItem
                href="/profile"
                showDivider={true}
              >
                <div className="flex flex-row items-center space-x-2">
                  <div className="flex relative">
                    <div className="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                      <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                      <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                    </div>
                    <Avatar
                      size="sm"
                      name={props.user?.nickname}
                      src={props.user?.avatar}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center space-x-1">
                      <p className="font-inter font-semibold">
                        {props.user?.nickname}
                      </p>
                      <BadgeCheck className="text-success size-3" />
                    </div>
                    <p className="text-default text-tiny font-inter tracking-tight">{props.user?.email}</p>
                  </div>
                </div>
              </DropdownItem>

              {selectedData !== "info" ? (
                <DropdownItem
                  className="font-inter"
                  startContent={
                    <UserRoundPen className="size-4" />
                  }
                  onClick={() => { handleSelectedData('info') }}>
                  Alterar info
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="hidden font-inter"
                  startContent={
                    <Mail className="size-4" />
                  }
                  onClick={() => { handleSelectedData('info') }}>
                  Alterar info
                </DropdownItem>
              )}

              {selectedData !== "email" ? (
                <DropdownItem
                  className="font-inter"
                  startContent={
                    <Mail className="size-4" />
                  }
                  onClick={() => { handleSelectedData('email') }}>
                  Alterar E-mail
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="hidden font-inter"
                  startContent={
                    <Mail className="size-4" />
                  }
                  onClick={() => { handleSelectedData('email') }}>
                  Alterar E-mail
                </DropdownItem>
              )}

              {selectedData !== "password" ? (
                <DropdownItem
                  className="font-inter"
                  startContent={
                    <KeyRound className="size-4" />
                  }
                  onClick={() => { handleSelectedData('password') }}>
                  Alterar senha
                </DropdownItem>
              ) : (
                <DropdownItem
                  className="hidden font-inter"
                  startContent={
                    <KeyRound className="size-4" />
                  }
                  onClick={() => { handleSelectedData('password') }}>
                  Alterar senha
                </DropdownItem>
              )}

            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <form
          action="updateData"
          className="flex flex-col relative gap-3">
          {selectedData == 'info' ?
            <div className="flex flex-col items-center space-y-2">
              <div className="flex flex-row items-center w-full">
                <Input
                  isClearable
                  radius="lg"
                  label='Usuário'
                  placeholder="ex: nickname"
                  className="font-inter font-medium w-full"
                  value={nickname}
                  onChange={(e: React.BaseSyntheticEvent) => { setNickname(e.target.value) }}
                ></Input>
              </div>

              <div className="flex flex-row justify-between items-center space-x-1 w-full">
                <div className="flex flex-row items-center w-full">
                  <Input
                    isClearable
                    radius="lg"
                    label='Curso'
                    placeholder="ex: administração"
                    className="font-inter font-medium w-full"
                    value={curso}
                    onChange={(e: React.BaseSyntheticEvent) => { setCurso(e.target.value) }}
                  ></Input>
                </div>

                <div className="w-full flex flex-row justify-center items-center">
                  <Select
                    radius="lg"
                    label="Instituto"
                    className="font-inter font-medium w-full"
                    name="campus"
                    selectedKeys={[campus]}
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
            </div>
            :
            null
          }

          {selectedData == 'email' ?
            <div>
              <div className="flex flex-row items-center">
                <Input
                  isClearable
                  radius="lg"
                  label='E-mail'
                  type="email"
                  placeholder="ex: nickname@email.com"
                  className="font-inter font-medium w-full"
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
                  radius="lg"
                  label='Senha atual'
                  placeholder="ex: ••••••"
                  className="font-inter font-medium w-full"
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
                  radius="lg"
                  label='Nova senha'
                  placeholder="ex: ••••••"
                  className="font-inter font-medium w-full"
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
              fullWidth={true}
              className="font-poppins font-bold uppercase tracking-widest"
            >
              SALVAR
            </Button>

            {
              successMessage ? (
                <p>Tudo certo!</p>
              ) : errorMessage ? (
                <p>Error: {errorMessage}</p>
              ) : null
            }

          </CardFooter>
        </form>
      </CardBody >

    </Card >
  );
};