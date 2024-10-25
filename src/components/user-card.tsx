import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "./ui/button.js";
import { Card, CardTitle } from "./ui/card.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js";

import { HeartWavesSolid } from "@mynaui/icons-react";

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
  };

  return (
    <>
      <Card className="my-2 w-full">
        <div className="flex flex-row justify-between items-center p-4">
          <Link to={`/profile/${props._id}`} className="flex space-x-2 h-full">
            <Avatar className="shadow-lg border-2 border-secondary">
              <AvatarFallback>{props?.nickname}</AvatarFallback>
              <AvatarImage src={props?.avatar} />
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center space-x-1">
                <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight">
                  {props.nickname ? `${props.nickname}` : "indisponível"}
                </CardTitle>

                <div>
                  <HeartWavesSolid
                    className={`${
                      props?.type === "Plus"
                        ? "text-info"
                        : props?.type === "Admin"
                        ? "text-danger"
                        : props?.type === "verified"
                        ? "text-success"
                        : "hidden"
                    } h-3 w-3`}
                  />
                </div>
              </div>

              <CardTitle className="font-normal md:font-light text-sm md:text-xs tracking-tight">
                {props.userName ? `${props.userName}` : "indisponível"}
              </CardTitle>
            </div>
          </Link>
          <form action="" method="put" onSubmit={FollowUser}>
            <Button>
              {props.following || followedUser ? "Seguindo" : "Seguir"}
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
}
