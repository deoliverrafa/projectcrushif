import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "./ui/button.js";
import { Card, CardTitle } from "./ui/card.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.js";

import { HeartWavesSolid } from "@mynaui/icons-react";
import UserIcon from "../../public/images/user.png"

interface SearchUserCard {
  avatar: string;
  nickname: string;
  type: string;
  _id: string;
  following: boolean;
}

export default function SearchUserCard(props: SearchUserCard) {
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
          <Avatar className="shadow-lg border-2 border-secondary">
            <AvatarFallback>{props?.nickname}</AvatarFallback>
            <AvatarImage className="object-cover" src={props?.avatar ? props?.avatar : UserIcon} />
          </Avatar>
          <div className="flex flex-row items-center gap-1">
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
}
