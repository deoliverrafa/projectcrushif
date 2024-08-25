import * as React from "react";
import { Link, useParams } from "react-router-dom";

import { Loading } from "../components/loading.component";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button.tsx";

import { Divider } from "@nextui-org/react";

import { getUserData } from "../utils/getUserData.tsx";
import { getUserDataById } from "../utils/getUserDataById.tsx";
import { handleShare } from "../controllers/shareProfile.ts";

import {
  PencilRuler,
  Share2,
  PenTool,
  Image,
  Film,
  SearchX,
  BadgeCheck,
  UserRoundPlus,
} from "lucide-react";

interface User {
  name: any;
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
  const { id } = useParams();

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
      <Card className="w-5/6 max-w-sm">
        <CardHeader className="justify-center items-center">
          <div className="flex relative">
            <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
              <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
              <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
            </div>

            <Avatar>
              <AvatarImage src={viewingUser.avatar} />
            </Avatar>
          </div>

          <div className="flex flex-row items-center">
            <CardTitle className="font-poppins font-light capitalize text-sm">
              {viewingUser.name ? viewingUser.name : "Nome indisponível"}
            </CardTitle>
          </div>

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
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-0.5">
            <CardDescription className="font-inter font-light tracking-wider text-tiny">
              {age ? `Idade: ${age} anos` : "Idade: indisponível"}
            </CardDescription>
            <CardDescription className="font-inter font-light tracking-wider text-tiny">
              {viewingUser.curso
                ? `Curso: ${viewingUser.curso}`
                : "Curso: indisponível"}
            </CardDescription>
            <CardDescription className="font-inter font-light tracking-wider text-tiny">
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
              onClick={() => handleShare(viewingUser.nickname, id)}
            >
              <Share2 className="size-4" />
            </Button>
          </div>

          <Divider />
          <div className="flex flex-row justify-evenly items-center h-8">
            <div className="flex flex-col justify-center items-center">
              <CardDescription>{viewingUser.Nfollowers}</CardDescription>
              <CardDescription>Seguidores</CardDescription>
            </div>
            <Divider orientation="vertical" />
            <div className="flex flex-col justify-center items-center">
              <CardDescription>{viewingUser.Nfollowing}</CardDescription>
              <CardDescription>Seguindo</CardDescription>
            </div>
          </div>
          <Divider />
          
          <div className="flex flex-row justify-around items-center">
              <div 
                variant="ghost" 
                className={`flex flex-row items-center p-1 space-x-1 ${selected === 'text' ? 'border-b-1 border-slate-500 dark:border-slate-400' : ''}`}
                onClick={() => handleSelect('text')}
              >
                    <CardDescription>Postagens</CardDescription>
                    <Badge variant="outline">0</Badge>
                </div>
                
                <div
                  className={`flex flex-row items-center p-1 space-x-1 ${selected === 'image' ? 'border-b-1 border-slate-500 dark:border-slate-400' : ''}`}
                  onClick={() => handleSelect('image')}
                >
                    <CardDescription>Imagens</CardDescription>
                    <Badge variant="outline">0</Badge>
                </div>
            </div>
        </CardContent>

        <CardFooter>
            <div className="flex flex-col justify-center items-center space-y-2">
                <SearchX className="text-slate-500 dark:text-slate-400 size-14" />
                <CardDescription className="text-default font-inter font-medium text-tiny text-center w-full">Usuário não possui nenhuma publicação de {selected === 'text' ? 'texto' : 'imagem'}.</CardDescription>
            </div>
        </CardFooter>
      </Card>
    </>
  );
};
