import * as React from "react";
import axios from "axios";

import LoadingPage from "./loading.tsx";

import { NavBarReturn } from "../../components/navbar.tsx";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.tsx";
import { Badge } from "../../components/ui/badge.tsx";
import { Button } from "../../components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip.tsx";
import { Separator } from "../../components/ui/separator.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "../../components/ui/select.tsx";

import {
  HeartWavesSolid,
  At,
  MenuSolid,
  CheckSquareOneSolid,
  XSolid,
  InfoCircleSolid,
  EnvelopeSolid,
  ImageSolid,
  ImageRectangleSolid,
  LockPasswordSolid,
} from "@mynaui/icons-react";

import { getUserData } from "../../utils/getUserData.tsx";
// import { isValidImage } from "../../controllers/avatarUpdate";

interface User {
  _id: string;
  nickname: string;
  userName: string;
  email: string;
  campus: string;
  className?: string;
  avatar: string;
  curso: string;
  type: string;
}

interface userData {
  user: User;
}

// Campos IF'S
const IFs = [
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
  "IFTO",
];

const EditProfileLayout = (props: userData) => {
  // const [errorImage, setErrorImage] = React.useState("");
  // const [responseImage, setResponseImage] = React.useState<string>();

  // const handleImageChange = async (event: React.BaseSyntheticEvent) => {
  //   const imageFile = event.target.files[0];
  //   if (isValidImage(imageFile)) {
  //     setErrorImage("");
  //     const formData = new FormData();
  //     formData.append("avatar", imageFile);
  //     formData.append("token", `${localStorage.getItem("token")}`);

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}${
  //         import.meta.env.VITE_UPDATE_PROFILE_PHOTO
  //       }`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (response.data.updated) {
  //       setResponseImage(response.data.avatarURL);
  //       window.dispatchEvent(new Event("storage"));
  //     }
  //   } else {
  //     setErrorImage(
  //       "Por favor, selecione uma imagem válida (JPEG, PNG ou GIF)."
  //     );
  //   }
  // };

  const [errorMessage, setdataErrorMessage] = React.useState<String>();
  const [successMessage, setdataSuccessMessage] = React.useState<String>();
  const [selectedData, setSelectedData] = React.useState<String>("info");
  // const [isVisible, setIsVisible] = React.useState(false);
  // const toggleVisibility = () => setIsVisible(!isVisible);

  const [nickname, setNickname] = React.useState(props.user?.nickname || "");
  const [campus, setCampus] = React.useState(props.user?.campus || "");
  const [email, setEmail] = React.useState(props.user?.email || "");
  const [curso, setCurso] = React.useState(props.user?.curso);
  const [password, setPassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");

  React.useEffect(() => {
    setNickname(props.user.nickname);
    setCampus(props.user.campus);
    setEmail(props.user.email);
    setCurso(props.user.curso);
  }, [props.user]);

  function handleSelectedData(data: string) {
    setSelectedData(data);
  }

  const handleChangeData = async () => {
    try {
      setdataErrorMessage("");
      setdataSuccessMessage("");

      const formData = new FormData();

      formData.append("nickname", nickname);
      formData.append("curso", curso);
      formData.append("campus", campus);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("novasenha", newPassword);

      if (selectedData == "info") {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}${
              import.meta.env.VITE_CHANGE_NAME_CAMPUS_CURSO
            }${localStorage.getItem("token")}`,
            formData
          );

          if (response.data.updated == true) {
            setdataSuccessMessage("Dados atualizados com Sucesso");
          } else {
            setdataErrorMessage(response.data.message);
          }
        } catch (error: any) {
          setdataErrorMessage(error.response.data.message);
        }
      }

      if (selectedData == "email") {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}${
              import.meta.env.VITE_CHANGE_EMAIL
            }${localStorage.getItem("token")}`,
            formData
          );

          if (response.data.updated == true) {
            setdataSuccessMessage("Email alterado com sucesso");
          } else {
            setdataErrorMessage(response.data.message);
          }
        } catch (error: any) {
          setdataErrorMessage(error.response.data.message);
        }
      }

      if (selectedData == "password") {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}${
              import.meta.env.VITE_CHANGE_PASSWORD
            }${localStorage.getItem("token")}`,
            formData
          );

          if (response.data.updated == true) {
            setdataSuccessMessage("Senha alterado com sucesso");
          } else {
            setdataErrorMessage(response.data.message);
          }
        } catch (error: any) {
          setdataErrorMessage(error.response.data.message);
        }
      }
    } catch (error: any) {
      setdataErrorMessage(error.response?.message);
    }
  };

  return (
    <React.Fragment>
      <Card className="mt-2 w-full md:w-6/12">
        <div className="relative w-full h-40">
          <img
            src="https://img.freepik.com/fotos-premium/fundo-abstrato-da-lua-em-cores-esteticas-generative-ai_888418-6857.jpg?w=996"
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-fill"
          />

          <div className="absolute bottom-[-30px] left-4">
            <Avatar className="h-20 w-20 shadow-lg border-4 border-secondary rounded-full">
              <AvatarFallback>{nickname}</AvatarFallback>
              <AvatarImage
              // src={responseImage ? responseImage : props.user.avatar}
              />
            </Avatar>
          </div>
        </div>
        <CardHeader className="flex flex-row justify-between items-center mt-8">
          <div className="flex flex-col gap-1">
            <CardTitle className="font-medium text-sm md:text-sm">
              {props.user.userName ? props.user.userName : "Nome indisponível"}
            </CardTitle>

            <div className="flex flex-row items-center gap-1">
              <Badge variant={"outline"} className="font-light w-fit">
                <At className="h-2.5 w-2.5" />{" "}
                {props.user.nickname
                  ? `${props.user.nickname}`
                  : "indisponível"}
                <HeartWavesSolid
                  className={`${
                    props.user.type === "Plus"
                      ? "text-info"
                      : props.user.type === "Admin"
                      ? "text-danger"
                      : props.user.type === "verified"
                      ? "text-success"
                      : "hidden"
                  } ml-1 h-3 w-3`}
                />
              </Badge>
            </div>
          </div>

          <Drawer>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DrawerTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                      <MenuSolid className="h-5 w-5" />
                    </Button>
                  </DrawerTrigger>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Menu</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Editar perfil</DrawerTitle>
                  <DrawerDescription>
                    Selecione a opção desejada
                  </DrawerDescription>
                </DrawerHeader>
              </div>

              <Separator />

              <div className="py-5 space-y-2 mx-auto w-full max-w-sm">
                {selectedData === "info" ? null : (
                  <Button
                    variant={"ghost"}
                    className="justify-start w-full"
                    onClick={() => {
                      handleSelectedData("info");
                    }}
                  >
                    <InfoCircleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    Informações
                  </Button>
                )}

                {selectedData === "email" ? null : (
                  <Button
                    variant={"ghost"}
                    className="justify-start w-full"
                    onClick={() => {
                      handleSelectedData("email");
                    }}
                  >
                    <EnvelopeSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    E-mail
                  </Button>
                )}

                {selectedData === "password" ? null : (
                  <Button
                    variant={"ghost"}
                    className="justify-start w-full"
                    onClick={() => {
                      handleSelectedData("password");
                    }}
                  >
                    <LockPasswordSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    Senha
                  </Button>
                )}

                <Button variant={"ghost"} className="justify-start w-full">
                  <ImageSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Foto
                </Button>

                <Button variant={"ghost"} className="justify-start w-full">
                  <ImageRectangleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Banner
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </CardHeader>

        <Separator />

        <form action="updateData" className="mt-4">
          {selectedData === "info" && (
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="nickname">Usuário</Label>
                <Input
                  value={nickname}
                  id="nickname"
                  onChange={(e: React.BaseSyntheticEvent) => {
                    setNickname(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="campus">Campus</Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={campus ? campus : "Selecione seu campus"}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {IFs.map((instituto) => (
                        <SelectItem
                          onChange={(e: React.BaseSyntheticEvent) => {
                            setCampus(e.target.value);
                          }}
                          key={instituto}
                          value={instituto}
                        >
                          {instituto}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="curso">Curso</Label>
                <Input
                  value={curso}
                  id="curso"
                  onChange={(e: React.BaseSyntheticEvent) => {
                    setCurso(e.target.value);
                  }}
                />
              </div>
            </CardContent>
          )}

          {selectedData === "email" && (
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e: React.BaseSyntheticEvent) => {
                    setEmail(e.target.value);
                  }}
                  value={props.user?.email}
                />
              </div>
            </CardContent>
          )}

          {selectedData === "password" && (
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="oldPassword">Senha atual</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  onChange={(e: React.BaseSyntheticEvent) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  onChange={(e: React.BaseSyntheticEvent) => {
                    setnewPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
          )}

          <Separator />

          <CardFooter className="flex flex-col items-end space-y-2 mt-4">
            {successMessage ? (
              <CardDescription className="text-success flex flex-row items-center gap-2">
                <CheckSquareOneSolid className="h-4 w-4" />
                Salvo com sucesso!
              </CardDescription>
            ) : errorMessage ? (
              <CardDescription className="text-danger flex flex-row items-center gap-2">
                <XSolid className="h-4 w-4" />
                {errorMessage}
              </CardDescription>
            ) : null}
            <Button variant={"success"} onClick={handleChangeData}>
              Salvar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </React.Fragment>
  );
};

const EditProfilePage = () => {
  const userData = getUserData();

  return (
    <React.Fragment>
      <NavBarReturn title="Editar perfil" />

      {userData ? (
        <main className="flex flex-col justify-center items-center h-full w-full">
          <EditProfileLayout user={userData} />
        </main>
      ) : (
        <LoadingPage />
      )}
    </React.Fragment>
  );
};

export default EditProfilePage;
