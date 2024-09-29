import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Avatar, Image, Divider } from "@nextui-org/react";

import {
  BadgeCheck,
  Heart,
  MessageCircleHeart,
  Share,
  Crown,
  UserRoundPlus,
} from "lucide-react";

import { getUserData } from "../../utils/getUserData.tsx";

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
  isFollowing?: boolean;
}

interface UserData {
  nickname: string;
  avatar: string;
  email: string;
}

export const CardPost = (props: CardProps) => {
  const [userData, setUserData] = React.useState<UserData>();
  const dataUser = getUserData();
  const [formattedData, setFormattedData] = React.useState("");

  const [liked, setLiked] = React.useState(false);
  const [showHeart, setShowHeart] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 500);
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_ID}${props.userId
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

  // Lógica para seguir usuário

  const [followFormData] = React.useState({
    userFollowId: props.userId,
    token: localStorage.getItem('token'),
  });

  const [unfollowFormData] = React.useState({
    unfollowId: props.userId,
    token: localStorage.getItem('token'),
  });

  const [isFollowing, setIsFollowing] = React.useState(props.isFollowing);

  const followUser = () => {
    if (!isFollowing) {
      axios
        .put(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_FOLLOW_USER
          }`,
          followFormData
        ).then(() => {
          setIsFollowing(true)
        })
    } else {
      axios
        .put(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_UNFOLLOW_USER
          }`,
          unfollowFormData
        ).then(() => {
          setIsFollowing(false)
        })
    }
  }

  const handleFollowSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    followUser();
  }

  return (
    <Card
      className="select-none my-2 w-full md:w-6/12"
      onDoubleClick={handleLike}
    >
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
          <div className="flex flex-col items-start justify-center space-y-1">
            <div className="flex flex-row items-center space-x-1">
              <div>
                <CardTitle className="font-inter font-bold tracking-light">
                  {!props.isAnonymous ? userData?.nickname : "Anônimo"}
                </CardTitle>
              </div>
              <div>
                <BadgeCheck className="text-green-500 dark:text-green-600 size-3.5" />
              </div>
            </div>
          </div>
        </Link>

        <form
          action=""
          method="put"
          onSubmit={handleFollowSubmit}>
          <Button
            variant={"default"}
            className="font-poppins font-semibold uppercase">
            <UserRoundPlus className="size-4 mr-2" />
            {isFollowing ? "Seguindo" : "Seguir"}
          </Button>
        </form>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex flex-col items-center justify-center">
          {props.photoURL && (
            <Carousel className="flex flex-col items-center my-2 relative">
              <CarouselContent>
                <CarouselItem>
                  <Image
                    className="object-cover w-full"
                    radius="lg"
                    src={props.photoURL}
                    alt="Imagem Post"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          )}

          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="animate-ping text-slate-500 dark:text-slate-400 fill-slate-500 dark:fill-slate-400 size-20" />
            </div>
          )}

          <div className="flex flex-row items-center h-full w-full">
            <CardDescription className="font-inter font-bold">
              <span className="text-slate-950 dark:text-slate-50">
                {!props.isAnonymous ? userData?.nickname : "anônimo"}:{" "}
              </span>
              {props.content || ""}{" "}
              {props.references !== "" && (
                <a
                  key={props._id}
                  className="text-pink-500 dark:text-pink-600 font-inter font-bold"
                  id={props._id}
                >
                  {props.references || ""}
                </a>
              )}
            </CardDescription>
          </div>
        </div>
      </CardContent>

      <Divider className="my-2" />

      <CardFooter className="flex-col justify-start items-start space-y-2">
        {formattedData && (
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row space-x-2">
              <Button variant={"outline"} size={"icon"} onClick={handleLike}>
                {liked ? (
                  <Heart className="text-pink-500 dark:text-pink-600 fill-pink-500 dark:fill-pink-600  size-4" />
                ) : (
                  <Heart className="size-4" />
                )}
              </Button>
              <Button variant={"outline"} size={"icon"}>
                <MessageCircleHeart className="size-4" />
              </Button>
            </div>

            <div className="flex flex-row space-x-2">
              <Button variant={"outline"} size="icon">
                <Share className="size-4" />
              </Button>

              <Button variant={"outline"} size={"icon"}>
                <Crown className="size-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center space-x-1">
            <Heart className="text-pink-500 dark:text-pink-600 size-4" />
            <CardDescription className="cursor-pointer font-inter text-tiny font-bold tracking-light">
              {0} curtidas
            </CardDescription>
          </div>

          <div className="flex flex-row items-center space-x-1">
            <div className="flex flex-row items-center space-x-1">
              <MessageCircleHeart className="text-yellow-500 dark:text-yellow-600 size-4" />
              <CardDescription className="cursor-pointer font-inter text-tiny font-bold tracking-light">
                {0} coméntarios
              </CardDescription>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-2 w-full">
          <div className="flex relative">
            <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
              <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
              <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
            </div>
            <Avatar
              className="font-inter uppercase"
              size="sm"
              name={dataUser.nickname}
              src={dataUser.avatar}
            />
          </div>

          <Input
            className="font-inter font-bold"
            type="text"
            placeholder="Adicione um coméntario..."
          />
        </div>

        {formattedData && (
          <CardDescription className="font-inter text-tiny font-semibold tracking-light">
            há {formattedData} atrás
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  );
};
