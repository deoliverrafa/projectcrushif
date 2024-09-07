import * as React from "react";
import { Link, useParams } from "react-router-dom";

import { NavBarReturn } from "../navbar.layout.tsx";

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

import { PencilRuler, SearchX, BadgeCheck, UserRoundPlus } from "lucide-react";

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
  const { id } = useParams<string>();

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
      <NavBarReturn
        title={"Perfil"}
        profile={true}
        id={viewingUser._id}
        avatar={viewingUser.avatar}
        name={viewingUser.nickname}
        isOwnProfile={isOwnProfile}
      />

      <Card className="w-full md:w-10/12">
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
                <CardDescription className="font-inter font-bold text-tiny">
                  {0}
                </CardDescription>
                <CardDescription className="font-inter font-bold tracking-widest text-tiny">
                  Postagens
                </CardDescription>
              </div>
              <Divider orientation="vertical" />
              <div className="cursor-pointer flex flex-col justify-center items-center">
                <CardDescription className="font-inter font-bold text-tiny">
                  {viewingUser.Nfollowers}
                </CardDescription>
                <CardDescription className="font-inter font-bold tracking-widest text-tiny">
                  Seguidores
                </CardDescription>
              </div>
              <Divider orientation="vertical" />
              <div className="cursor-pointer flex flex-col justify-center items-center">
                <CardDescription className="font-inter font-bold text-tiny">
                  {viewingUser.Nfollowing}
                </CardDescription>
                <CardDescription className="font-inter font-bold tracking-widest text-tiny">
                  Seguindo
                </CardDescription>
              </div>
            </div>
            <Divider />
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <CardTitle className="font-inter font-bold capitalize text-sm">
            {viewingUser.userName ? viewingUser.userName : "Nome indisponível"}
          </CardTitle>

          <Badge variant={"secondary"}>
            {viewingUser.nickname ? `@${viewingUser.nickname}` : "indisponível"}

            <BadgeCheck
              className={`${
                viewingUser.type === "Plus"
                  ? "text-info"
                  : viewingUser.type === "Admin"
                  ? "text-danger"
                  : "text-success"
              } ml-1 size-3`}
            />
          </Badge>

          <div className="space-y-0.5">
            <CardDescription className="font-inter text-tiny font-semibold tracking-wider">
              {age ? `Idade: ${age} anos` : "Idade: indisponível"}
            </CardDescription>
            <CardDescription className="font-inter text-tiny font-semibold tracking-wider">
              {viewingUser.curso
                ? `Curso: ${viewingUser.curso}`
                : "Curso: indisponível"}
            </CardDescription>
            <CardDescription className="font-inter text-tiny font-semibold tracking-wider">
              {viewingUser.campus
                ? `Campus: ${viewingUser.campus}`
                : "Campus: indisponível"}
            </CardDescription>
          </div>

          <div className="flex flex-row justify-center items-center space-x-1">
            {isOwnProfile && (
              <Link
                className="flex justify-center items-center w-full"
                to="/profile/edit"
              >
                <Button
                  variant={"secondary"}
                  className="font-poppins font-semibold uppercase w-full"
                >
                  <PencilRuler className="mr-2 size-4" />
                  Editar
                </Button>
              </Link>
            )}

            {!isOwnProfile && (
              <Button
                variant={"secondary"}
                className="font-poppins font-semibold uppercase w-full"
              >
                <UserRoundPlus className="mr-2 size-4" />
                Seguir
              </Button>
            )}
          </div>
        </CardContent>

        <CardFooter className="space-y-2">
          <div className="flex flex-col justify-center items-center space-y-2 w-full">
            <SearchX className="text-slate-500 dark:text-slate-400 size-14" />
            <CardDescription className="font-inter font-bold text-center w-full">
              Usuário não possui nenhuma publicação.
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
