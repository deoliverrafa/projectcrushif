import { Link } from "react-router-dom";

import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { Avatar } from "@nextui-org/react";

import {
  BadgeCheck,
  Share2,
  Crown,
  UserRoundPlus,
  Siren,
  CircleX,
} from "lucide-react";

interface CardProps {
  _id: string | undefined;
  id: string | undefined;
  nickname: string | undefined;
  userName: string | undefined;
  userAvatar: string | undefined;
  formattedData?: string;
  isAnonymous: boolean;
  type?: string;
}

export const DrawerPost = (props: CardProps) => {
  return (
    <DrawerContent>
      <DrawerHeader>
        <div className="flex flex-col justify-center mx-auto w-full max-w-sm">
          <DrawerTitle className="font-recursive uppercase tracking-widest">
            Publicação
          </DrawerTitle>
          <DrawerDescription>
            Publicação expandida do usuário @{props.nickname}.
          </DrawerDescription>
        </div>
      </DrawerHeader>

      <div className="flex flex-col justify-center space-y-4 mx-auto w-full max-w-sm">
        <div className="flex flex-col justify-center items-center mx-auto w-full max-w-sm">
          <Link
            to={`/profile/${props.id}`}
            className="flex flex-col justify-center items-center space-y-2"
          >
            <Avatar className="w-20 h-20 text-large" src={props.userAvatar} />

            <div className="flex flex-row items-center">
              <Badge
                variant={"outline"}
                className="font-poppins font-light capitalize text-sm"
              >
                {props.userName ? props.userName : "Nome indisponível"}
              </Badge>
            </div>

            <div className="flex flex-row items-center space-x-1">
              <Badge variant={"outline"}>
                {props.nickname ? `@${props.nickname}` : "indisponível"}
              </Badge>

              <Badge variant={"outline"}>
                <BadgeCheck
                  className={`${
                    props.type === "Plus"
                      ? "text-info"
                      : props.type === "Admin"
                      ? "text-danger"
                      : "text-success"
                  } size-3`}
                />
              </Badge>
            </div>

            <Badge variant={"outline"} className="relative space-x-1">
              <div className="flex absolute left-0.5 mx-0.5 h-2 w-2 z-10">
                <span className="animate-ping bg-green-500 dark:bg-green-600 rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span className="bg-green-500 dark:bg-green-600 rounded-full inline-flex relative h-2 w-2"></span>
              </div>
              <DrawerDescription className="font-light">
                online
              </DrawerDescription>
            </Badge>
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center md:items-start mx-auto w-full max-w-sm">
          <DrawerTitle className="font-recursive uppercase tracking-widest">
            Opções
          </DrawerTitle>
          <DrawerDescription>
            Interações com a publicação do @{props.nickname}.
          </DrawerDescription>

          <div className="flex flex-col items-center my-2 space-y-2 w-full">
            <Button variant={"outline"} className="w-full">
              <UserRoundPlus className="size-4 mr-2" />
              Seguir
            </Button>
            <Button variant={"outline"} className="w-full">
              <Share2 className="size-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant={"outline"} className="w-full">
              <Crown className="size-4 mr-2" />
              Favoritar
            </Button>
            <Button variant={"destructive"} className="w-full">
              <Siren className="size-4 mr-2" />
              Denunciar
            </Button>
            <Button variant={"destructive"} className="w-full">
              <CircleX className="size-4 mr-2" />
              Bloquear
            </Button>
          </div>
        </div>
      </div>
    </DrawerContent>
  );
};
