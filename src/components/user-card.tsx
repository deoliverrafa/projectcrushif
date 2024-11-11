import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button.js";
import { Card, CardDescription, CardTitle } from "./ui/card.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js";

import {
  CheckSolid,
  ChevronRight,
  HeartSolid,
  HeartWavesSolid,
} from "@mynaui/icons-react";

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
  onClick?: () => void;
}

export const SearchUserCard = (props: User) => {
  const [followedUser, setFollowedUser] = React.useState<boolean>(props.following ?? false);
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
    }
  };

  return (
    <Card className="my-2 w-full">
      <div className="flex flex-row justify-between items-center p-4">
        <Link to={`/profile/${props._id}`} className="flex space-x-2 h-full">
          <Avatar className="shadow-lg border-2 border-secondary">
            <AvatarFallback>{props?.nickname}</AvatarFallback>
            <AvatarImage
              className="object-cover"
              src={props?.avatar ? props?.avatar : UserIcon}
            />
          </Avatar>
          <div className="flex flex-row items-center gap-1">
            <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight">
              {props.nickname ? `${props.nickname}` : "indisponível"}
            </CardTitle>

            <div>
              <HeartWavesSolid
                className={`${props?.type === "Plus"
                    ? "text-info"
                    : props?.type === "Admin"
                      ? "text-danger"
                      : props?.type === "verified"
                        ? "text-success"
                        : "hidden"
                  } h-3.5 w-3.5`}
              />
            </div>
          </div>
        </Link>
        {userId === props._id ? null : (
          <Button type="button" onClick={handleFollowToggle}>
            {followedUser ? "Seguindo" : "Seguir"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export const CrushUserCard = (props: User) => {
  const [isHeart, setIsHeart] = React.useState(false);
  const [animateClick, setAnimateClick] = React.useState(false);

  const handleIconClick = () => {
    setIsHeart((prev) => !prev);
    setAnimateClick((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Card className="my-2 w-full">
        <div className="flex flex-row justify-between items-center p-4 w-full">
          <Link to={`/profile/${props._id}`}>
            <div className="flex flex-row items-center gap-1">
              <Avatar className="shadow-lg border-2 border-secondary">
                <AvatarFallback>{props?.userName}</AvatarFallback>
                <AvatarImage
                  className="object-cover"
                  src={props?.avatar ? props?.avatar : UserIcon}
                />
              </Avatar>

              <div className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-1">
                  <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight truncate max-w-[120px]">
                    {props.userName ? `${props.userName}` : "indisponível"}
                  </CardTitle>

                  <HeartWavesSolid
                    className={`${props?.type === "Plus"
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
          </Link>

          <div className="flex flex-row items-center gap-2">


            <Button
              className="text-success"
              variant="outline"
              size="icon"
              onClick={props.onClick}
            >
              {isHeart ? (
                <HeartSolid
                  className={`${animateClick ? "animate-click" : ""
                    } text-primary`}
                />
              ) : (
                <CheckSolid
                  className={`${animateClick ? "animate-click" : ""
                    } text-success`}
                  onClick={handleIconClick}
                />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export const UserCard = (props: User) => {
  return (
    <React.Fragment>
      <Link to={`${props.link}${props._id}`}>
        <Card className="my-2 w-full">
          <div className="flex flex-row justify-between items-center p-4 w-full">
            <div className="flex flex-row items-center gap-1">
              <Avatar className="shadow-lg border-2 border-secondary">
                <AvatarFallback>{props?.userName}</AvatarFallback>
                <AvatarImage
                  className="object-cover"
                  src={props?.avatar ? props?.avatar : UserIcon}
                />
              </Avatar>

              <div className="flex flex-col items-start">
                <div className="flex flex-row items-center gap-1">
                  <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight truncate max-w-[120px]">
                    {props.userName ? `${props.userName}` : "indisponível"}
                  </CardTitle>

                  <HeartWavesSolid
                    className={`${props?.type === "Plus"
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
