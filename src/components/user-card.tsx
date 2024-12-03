import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button.js";
import { Card, CardDescription, CardTitle } from "./ui/card.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js";

import { ChevronRight, HeartWavesSolid } from "@mynaui/icons-react";

import UserIcon from "../../public/images/user.png";
import { toggleFollow } from "../utils/followUtils.js";

interface User {
  avatar: string;
  nickname?: string;
  userName?: string;
  type: string;
  _id: string;
  link?: string;
  following?: boolean;
  description?: string;
  status?: string;
  onClick?: () => void;
  onFollowToggle?: () => void;
}

export const SearchUserCard = (props: User) => {
  const [followedUser, setFollowedUser] = React.useState<boolean>(
    props.following ?? false
  );
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleFollowToggle = () => {
    if (token) {
      toggleFollow({
        userId: props._id,
        token,
        followed: followedUser,
        setFollowedUser,
      });
      if (props.onFollowToggle) {
        props.onFollowToggle();
      }
    }
  };
  

  return (
    <Card className="my-1 w-full">
      <div className="flex flex-row justify-between items-center p-4">
        <Link to={`/profile/${props._id}`} className="flex space-x-2 h-full">
          <div className="relative">
            <Avatar className="shadow-lg border-2 border-border">
              <AvatarFallback>{props?.userName}</AvatarFallback>
              <AvatarImage
                className="object-cover"
                src={props?.avatar ? props?.avatar : UserIcon}
              />
            </Avatar>

            <span
              className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${
                props.status === "online" ? "bg-success" : "bg-secondary"
              } absolute`}
            ></span>
          </div>

          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center gap-1">
              <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight truncate max-w-[120px]">
                {props.nickname ? `${props.nickname}` : "indisponível"}
              </CardTitle>

              <HeartWavesSolid
                className={`${
                  props?.type === "Plus"
                    ? "text-info"
                    : props?.type === "Admin"
                    ? "text-danger"
                    : props?.type === "verified"
                    ? "text-success"
                    : "hidden"
                } h-3.5 w-3.5`}
              />
            </div>

            <CardDescription
              className={`text-xs md:text-xs ${
                userId === props._id
                  ? "truncate max-w-[220px]"
                  : "truncate max-w-[120px]"
              }`}
            >
              {props.userName ? props.userName : "indisponível"}
            </CardDescription>
          </div>
        </Link>

        {userId === props._id ? null : (
          <Button
            variant={followedUser ? "secondary" : "default"}
            type="button"
            onClick={handleFollowToggle}
          >
            {followedUser ? "Seguindo" : "Seguir"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export const UserCard = (props: User) => {
  return (
    <React.Fragment>
      <Link to={`${props.link}${props._id}`}>
        <Card className="my-1 w-full">
          <div className="flex flex-row justify-between items-center p-4 w-full">
            <div className="flex flex-row items-center gap-1">
              <div className="relative">
                <Avatar className="shadow-lg border-2 border-border">
                  <AvatarFallback>{props?.userName}</AvatarFallback>
                  <AvatarImage
                    className="object-cover"
                    src={props?.avatar ? props?.avatar : UserIcon}
                  />
                </Avatar>

                <span
                  className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${
                    props.status === "online" ? "bg-success" : "bg-secondary"
                  } absolute`}
                ></span>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-1">
                  <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight truncate max-w-[120px]">
                    {props.userName ? `${props.userName}` : "indisponível"}
                  </CardTitle>

                  <HeartWavesSolid
                    className={`${
                      props?.type === "Plus"
                        ? "text-info"
                        : props?.type === "Admin"
                        ? "text-danger"
                        : props?.type === "verified"
                        ? "text-success"
                        : "hidden"
                    } h-3.5 w-3.5`}
                  />
                </div>

                <CardDescription className="text-xs md:text-xs">
                  {props.description ? props.description : null}
                </CardDescription>
              </div>
            </div>

            <Button variant="outline" size="icon" onClick={props.onClick}>
              <ChevronRight />
            </Button>
          </div>
        </Card>
      </Link>
    </React.Fragment>
  );
};

export const ChatUserCard = (props: User) => {
  return (
    <React.Fragment>
      <Link to={`/message/${props._id}`}>
        <Card className="my-1 w-full">
          <div className="flex flex-row justify-between items-center p-4 w-full">
            <div className="flex flex-row items-center gap-1">
              <div className="relative">
                <Avatar className="shadow-lg border-2 border-border">
                  <AvatarFallback>{props?.userName}</AvatarFallback>
                  <AvatarImage
                    className="object-cover"
                    src={props?.avatar ? props?.avatar : UserIcon}
                  />
                </Avatar>

                <span
                  className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${
                    props.status === "online" ? "bg-success" : "bg-secondary"
                  } absolute`}
                ></span>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-1">
                  <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight truncate max-w-[120px]">
                    {props.nickname ? `${props.nickname}` : "indisponível"}
                  </CardTitle>

                  <HeartWavesSolid
                    className={`${
                      props?.type === "Plus"
                        ? "text-info"
                        : props?.type === "Admin"
                        ? "text-danger"
                        : props?.type === "verified"
                        ? "text-success"
                        : "hidden"
                    } h-3.5 w-3.5`}
                  />
                </div>

                <CardDescription className="text-xs md:text-xs">
                  {props.description ? props.description : null}
                </CardDescription>
              </div>
            </div>

            <Button variant="outline" size="icon" onClick={props.onClick}>
              <ChevronRight />
            </Button>
          </div>
        </Card>
      </Link>
    </React.Fragment>
  );
};
