import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "../ui/button.js";
import {
  Card,
  CardDescription,
} from "../ui/card.js";

import { Avatar } from "@nextui-org/react";

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
          <Link to={`/profile/${props._id}`} className="flex space-x-2 h-full">
            <div className="flex relative">
              <div className="flex absolute right-0 bottom-0.5 h-2 w-2 z-10">
                <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
              </div>
              <Avatar
                as="button"
                className="font-poppins uppercase"
                size="sm"
                name={props?.nickname}
                src={props?.avatar}
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-1">
              <div className="flex flex-row items-center space-x-1">
                <div>
                  <CardDescription className="font-popins text-tiny font-bold">
                    {props.nickname ? `${props.nickname}` : "indisponível"}
                  </CardDescription>
                </div>

                <div>
                  <BadgeCheck
                    className={`${props.type === "Plus"
                      ? "text-info"
                      : props.type === "Admin"
                        ? "text-danger"
                        : "text-success"
                      } size-3`}
                  />
                </div>
              </div>

              <CardDescription className="font-inter font-light capitalize tracking-wider text-tiny">
                {props.userName ? props.userName : "Nome indisponível"}
              </CardDescription>
            </div>
          </Link>
          <form action="" method="put" onSubmit={FollowUser}>
            <Button className="font-poppins font-semibold uppercase">
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
