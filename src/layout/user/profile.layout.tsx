import * as React from "react";
import { Link, useParams } from "react-router-dom";

import { Loading } from "../../components/loading.component.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button.tsx";
import { Badge } from "../../components/ui/badge.tsx";

import { Divider, Avatar } from "@nextui-org/react";

import { getUserData } from "../../utils/getUserData.tsx";
import { getUserDataById } from "../../utils/getUserDataById.tsx";
import { handleShare } from "../../controllers/shareProfile.ts";

import {
  PencilRuler,
  Share2,
  SearchX,
  BadgeCheck,
  UserRoundPlus,
} from "lucide-react";

interface User {
  userName: string;
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  avatar: string;
  birthdaydata: string;
  Nfollowers: number;
  Nfollowing: number;
  curso: string;
  type: string;
}

export const ProfileLayout = () => {
  const currentUser = getUserData();
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);
  const [age, setAge] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState("text");
  const { id } = useParams<string>();

  console.log(viewingUser);

  const handleSelect = (item: string) => {
    setSelected(item);
  };

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  React.useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(id);
        setViewingUser(data);
        if (data && data.birthdaydata) {
          const calculatedAge = calculateAge(data.birthdaydata);
          setAge(calculatedAge);
        }
      } catch (error) {
        console.error("Error fetching viewing user data:", error);
      }
    };

    if (id) {
      fetchViewingUserData();
    }
  }, [id]);

  if (!currentUser || !viewingUser) {
    return <Loading />;
  }

  const isOwnProfile = currentUser._id === viewingUser._id;
  return (
    <>
      <Card className="w-full md:w-6/12">
        <CardHeader className="flex flex-row items-center space-x-4">
          <div className="flex relative">
            <div className="flex absolute right-0.5 bottom-0.5 h-3 w-3 z-10">
              <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
              <span className="bg-success rounded-full inline-flex relative h-3 w-3"></span>
            </div>
            <Avatar
              size="lg"
              name={viewingUser.nickname}
              src={viewingUser.avatar}
            />
          </div>

          <div className="flex flex-col w-5/6">
            <Divider />
            <div className="flex flex-row justify-evenly items-center h-12">
              <div className="cursor-pointer flex flex-col justify-center items-center">
                <CardDescription className="font-inter font-bold">
                  {viewingUser.Nfollowers}
                </CardDescription>
                <CardDescription className="font-inter font-bold">
                  Seguidores
                </CardDescription>
              </div>
              <Divider orientation="vertical" />
              <div className="cursor-pointer flex flex-col justify-center items-center">
                <CardDescription className="font-inter font-bold">
                  {viewingUser.Nfollowing}
                </CardDescription>
                <CardDescription className="font-inter font-bold">
                  Seguindo
                </CardDescription>
              </div>
            </div>
            <Divider />
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <CardTitle className="font-inter font-bold capitalize">
            {viewingUser.userName ? viewingUser.userName : "Nome indisponível"}
          </CardTitle>

          <div className="flex flex-row items-center space-x-1">
            <Badge variant={"outline"}>
              {viewingUser.nickname
                ? `@${viewingUser.nickname}`
                : "indisponível"}
            </Badge>

            <Badge variant={"outline"}>
              <BadgeCheck
                className={`${
                  viewingUser.type === "Plus"
                    ? "text-info"
                    : viewingUser.type === "Admin"
                    ? "text-danger"
                    : "text-success"
                } size-3`}
              />
            </Badge>
          </div>
          <div className="space-y-0.5">
            <CardDescription className="font-inter font-semibold tracking-wider text-tiny">
              {age ? `Idade: ${age} anos` : "Idade: indisponível"}
            </CardDescription>
            <CardDescription className="font-inter font-semibold tracking-wider text-tiny">
              {viewingUser.curso
                ? `Curso: ${viewingUser.curso}`
                : "Curso: indisponível"}
            </CardDescription>
            <CardDescription className="font-inter font-semibold tracking-wider text-tiny">
              {viewingUser.campus
                ? `Campus: ${viewingUser.campus}`
                : "Campus: indisponível"}
            </CardDescription>
          </div>

          <div className="flex flex-row justify-between items-center space-x-1">
            {isOwnProfile && (
              <Link
                className="flex justify-center items-center w-full"
                to="/profile/edit"
              >
                <Button
                  variant={"default"}
                  className="font-poppins font-semibold uppercase w-full"
                >
                  <PencilRuler className="mr-2 size-4" />
                  Editar
                </Button>
              </Link>
            )}

            {!isOwnProfile && (
              <Button
                variant={"default"}
                className="font-poppins font-semibold uppercase w-full"
              >
                <UserRoundPlus className="mr-2 size-4" />
                Seguir
              </Button>
            )}

            <Button
              variant={"default"}
              size="icon"
              // Usa sempre um valor padrão quando for assim, daí faz a manipulação se for um '' usuário inválido, ou sessão inativa
              onClick={() => handleShare(viewingUser.nickname, id ? id : "")}
            >
              <Share2 className="size-4" />
            </Button>
          </div>

          <div className="flex flex-row justify-around items-center">
            <div
              className={`cursor-pointer flex flex-row items-center p-1 space-x-1 ${
                selected === "text"
                  ? "border-b-1 border-slate-500 dark:border-slate-400"
                  : ""
              }`}
              onClick={() => handleSelect("text")}
            >
              <CardDescription className="font-inter font-bold">
                Postagens
              </CardDescription>
              <Badge variant="outline">0</Badge>
            </div>

            <div
              className={`cursor-pointer flex flex-row items-center p-1 space-x-1 ${
                selected === "image"
                  ? "border-b-1 border-slate-500 dark:border-slate-400"
                  : ""
              }`}
              onClick={() => handleSelect("image")}
            >
              <CardDescription className="font-inter font-bold">
                Imagens
              </CardDescription>
              <Badge variant="outline">0</Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter className="space-y-2">
          <div className="flex flex-col justify-center items-center space-y-2 w-full">
            <SearchX className="text-slate-500 dark:text-slate-400 size-14" />
            <CardDescription className="text-default font-inter font-medium text-tiny text-center w-full">
              Usuário não possui nenhuma publicação de{" "}
              {selected === "text" ? "texto" : "imagem"}.
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
