import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { DrawerPost } from "../user/drawerPost.component";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";

import { Avatar, Image, Divider } from "@nextui-org/react";

import {
  BadgeCheck,
  Heart,
  MessageCircleHeart,
  Share,
  Expand,
  UserRoundPlus,
} from "lucide-react";

// import { getUserData } from './../utils/getUserData.tsx';

interface CardProps {
  className?: string;
  userId?: string;
  _id?: string;
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL?: string;
  userAvatar?: string;
  insertAt?: string;
  id?: string;
}

interface UserData {
  nickname: string;
  avatar: string;
  email: string;
}

export const CardPost = (props: CardProps) => {
  const [userData, setUserData] = useState<UserData>();
  const [formattedData, setFormattedData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_ID}${
            props.userId
          }`
        );

        setUserData(response.data.userFinded);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUserData({
          nickname: "Deletado",
          avatar: "",
          email: "Deletado",
        });
      }
    };

    fetchUserData();

    if (props.insertAt) {
      const parsedDate = parseISO(props.insertAt);
      setFormattedData(formatDistanceToNow(parsedDate, { locale: ptBR }));
    }
  }, [props.userId, props.insertAt]);

  return (
    <Card className="my-2 w-full md:w-6/12">
      <CardHeader className="flex flex-row justify-between items-center">
        <Link to={`/profile/${props.id}`} className="flex space-x-2">
          <div className="flex relative">
            <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
              <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
              <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
            </div>
            <Avatar
              as="button"
              className="font-poppins uppercase"
              size="sm"
              name={!props.isAnonymous ? userData?.nickname : ""}
              src={!props.isAnonymous ? userData?.avatar : ""}
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex flex-row items-center space-x-1">
              <div>
                <CardDescription className="text-tiny font-semibold leading-none">
                  {!props.isAnonymous ? userData?.nickname : "Anônimo"}
                </CardDescription>
              </div>
              <div>
                <BadgeCheck className="text-success size-3" />
              </div>
            </div>
            {formattedData && (
              <CardDescription className="text-tiny tracking-light">
                há {formattedData} atrás.
              </CardDescription>
            )}
          </div>
        </Link>

        <Button className="font-poppins font-semibold uppercase">
          <UserRoundPlus className="size-4 mr-2" />
          Seguir
        </Button>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex flex-col">
          {props.photoURL && (
            <Carousel className="flex flex-col items-center">
              <CarouselContent>
                <CarouselItem>
                  <Image
                    className="object-cover my-3 w-full"
                    radius="lg"
                    src={props.photoURL}
                    alt="Imagem Post"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden" />
              <CarouselNext className="hidden" />
            </Carousel>
          )}

          <div className="flex flex-row items-center h-full w-full">
            <CardDescription className="font-semibold">
              {!props.isAnonymous ? userData?.nickname : "anônimo"}:{" "}
              {props.content || ""}
            </CardDescription>
          </div>
          {props.references !== "" && (
            <div className="flex flex-row items-center my-0.5 space-x-1 w-full">
              <CardDescription
                key={props._id}
                className="text-pink-500 dark:text-pink-600 font-semibold"
                id={props._id}
              >
                {props.references}
              </CardDescription>
            </div>
          )}
        </div>
      </CardContent>

      <Divider className="my-2" />

      <CardFooter className="flex-col justify-start items-start">
        {formattedData && (
          <div className="flex flex-row justify-between items-center pt-2 w-full">
            <div className="flex flex-row space-x-1">
              <Button variant={"outline"} className="w-full">
                <Heart className="text-slate-500 dark:text-slate-400 size-4 mr-2" />
                <CardDescription className="font-semibold">0</CardDescription>
              </Button>
              <Button variant={"outline"} className="w-full">
                <MessageCircleHeart className="text-slate-500 dark:text-slate-400 size-4 mr-2" />
                <CardDescription className="font-semibold">0</CardDescription>
              </Button>
            </div>

            <div className="flex flex-row space-x-1">
              <Button variant={"outline"} size="icon">
                <Share className="size-4" />
              </Button>
              <Drawer>
                <DrawerTrigger className="">
                  <Button variant={"outline"} size={"icon"}>
                    <Expand className="size-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerPost
                  _id={props._id}
                  id={props.id}
                  nickname={!props.isAnonymous ? userData?.nickname : "Anônimo"}
                  userAvatar={!props.isAnonymous ? userData?.avatar : ""}
                  formattedData={formattedData}
                  isAnonymous={props.isAnonymous}
                  userName={undefined}
                />
              </Drawer>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
