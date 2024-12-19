import * as React from "react";
import axios from "axios";

import LoadingPage from "./loading.tsx";

import {
  NavBarReturn
} from "../../components/navbar.tsx";

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
import {
  Badge
} from "../../components/ui/badge.tsx";
import {
  Button
} from "../../components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip.tsx";
import {
  Separator
} from "../../components/ui/separator.tsx";
import {
  Input
} from "../../components/ui/input.tsx";
import {
  Label
} from "../../components/ui/label.tsx";
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
  Textarea
} from "../../components/ui/textarea.tsx";

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
  MaleSolid,
  PencilSolid,
  FemaleSolid,
  CalendarSolid,
} from "@mynaui/icons-react";

import UserIcon from "../../../public/images/user.png"

import {
  getUserData
} from "../../utils/getUserData.tsx";
import {
  getStatusUser
} from "../../utils/getStatusUser.tsx";
import {
  isValidImage
} from "../../controllers/avatarUpdate";
import {
  IFs,
  CURSOs
} from "../../utils/infoIFs.ts";

interface User {
  _id: string;
  nickname: string;
  userName: string;
  email: string;
  campus: string;
  className?: string;
  avatar: string;
  banner: string;
  curso: string;
  type: string;
  password: string;
  gender: string;
  bio: string;
  birthdaydata: string;
}

interface userData {
  user: User;
}

const GENDERs = ["Masculino", "Feminino"];

const EditProfileLayout = (props: userData) => {
  const [userId] = React.useState < string | null > (
    localStorage.getItem("userId")
  );

  const [errorMessage,
    setDataErrorMessage] = React.useState < String > ();
  const [successMessage,
    setDataSuccessMessage] = React.useState < String > ();
  const [selectedData,
    setSelectedData] = React.useState < String > ("info");
  const [loading,
    setLoading] = React.useState(false);

  const [nickname,
    setNickname] = React.useState(props.user.nickname || "");
  const [userName,
    setUserName] = React.useState(props.user.userName || "");
  const [campus,
    setCampus] = React.useState(props.user?.campus || "");
  const [curso,
    setCurso] = React.useState(props.user?.curso || "");
  const [filteredCourses,
    setFilteredCourses] = React.useState < string[] > ([]);

  const [email,
    setEmail] = React.useState(props.user.email || "");

  const [password,
    setPassword] = React.useState("");
  const [novasenha,
    setNovasenha] = React.useState("");

  const [birthdaydata,
    setBirthdaydata] = React.useState(
    props.user?.birthdaydata || ""
  );

  const [gender,
    setGender] = React.useState(props.user?.gender || "");

  const [bio,
    setBio] = React.useState(props.user?.bio || "");

  const [responseAvatar,
    setResponseAvatar] = React.useState < string > ();
  const [avatarFile,
    setAvatarFile] = React.useState < File | null > (null);

  const [responseBanner,
    setResponseBanner] = React.useState < string > ();
  const [bannerFile,
    setBannerFile] = React.useState < File | null > (null);

  React.useEffect(() => {
    setNickname(props.user.nickname);
    setUserName(props.user.userName);
    setCampus(props.user.campus);
    setCurso(props.user.curso);
    setEmail(props.user.email);
    setPassword(props.user.password);
    setBirthdaydata(props.user.birthdaydata);
    setGender(props.user.gender);
    setBio(props.user.bio);
  }, [props.user]);

  function handleSelectedData(data: string) {
    setSelectedData(data);
  }

  React.useEffect(() => {
    setFilteredCourses(CURSOs[campus] || []);
  }, [campus]);

  const handleChangeInfo = async () => {
    try {
      setDataErrorMessage("");
      setDataSuccessMessage("");

      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("curso", curso);
      formData.append("campus", campus);
      formData.append("userName", userName);

      const endpoint = import.meta.env.VITE_CHANGE_NAME_CAMPUS_CURSO;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        setDataSuccessMessage("Dados atualizados com sucesso");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setDataErrorMessage(
          error.response.data.message || "Erro ao atualizar dados."
        );
      } else {
        setDataErrorMessage("Erro ao atualizar dados.");
      }
    }
  };

  const handleChangeEmail = async () => {
    try {
      setDataErrorMessage("");
      setDataSuccessMessage("");

      const formData = new FormData();
      formData.append("email", email);

      const endpoint = import.meta.env.VITE_CHANGE_EMAIL;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        setDataSuccessMessage("E-mail atualizado com sucesso");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setDataErrorMessage(
          error.response.data.message || "Erro ao atualizar e-mail."
        );
      } else {
        setDataErrorMessage("Erro ao atualizar e-mail.");
      }
    }
  };

  const handleChangePassword = async () => {
    try {
      setDataErrorMessage("");
      setDataSuccessMessage("");

      const formData = new FormData();
      formData.append("password", password);
      formData.append("novasenha", novasenha);

      const endpoint = import.meta.env.VITE_CHANGE_PASSWORD;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        setDataSuccessMessage("Senha atualizado com sucesso");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setDataErrorMessage(
          error.response.data.message || "Erro ao atualizar senha."
        );
      } else {
        setDataErrorMessage("Erro ao atualizar senha.");
      }
    }
  };

  const handleChangeBirthday = async () => {
    try {
      setDataErrorMessage("");
      setDataSuccessMessage("");

      const formData = new FormData();
      formData.append("birthdaydata", birthdaydata);

      const endpoint = import.meta.env.VITE_CHANGE_BIRTHDAY;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        setDataSuccessMessage("Nascimento atualizado com sucesso");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setDataErrorMessage(
          error.response.data.message || "Erro ao atualizar nascimento."
        );
      } else {
        setDataErrorMessage("Erro ao atualizar nascimento.");
      }
    }
  };

  const handleChangeGender = async () => {
    try {
      setDataErrorMessage("");
      setDataSuccessMessage("");

      const formData = new FormData();
      formData.append("gender", gender);

      const endpoint = import.meta.env.VITE_CHANGE_GENDER;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        setDataSuccessMessage("Gênero atualizado com sucesso");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setDataErrorMessage(
          error.response.data.message || "Erro ao atualizar gênero."
        );
      } else {
        setDataErrorMessage("Erro ao atualizar gênero.");
      }
    }
  };

  const handleChangeBio = async () => {
    try {
      setDataErrorMessage("");
      setDataSuccessMessage("");

      const formData = new FormData();
      formData.append("bio", bio);

      const endpoint = import.meta.env.VITE_CHANGE_BIO;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        setDataSuccessMessage("Bio atualizado com sucesso");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setDataErrorMessage(
          error.response.data.message || "Erro ao atualizar bio."
        );
      } else {
        setDataErrorMessage("Erro ao atualizar bio.");
      }
    }
  };

  const updateAvatar = async (event: React.BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (isValidImage(file)) {
      setAvatarFile(file);
      setDataErrorMessage("");
    } else {
      setDataErrorMessage(
        "Por favor, selecione uma imagem válida (JPEG, PNG ou GIF)."
      );
    }
  };

  const handleChangeAvatar = async () => {
    if (!avatarFile) {
      setDataErrorMessage("Nenhuma imagem selecionada.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    formData.append("token", `${localStorage.getItem("token")}`);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_UPDATE_PROFILE_PHOTO
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.updated) {
        setResponseAvatar(response.data.avatarURL);
        window.dispatchEvent(new Event("storage"));
        setDataSuccessMessage("Avatar atualizada com sucesso.");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setDataErrorMessage(
        error.response?.data.message || "Erro ao atualizar o avatar."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateBanner = async (event: React.BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (isValidImage(file)) {
      setBannerFile(file);
      setDataErrorMessage("");
    } else {
      setDataErrorMessage(
        "Por favor, selecione uma imagem válida (JPEG, PNG ou GIF)."
      );
    }
  };

  const handleChangeBanner = async () => {
    if (!bannerFile) {
      setDataErrorMessage("Nenhuma imagem selecionada.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("banner", bannerFile);
    formData.append("token", `${localStorage.getItem("token")}`);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_UPDATE_BANNER_PHOTO
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.updated) {
        setResponseBanner(response.data.avatarURL);
        window.dispatchEvent(new Event("storage"));
        setDataSuccessMessage("Banner atualizada com sucesso.");
      } else {
        setDataErrorMessage(response.data.message);
      }
    } catch (error: any) {
      setDataErrorMessage(
        error.response?.data.message || "Erro ao atualizar o banner."
      );
    } finally {
      setLoading(false);
    }
  };

  getStatusUser(userId)

  return (
    <React.Fragment>
      <Card className="mt-2 w-full md:w-6/12">
        <div className="relative w-full h-40">
          <img
          src={
          responseBanner
          ? responseBanner: props.user.banner
          ? props.user.banner: "https://img.freepik.com/fotos-premium/fundo-abstrato-da-lua-em-cores-esteticas-generative-ai_888418-6857.jpg?w=996"
          }
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
          />

        <div className="absolute bottom-[-30px] left-4">
          <Avatar className="h-20 w-20 shadow-lg border-4 border-border rounded-full">
            <AvatarFallback>{nickname}</AvatarFallback>
            <AvatarImage
              className="object-cover"
              src={responseAvatar ? responseAvatar: props.user.avatar ? props.user.avatar: UserIcon}
              />
          </Avatar>
        </div>
      </div>
      <CardHeader className="flex flex-row justify-between items-center mt-8">
        <div className="flex flex-col gap-1">
          <CardTitle className="font-medium text-sm md:text-sm">
            {props.user.userName ? props.user.userName: "Nome indisponível"}
          </CardTitle>

          <div className="flex flex-row items-center gap-1">
            <Badge variant={"outline"} className="font-light w-fit">
              <At className="h-2.5 w-2.5" />{" "}
              {props.user.nickname
              ? `${props.user.nickname}`: "indisponível"}
              <HeartWavesSolid
                className={`${
                props.user.type === "Plus"
                ? "text-info": props.user.type === "Admin"
                ? "text-danger": props.user.type === "Verified"
                ? "text-success": "hidden"
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
                <p>
                  Menu
                </p>
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
              {selectedData === "info" ? null: (
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

              {selectedData === "email" ? null: (
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

              {selectedData === "password" ? null: (
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

              {selectedData === "birthday" ? null: (
                <Button
                  variant={"ghost"}
                  className="justify-start w-full"
                  onClick={() => {
                    handleSelectedData("birthday");
                  }}
                  >
                  <CalendarSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Nascimento
                </Button>
              )}

              {selectedData === "gender" ? null: (
                <Button
                  variant={"ghost"}
                  className="justify-start w-full"
                  onClick={() => {
                    handleSelectedData("gender");
                  }}
                  >
                  {props.user.gender === "Feminino" ? (
                    <FemaleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  ): (
                    <MaleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  )}
                  Gênero
                </Button>
              )}

              {selectedData === "avatar" ? null: (
                <Button
                  variant={"ghost"}
                  className="justify-start w-full"
                  onClick={() => {
                    handleSelectedData("avatar");
                  }}
                  >
                  <ImageSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Avatar
                </Button>
              )}

              {selectedData === "banner" ? null: (
                <Button
                  variant={"ghost"}
                  className="justify-start w-full"
                  onClick={() => {
                    handleSelectedData("banner");
                  }}
                  >
                  <ImageRectangleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Banner
                </Button>
              )}

              {selectedData === "bio" ? null: (
                <Button
                  variant={"ghost"}
                  className="justify-start w-full"
                  onClick={() => {
                    handleSelectedData("bio");
                  }}
                  >
                  <PencilSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Bio
                </Button>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </CardHeader>

      <Separator />

      {selectedData === "info" && (
        <CardContent className="mt-4 space-y-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="userName">Nome Completo</Label>
            <Input
              value={userName}
              id="userName"
              onChange={(e: React.BaseSyntheticEvent) => {
                setUserName(e.target.value);
              }}
              />
          </div>

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
            <Select
              onValueChange={(value) => setCampus(value)}
              value={campus}
              >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha seu campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {IFs.map((campus, index) => (
                    <SelectItem key={index} value={campus}>
                      {campus}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="curso">Curso</Label>
            <Select onValueChange={(value) => setCurso(value)} value={curso}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha seu curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {filteredCourses.map((curso, index) => (
                    <SelectItem key={index} value={curso}>
                      {curso}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}

      {selectedData === "email" && (
        <CardContent className="mt-4 space-y-2">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="email">E-mail</Label>
            <Input
              value={email}
              id="email"
              onChange={(e: React.BaseSyntheticEvent) => {
                setEmail(e.target.value);
              }}
              />
          </div>
        </CardContent>
      )}

      {selectedData === "password" && (
        <CardContent className="mt-4 space-y-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="password">Senha atual</Label>
            <Input
              type="password"
              id="password"
              onChange={(e: React.BaseSyntheticEvent) => {
                setPassword(e.target.value);
              }}
              />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="novasenha">Nova senha</Label>
            <Input
              type="password"
              id="novasenha"
              onChange={(e: React.BaseSyntheticEvent) => {
                setNovasenha(e.target.value);
              }}
              />
          </div>
        </CardContent>
      )}

      {selectedData === "birthday" && (
        <CardContent className="mt-4 space-y-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="birthday">Nascimento</Label>
            <Input
              type="date"
              id="birthday"
              value={birthdaydata}
              onChange={(e: React.BaseSyntheticEvent) => {
                setBirthdaydata(e.target.value);
              }}
              />
          </div>
        </CardContent>
      )}

      {selectedData === "gender" && (
        <CardContent className="mt-4 space-y-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="gender">Gênero</Label>

            <Select onValueChange={(value) => setGender(value)} value={gender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha seu gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {GENDERs.map((gender, index) => (
                    <SelectItem key={index} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}

      {selectedData === "avatar" && (
        <CardContent className="mt-4">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/jpeg, image/png, image/gif"
              onChange={updateAvatar}
              />
          </div>
        </CardContent>
      )}

      {selectedData === "banner" && (
        <CardContent className="mt-4">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="banner">Banner</Label>
            <Input
              type="file"
              name="banner"
              id="banner"
              accept="image/jpeg, image/png, image/gif"
              onChange={updateBanner}
              />
          </div>
        </CardContent>
      )}

      {selectedData === "bio" && (
        <CardContent className="mt-4 space-y-2">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              value={bio}
              id="bio"
              placeholder="Adicione uma bio aqui..."
              onChange={(e: React.BaseSyntheticEvent) => {
                setBio(e.target.value);
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
            {successMessage}
          </CardDescription>
        ): errorMessage ? (
          <CardDescription className="text-danger flex flex-row items-center gap-2">
            <XSolid className="h-4 w-4" />
            {errorMessage}
          </CardDescription>
        ): null}

        {selectedData === "info" && (
          <Button
            onClick={handleChangeInfo}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar informações"}
          </Button>
        )}

        {selectedData === "email" && (
          <Button
            onClick={handleChangeEmail}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar informações"}
          </Button>
        )}

        {selectedData === "password" && (
          <Button
            onClick={handleChangePassword}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar senha"}
          </Button>
        )}

        {selectedData === "birthday" && (
          <Button
            onClick={handleChangeBirthday}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar nascimento"}
          </Button>
        )}

        {selectedData === "gender" && (
          <Button
            onClick={handleChangeGender}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar gênero"}
          </Button>
        )}

        {selectedData === "avatar" && (
          <Button
            onClick={handleChangeAvatar}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar foto"}
          </Button>
        )}

        {selectedData === "banner" && (
          <Button
            onClick={handleChangeBanner}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar banner"}
          </Button>
        )}

        {selectedData === "bio" && (
          <Button
            onClick={handleChangeBio}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar bio"}
          </Button>
        )}
      </CardFooter>
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
): (
<LoadingPage />
)}
</React.Fragment>
);
};

export default EditProfilePage;