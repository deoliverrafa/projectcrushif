import * as React from "react";
import axios from "axios";
import { HexaLink } from "./ui/router.js";

import { Button } from "./ui/button.js";
import { Card, CardDescription, CardTitle } from "./ui/card.js";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js";

import { BadgeCheck, UserRoundPlus, UserRoundCheck } from "lucide-react";

interface SearchUserCard {
  avatar: string;
  nickname: string;
  userName: string;
  type: string;
  _id: string;
  following: boolean;
}

export default function SearchUserCard(props: SearchUserCard) {
  const [formData] = React.useState({
    userFollowId: props._id,
    token: localStorage.getItem("token"),
  });

  const [followedUser, setFollowedUser] = React.useState(false);

  const FollowUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_FOLLOW_USER
        }`,
        formData
      )
      .then((response) => {
        setFollowedUser(response.data.followed);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card className="my-2 w-full">
        <div className="flex flex-row justify-between items-center p-4">
          <HexaLink
            href={`/profile/${props._id}`}
            className="flex space-x-2 h-full"
          >
            <div className="flex relative">
              <div className="flex absolute right-0 bottom-0 h-2.5 w-2.5 z-10">
                <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span className="bg-success rounded-full inline-flex relative h-2.5 w-2.5"></span>
              </div>
              <Avatar>
                <AvatarFallback>{props?.nickname}</AvatarFallback>
                <AvatarImage src={props?.avatar} />
              </Avatar>
            </div>
            <div className="flex flex-col items-start justify-center space-y-1">
              <div className="flex flex-row items-center space-x-1">
                <div>
                  <CardTitle>
                    {props.nickname ? `${props.nickname}` : "indisponível"}
                  </CardTitle>
                </div>

                <div>
                  <BadgeCheck
                    className={`${props.type === "Plus"
                      ? "text-info"
                      : props.type === "Admin"
                        ? "text-danger"
                        : "text-success"
                    } size-3.5`}
                  />
                </div>
              </div>

              <CardDescription className="capitalize tracking-light">
                {props.userName ? props.userName : "Nome indisponível"}
              </CardDescription>
            </div>
          </HexaLink>
          <form action="" method="put" onSubmit={FollowUser}>
            <Button>
              {props.following ? (
                <UserRoundCheck className="size-4 mr-2" />
              ) : followedUser ? (
                <UserRoundCheck className="size-4 mr-2" />
              ) : (
                <UserRoundPlus className="size-4 mr-2" />
              )}

              {props.following
                ? "Seguindo"
                : followedUser
                  ? "Seguindo"
                  : "Seguir"}
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
}
