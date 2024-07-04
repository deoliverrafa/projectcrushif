// IMPORT - LIBRARYS //
import { useState } from "react";
import axios from "axios";
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
  Badge
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
  user: User | null
}

// COMPONENT - EDIT PROFILE //
export const BaseUserShow = (props: userData) => {
  // Change Image

  const [errorImage, setErrorImage] = useState("");

  const handleImageChange = async (event: React.BaseSyntheticEvent) => {
    const imageFile = event.target.files[0];
    if (isValidImage(imageFile)) {
      setErrorImage('')
      const formData = new FormData();
      formData.append("avatar", imageFile);

      const response = await axios.post(`http://localhost:4040/profile/updatePhoto/${localStorage.getItem('userId')}`, formData);

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

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  function handleSelectedData(data: string) {
    setSelectedData(data);
  }

  const handleChangeData = () => {
    try {
      setChangeDataErrorMessage('')

      // const response = axios.post('http://localhost:4040/profile/changeProfile').then()

    } catch (error) {
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
              <p className="font-Poppins font-semibold leading-none">{props.user?.nickname}</p>
              <p className="font-Poppins text-default text-xs leading-none">@{props.user?.nickname}</p>
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
          className="flex flex-col relative gap-5">
          {selectedData == 'nome' ?
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex flex-row items-center">
                <Input
                  isClearable
                  radius="full"
                  label='Usuário'
                  placeholder="Ex: nickname"
                  className="font-Poppins font-medium w-full"
                  defaultValue={props.user?.nickname}></Input>
              </div>

              <div className="flex flex-row items-center">
                <Input
                  isClearable
                  radius="full"
                  label='Campus'
                  placeholder="Ex: IFRS"
                  className="font-Poppins font-medium w-full"
                  defaultValue={props.user?.campus}></Input>
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
                  placeholder="Ex: user@email.com"
                  className="font-Poppins font-medium w-full"
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
                  placeholder="Ex: ******"
                  className="font-Poppins font-medium w-full"
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
                  label='Senha'
                  placeholder="Ex: ******"
                  className="font-Poppins font-medium w-full"
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
        </form>
      </CardBody>
      <Divider />

      <CardFooter className="justify-center items-center">
        <Button
          onClick={handleChangeData}
          variant="flat"
          size="lg"
          color="primary"
          className="font-Poppins font-semibold uppercase">
          SALVAR
        </Button>
        <p className="font-Poppins font-medium">{changeDataErrorMessage ? changeDataErrorMessage : ""}</p>
      </CardFooter>
    </Card>
  );
};