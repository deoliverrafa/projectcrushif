import * as React from "react";
import axios from "axios";
import {
  Link
} from "react-router-dom";
import {
  Toaster
} from "../../components/ui/toaster.tsx"
import {
  useToast
} from "../../hooks/use-toast.ts"

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
  Separator
} from "../../components/ui/separator.tsx";
import {
  Input
} from "../../components/ui/input.tsx";
import {
  Label
} from "../../components/ui/label.tsx";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
  DropdownSeparator
} from "../../components/ui/dropdown.tsx";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter
} from "../../components/ui/dialog.tsx"
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
  InfoCircleSolid,
  LockPasswordSolid,
  DotsVerticalSolid,
  SignalSolid,
  CheckSquareOneSolid,
  BrandInstagramSolid,
  BrandFacebookSolid,
  BrandXSolid,
  UploadSolid
} from "@mynaui/icons-react";

import UserIcon from "../../../public/images/user.png"

import {
  getUserData
} from "../../utils/getUserData.tsx";
import {
  getUserDataById
} from "../../utils/getUserDataById.tsx";
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
import {
  User
} from "../../interfaces/userInterface.ts";

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
  link: string;
  instagram: string;
  facebook: string;
  twitter: string;
  likedBy: string[];
  following: string[];
}

interface userData {
  user: User;
}

const GENDERs = ["Masculino", "Feminino"];

const EditProfileLayout = (props: userData) => {
  const currentUser = getUserData();
  const [userId] = React.useState < string | null > (
    localStorage.getItem("userId")
  );

  const {
    toast
  } = useToast()

  const [selectedData,
    setSelectedData] = React.useState < String > ("info");
  const [loading,
    setLoading] = React.useState(false);

  const [nicknameLength,
    setNicknameLength] = React.useState < number > (0);
  const [userNameLength,
    setUserNameLength] = React.useState < number > (0);
  const [bioLength,
    setBioLength] = React.useState < number > (0);

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} às ${currentDate.toLocaleTimeString()}`;

  const [showFullBio,
    setShowFullBio] = React.useState(false);
  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

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
  const [birthdaydata,
    setBirthdaydata] = React.useState(
    props.user?.birthdaydata || ""
  );
  const [gender,
    setGender] = React.useState(props.user?.gender || "");
  const [bio,
    setBio] = React.useState(props.user?.bio || "");

  const [password,
    setPassword] = React.useState("");
  const [novasenha,
    setNovasenha] = React.useState("");

  const [link,
    setLink] = React.useState(props.user.link || "");
  const [instagram,
    setInstagram] = React.useState(props.user.instagram || "");
  const [facebook,
    setFacebook] = React.useState(props.user.facebook || "");
  const [twitter,
    setTwitter] = React.useState(props.user.twitter || "");

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
    setPassword(props.user.password);
    setBirthdaydata(props.user.birthdaydata);
    setGender(props.user.gender);
    setBio(props.user.bio);
    setLink(props.user.link);
    setInstagram(props.user.instagram);
    setFacebook(props.user.facebook);
    setTwitter(props.user.twitter);
  }, [props.user]);

  function handleSelectedData(data: string) {
    setSelectedData(data);
  }

  React.useEffect(() => {
    setFilteredCourses(CURSOs[campus] || []);
  }, [campus]);

  const handleChangeInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("curso", curso);
      formData.append("campus", campus);
      formData.append("userName", userName);
      formData.append("birthdaydata", birthdaydata);
      formData.append("gender", gender);
      formData.append("bio", bio);

      const endpoint = import.meta.env.VITE_CHANGE_INFO;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        toast( {
          variant: "success",
          title: "Notificação",
          description: `Dados atualizados com sucesso, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${response.data.message}, ${formattedDate}`,
        })
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${error.response?.data.message || "Erro ao atualizar o dados"}, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `Erro ao atualizar dados, ${formattedDate}`,
        })
      }
    }
  };

  const handleChangePassword = async () => {
    try {
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
        toast( {
          variant: "success",
          title: "Notificação",
          description: `Senha atualizado com sucesso, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${response.data.message}, ${formattedDate}`,
        })
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${error.response?.data.message || "Erro ao atualizar senha"}, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `Erro ao atualizar senha, ${formattedDate}`,
        })
      }
    }
  };

  const handleChangeLink = async () => {
    try {
      const formData = new FormData();
      formData.append("link", link);
      formData.append("instagram", instagram);
      formData.append("facebook", facebook);
      formData.append("twitter", twitter);

      const endpoint = import.meta.env.VITE_CHANGE_LINK;

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}${localStorage.getItem(
          "token"
        )}`,
        formData
      );

      if (response.data.updated) {
        toast( {
          variant: "success",
          title: "Notificação",
          description: `Links atualizados com sucesso, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${response.data.message}, ${formattedDate}`,
        })
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${error.response?.data.message || "Erro ao atualizar links"}, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `Erro ao atualizar links, ${formattedDate}`,
        })
      }
    }
  };

  const updateAvatar = async (event: React.BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (isValidImage(file)) {
      setAvatarFile(file);
    } else {
      toast( {
        variant: "danger",
        title: "Notificação",
        description: `Por favor, selecione uma imagem válida (JPEG, PNG ou GIF), ${formattedDate}`,
      })
    }
  };

  const handleChangeAvatar = async () => {
    if (!avatarFile) {
      toast( {
        variant: "danger",
        title: "Notificação",
        description: `Nenhuma imagem selecionada, ${formattedDate}`,
      })
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
        toast( {
          variant: "success",
          title: "Notificação",
          description: `Avatar atualizada com sucesso, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${response.data.message}, ${formattedDate}`,
        })
      }
    } catch (error: any) {
      toast( {
        variant: "danger",
        title: "Notificação",
        description: `${error.response?.data.message || "Erro ao atualizar o avatar"}, ${formattedDate}`,
      })
    } finally {
      setLoading(false);
    }
  };

  const updateBanner = async (event: React.BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (isValidImage(file)) {
      setBannerFile(file);
    } else {
      toast( {
        variant: "danger",
        title: "Notificação",
        description: `Por favor, selecione uma imagem válida (JPEG, PNG ou GIF), ${formattedDate}`,
      })
    }
  };

  const handleChangeBanner = async () => {
    if (!bannerFile) {
      toast( {
        variant: "danger",
        title: "Notificação",
        description: `Nenhuma imagem selecionada, ${formattedDate}`,
      })
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
        toast( {
          variant: "success",
          title: "Notificação",
          description: `Banner atualizada com sucesso, ${formattedDate}`,
        })
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `${response.data.message}, ${formattedDate}`,
        })
      }
    } catch (error: any) {
      toast( {
        variant: "danger",
        title: "Notificação",
        description: `${error.response?.data.message || "Erro ao atualizar o banner"}, ${formattedDate}`,
      })
    } finally {
      setLoading(false);
    }
  };

  const [likedByUsers,
    setLikedByUsers] = React.useState < User[] > ([]);

  const isUserFollowed = (user: User) => {
    return currentUser?.following?.includes(user._id);
  };

  const fetchLikedByUsers = async () => {
    if (props.user?.likedBy?.length) {
      try {
        const userIds = props.user.likedBy.slice(0, 3);
        const userPromises = userIds.map((id) => getUserDataById(id));
        const users = await Promise.all(userPromises);

        const filteredUsers = users.filter(
          (user) => user._id !== currentUser?._id && isUserFollowed(user)
        );

        setLikedByUsers(filteredUsers);
      } catch (error) {
        console.error("Erro ao buscar dados dos curtidores:", error);
      }
    }
  };

  React.useEffect(() => {
    fetchLikedByUsers();
  }, [props.user?.likedBy]);

  getStatusUser(userId)

  const MenuNavbar = () => {
    return (
      <React.Fragment>
        <Dropdown>
          <DropdownTrigger>
            <DotsVerticalSolid className="h-8 w-8" />
          </DropdownTrigger>

          <DropdownContent>
            <DropdownLabel>
              Menu
            </DropdownLabel>

            {selectedData === "info" ? null: (
              <DropdownItem
                className="justify-start items-center w-full px-4"
                onClick={() => {
                  handleSelectedData("info");
                }}
                >
                <InfoCircleSolid className="h-5 w-5 mr-2" />
                Informações
              </DropdownItem>
            )}

            {selectedData === "password" ? null: (
              <DropdownItem
                className="justify-start items-center w-full px-4"
                onClick={() => {
                  handleSelectedData("password");
                }}
                >
                <LockPasswordSolid className="h-5 w-5 mr-2" />
                Senhas
              </DropdownItem>
            )}

            {selectedData === "links" ? null: (
              <DropdownItem
                className="justify-start items-center w-full px-4"
                onClick={() => {
                  handleSelectedData("links");
                }}
                >
                <SignalSolid className="h-5 w-5 mr-2" />
                Links
              </DropdownItem>
            )}
          </DropdownContent>
        </Dropdown>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <NavBarReturn title="Editar perfil" menu={<MenuNavbar />} />

      <Card className="mt-2 w-full md:w-6/12">
        <div className="relative flex justify-center items-center w-full h-40">
          <img
          src={
          responseBanner
          ? responseBanner: props.user.banner
          ? props.user.banner: "https://img.freepik.com/fotos-premium/fundo-abstrato-da-lua-em-cores-esteticas-generative-ai_888418-6857.jpg?w=996"
          }
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
          />

        <Dialog>
          <DialogTrigger>
            <Button variant={"outline"} size={"icon"}>
              <UploadSolid />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload imagem banner</DialogTitle>
              <DialogDescription>
                Upload da imagem do banner. Use o botão de fechar para
                retornar à visualização anterior.
              </DialogDescription>
            </DialogHeader>

            <div className="relative flex justify-center items-center">
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
            </div>

            <DialogFooter>
              <Button
                onClick={handleChangeBanner}
                disabled={loading}
                variant={"success"}
                >
                {loading ? "Salvando...": "Salvar banner"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="absolute flex justify-center items-center bottom-[-30px] left-4">
          <Avatar className="h-20 w-20 shadow-lg border-4 border-border rounded-full">
            <AvatarFallback>{nickname}</AvatarFallback>
            <AvatarImage
              className="object-cover"
              src={responseAvatar ? responseAvatar: props.user.avatar ? props.user.avatar: UserIcon}
              />
          </Avatar>

          <Dialog>
            <DialogTrigger className="absolute bottom-0 right-0">
              <Button className="h-8 w-8 rounded-full" variant={"outline"} size={"icon"}>
                <UploadSolid className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload imagem avatar</DialogTitle>
                <DialogDescription>
                  Upload da imagem do avatar. Use o botão de fechar para
                  retornar à visualização anterior.
                </DialogDescription>
              </DialogHeader>

              <div className="relative flex justify-center items-center">
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
              </div>

              <DialogFooter>
                <Button
                  onClick={handleChangeAvatar}
                  disabled={loading}
                  variant={"success"}
                  >
                  {loading ? "Salvando...": "Salvar avatar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <CardHeader className="flex flex-row justify-between items-center mt-8">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full my-0.5">
            <CardDescription className="flex flex-row items-center text-foreground font-bold md:font-semibold text-sm md:text-sm truncate max-w-72">
              <At className="h-4 w-4" />
              {props.user.nickname
              ? `${props.user.nickname}`: "indisponível"}
            </CardDescription>

            <Badge variant={"outline"} className="text-muted-foreground w-fit">
              {props.user.type}
              <HeartWavesSolid
                className={`${
                props.user.type === "Plus"
                ? "text-info": props.user.type === "Admin"
                ? "text-danger": props.user.type === "Verified"
                ? "text-success": "hidden"
                } ml-1 h-3.5 w-3.5`}
                />
            </Badge>
          </div>

          <CardTitle className="my-0.5 text-foreground truncate max-w-72">
            {props.user.userName
            ? props.user.userName: "Nome indisponível"}
          </CardTitle>

          {props.user.bio && (
            <div className="my-0.5">
              <CardDescription className="text-foreground text-xs md:text-xs break-words">
                {props.user.bio ? (
                  <>
                    {showFullBio ? (
                      props.user.bio
                    ): (
                      `${props.user.bio.slice(0, 50)}${props.user.bio.length > 50 ? "": ""}`
                    )}
                    {props.user.bio.length > 50 && (
                      <span
                        onClick={toggleBio}
                        className="text-muted-foreground tracking-tight font-normal md:font-light cursor-pointer"
                        >
                        {showFullBio ? " ...ver menos": " ...ver mais"}
                      </span>
                    )}
                  </>
                ): (
                  <></>
                )}
              </CardDescription>
            </div>
          )}

          {props.user.link && (
            <div className="flex flex-row justify-start items-center my-0.5">
              <Link
                className="text-primary font-bold md:font-semibold underline text-xs md:text-xs truncate max-w-72"
                to={props.user.link}
                target="_blank"
                rel="noopener noreferrer"
                >
                {props.user.link}
              </Link>
            </div>
          )}

          <div className={`flex flex-row justify-start gap-2 items-center my-0.5 ${!props.user.instagram && !props.user.facebook && !props.user.twitter ? "hidden": ""}`}>
            {props.user.instagram && (
              <Link
                className="text-primary font-bold md:font-semibold underline text-xs md:text-xs truncate max-w-72"
                to={props.user.instagram}
                target="_blank"
                rel="noopener noreferrer"
                >
                <Button variant={"outline"} size={"icon"}>
                  <BrandInstagramSolid />
                </Button>
              </Link>
            )}

            {props.user.facebook && (
              <Link
                className="text-primary font-bold md:font-semibold underline text-xs md:text-xs truncate max-w-72"
                to={props.user.facebook}
                target="_blank"
                rel="noopener noreferrer"
                >
                <Button variant={"outline"} size={"icon"}>
                  <BrandFacebookSolid />
                </Button>
              </Link>
            )}

            {props.user.twitter && (
              <Link
                className="text-primary font-bold md:font-semibold underline text-xs md:text-xs truncate max-w-72"
                to={props.user.twitter}
                target="_blank"
                rel="noopener noreferrer"
                >
                <Button variant={"outline"} size={"icon"}>
                  <BrandXSolid />
                </Button>
              </Link>
            )}
          </div>

          <div className="flex flex-row justify-start items-center my-0.5">
            {Array.isArray(likedByUsers) && likedByUsers.length > 0 ? (
              <Link to={`/likedBy/${props.user._id}`} className="flex flex-row items-center gap-1 w-fit">
                <div className="flex -space-x-3 *:ring *:ring-background">
                  {likedByUsers.map((friend, index) => (
                    <Avatar key={`${friend._id}-${index}`} className="h-6 w-6 shadow-lg border border-border">
                      <AvatarFallback>
                        {friend.nickname ? friend.nickname.slice(0, 2): ""}
                      </AvatarFallback>
                      <AvatarImage
                        className="object-cover"
                        src={friend.avatar ? friend.avatar: UserIcon}
                        />
                    </Avatar>
                  ))}
                </div>

                <CardDescription className="text-xs md:text-xs">
                  Curtido(a) por{" "}
                  {likedByUsers.map((friend, index) => (
                    <span key={`${friend._id}-${index}`} className="text-foreground">
                      {friend.nickname}
                      {index < likedByUsers.length - 1 ? ", ": ""}
                    </span>
                  ))}{" "}
                  {props.user.likedBy.length - likedByUsers.length > 0 && (
                    <>
                      e {props.user.likedBy.length - likedByUsers.length > 1
                      ? "outras": "outra"}{" "}
                      <span className="text-foreground">
                        {props.user.likedBy.length - likedByUsers.length}{" "}
                        {props.user.likedBy.length - likedByUsers.length > 1
                        ? "pessoas": "pessoa"}
                      </span>
                    </>
                  )}
                </CardDescription>
              </Link>
            ): (
              <Link to={`/likedByPost/${props.user._id}`} className="w-fit">
                <CardDescription className="text-xs md:text-xs">
                  Curtido(a) por{" "}
                  <span className="text-foreground">
                    {props.user.likedBy.length}{" "}
                    {props.user.likedBy.length > 1 ? "pessoas": "pessoa"}
                  </span>
                </CardDescription>
              </Link>
            )}
          </div>
        </div>
      </CardHeader>

      <Separator />

      {selectedData === "info" && (
        <CardContent className="mt-4 space-y-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="userName">Nome Completo</Label>
            <Input
              value={userName}
              placeholder="Infome seu nome"
              id="userName"
              maxLength={72}
              onChange={(e: React.BaseSyntheticEvent) => {
                setUserName(e.target.value);
                setUserNameLength(e.target.value.length);
              }}
              />
            <CardDescription className="ms-2 text-muted-foreground/60 text-xs md:text-xs">{72 - userNameLength} caracteres restantes</CardDescription>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="nickname">Usuário</Label>
            <Input
              value={nickname}
              placeholder="Informe seu usuário"
              id="nickname"
              maxLength={18}
              onChange={(e: React.BaseSyntheticEvent) => {
                setNickname(e.target.value);
                setNicknameLength(e.target.value.length);
              }}
              />
            <CardDescription className="ms-2 text-muted-foreground/60 text-xs md:text-xs">{18 - nicknameLength} caracteres restantes</CardDescription>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="birthday">Nascimento</Label>
            <Input
              type="date"
              id="birthday"
              value={birthdaydata}
              max={new Date().toISOString().split('T')[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              .toISOString()
              .split('T')[0]}
              onChange={(e: React.BaseSyntheticEvent) => {
                setBirthdaydata(e.target.value);
              }}
              />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="gender">Gênero</Label>

            <Select onValueChange={(value) => setGender(value)} value={gender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Informe seu gênero" />
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

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              value={bio}
              id="bio"
              placeholder="Informe sua bio"
              maxLength={100}
              onChange={(e: React.BaseSyntheticEvent) => {
                setBio(e.target.value);
                setBioLength(e.target.value.length)
              }}
              />
            <CardDescription className="ms-2 text-muted-foreground/60 text-xs md:text-xs">{100 - bioLength} caracteres restantes</CardDescription>
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

      {selectedData === "links" && (
        <CardContent className="mt-4 space-y-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="link">Link</Label>
            <Input
              value={link}
              type="text"
              id="link"
              placeholder="https://seulink.com/"
              onChange={(e: React.BaseSyntheticEvent) => {
                setLink(e.target.value);
              }}
              />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              value={instagram}
              type="text"
              id="instagram"
              placeholder="https://instagram.com/profile/"
              onChange={(e: React.BaseSyntheticEvent) => {
                setInstagram(e.target.value);
              }}
              />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              value={facebook}
              type="text"
              id="facebook"
              placeholder="https://facebook.com/profile/"
              onChange={(e: React.BaseSyntheticEvent) => {
                setFacebook(e.target.value);
              }}
              />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              value={twitter}
              type="text"
              id="twitter"
              placeholder="https://twitter.com/profile/"
              onChange={(e: React.BaseSyntheticEvent) => {
                setTwitter(e.target.value);
              }}
              />
          </div>
        </CardContent>
      )}

      <Separator />

      <CardFooter className="flex flex-col items-end space-y-2 mt-4">
        {selectedData === "info" && (
          <Button
            onClick={handleChangeInfo}
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

        {selectedData === "links" && (
          <Button
            onClick={handleChangeLink}
            disabled={loading}
            variant={"success"}
            >
            {loading ? "Salvando...": "Salvar links"}
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
{userData ? (
<main className="flex flex-col justify-center items-center h-full w-full">
<EditProfileLayout user={userData} />
<Toaster />
</main>
): (
<LoadingPage />
)}
</React.Fragment>
);
};

export default EditProfilePage;