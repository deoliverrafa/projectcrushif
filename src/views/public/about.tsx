import * as React from "react";
import { useParams } from "react-router-dom";

import { NavBarReturn } from "../../components/navbar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import {
  HeartWavesSolid,
  CalendarSolid,
  Hash,
  CampfireSolid,
  BookSolid,
  LabelSolid,
  CalendarMinusSolid,
  PencilSolid,
  MaleSolid,
  UserCircleSolid,
  FemaleSolid,
} from "@mynaui/icons-react";

import UserIcon from "../../../public/images/user.png"

import { getUserDataById } from "../../utils/getUserDataById";

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
  insertAt: string;
  bio: string;
  gender: string;
}

const AboutLayout = () => {
  const { id } = useParams<string>();
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(id);
        setViewingUser(data);
      } catch (error) {
        console.error("Error fetching viewing user data:", error);
      }
    };

    if (id) {
      fetchViewingUserData();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não disponível"; // Verifica se a data existe
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <React.Fragment>
      <Card className="select-none mt-2 w-full md:w-6/12">
        <CardHeader className="flex flex-col items-center gap-1.5">
          <Avatar className="border-2 border-border md:h-16 md:w-16">
            <AvatarFallback>
              {viewingUser?.nickname?.slice(0, 3) || "N/A"}{" "}
            </AvatarFallback>
            <AvatarImage className="object-cover" src={viewingUser?.avatar ? viewingUser?.avatar : UserIcon} />
          </Avatar>

          <div className="flex flex-row items-center gap-1">
            <CardDescription className="">
              {viewingUser?.nickname || "Usuário"}
            </CardDescription>

            <HeartWavesSolid
              className={`${
                viewingUser?.type === "Plus"
                  ? "text-info"
                  : viewingUser?.type === "Admin"
                  ? "text-danger"
                  : viewingUser?.type === "verified"
                  ? "text-success"
                  : "hidden"
              } h-3.5 w-3.5`}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-row items-center gap-1">
            <Hash />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">id</CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?._id ? `${viewingUser?._id}` : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <CalendarMinusSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Data de entrada
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.insertAt
                  ? formatDate(viewingUser?.insertAt ?? "")
                  : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <UserCircleSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Nome de usuário
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.nickname
                  ? `${viewingUser?.nickname}`
                  : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <HeartWavesSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Tipo
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.type ? `${viewingUser?.type}` : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <LabelSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Nome completo
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.userName
                  ? `${viewingUser?.userName}`
                  : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <CalendarSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Data de nascimento
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.birthdaydata
                  ? `${viewingUser?.birthdaydata}`
                  : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            {viewingUser?.gender === "Feminino" ? (
              <FemaleSolid />
            ) : (
              <MaleSolid />
            )}

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Gênero
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
              {viewingUser?.gender
                  ? `${viewingUser?.gender}`
                  : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <CampfireSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Campus
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.campus
                  ? `${viewingUser?.campus}`
                  : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <BookSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">
                Curso
              </CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.curso ? `${viewingUser?.curso}` : "indisponível"}
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <PencilSolid />

            <div className="flex flex-col">
              <CardDescription className="text-foreground">Bio</CardDescription>
              <CardDescription className="text-xs md:text-xs">
                {viewingUser?.bio ? `${viewingUser?.bio}` : "indisponível"}
              </CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const AboutPage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title="Sobre a conta" />

      <main className="flex flex-col justify-center items-center h-full w-full">
        <AboutLayout />
      </main>
    </React.Fragment>
  );
};

export default AboutPage;
