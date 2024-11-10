import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "./ui/button.js";
import { Card, CardDescription, CardTitle } from "./ui/card.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js";

import { ChevronRight, HeartWavesSolid } from "@mynaui/icons-react";

import UserIcon from "../../public/images/user.png";

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
}

export const SearchUserCard = (props: User) => {
  const [formData] = React.useState({
    unfollowId: props._id,
    userFollowId: props._id,
    token: localStorage.getItem("token"),
  });

  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );

  const [followedUser, setFollowedUser] = React.useState(props.following);

  const handleFollowToggle = () => {
    if (followedUser) {
      axios
        .put(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_UNFOLLOW_USER
          }`,
          formData
        )
        .then((response) => {
          setFollowedUser(response.data.followed);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      axios
        .put(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_FOLLOW_USER
          }`,
          formData
        )
        .then((response) => {
          setFollowedUser(response.data.followed);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <Card className="my-2 w-full">
      <div className="flex flex-row justify-between items-center p-4">
        <Link to={`/profile/${props._id}`} className="flex space-x-2 h-full">
          <Avatar className="shadow-lg border-2 border-border">
            <AvatarFallback>{props?.nickname}</AvatarFallback>
            <AvatarImage
              className="object-cover"
              src={props?.avatar ? props?.avatar : UserIcon}
            />
          </Avatar>
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
          <Button type="button" onClick={handleFollowToggle}>
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
        <Card className="my-2 w-full">
          <div className="flex flex-row justify-between items-center p-4 w-full">
            <div className="flex flex-row items-center gap-1">
              <Avatar className="shadow-lg border-2 border-border">
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
        <Card className="my-2 w-full">
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

                <span className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${props.status === "online" ? "bg-success" : "bg-secondary"} absolute`}></span>
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
