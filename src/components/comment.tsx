import * as React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import {
  HeartBrokenSolid,
  HeartSolid,
  HeartWavesSolid,
  MessageSolid,
} from "@mynaui/icons-react";

import { getUserDataById } from "../utils/getUserDataById";

interface Comment {
  _id: string;
  content: string;
  insertAt: Date;
  userId: string;
  likeCount: number;
  likedBy: String[];
}

interface User {
  _id: string;
  nickname: string;
  avatar: string;
  type: string;
}

export const Comment = (props: Comment) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);
  const [showHeart, setShowHeart] = React.useState(false);

  const [showFullComment, setShowFullComment] = React.useState(false);

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  React.useEffect(() => {
    if (props.likedBy.includes(localStorage.getItem("userId") || "")) {
      setLiked(true);
    }
  }, []);

  const handleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);

    if (newLiked) {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_COMMENT_LIKE
        }`,
        { token: localStorage.getItem("token"), commentId: props._id }
      );
      setLikeCount(likeCount + 1);
    } else {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_COMMENT_UNLIKE
        }`,
        { token: localStorage.getItem("token"), commentId: props._id }
      );
      setLikeCount(likeCount - 1);
    }

    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 500);
  };

  const [viewingUser, setViewingUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(props.userId);
        setViewingUser(data);
      } catch (error) {
        console.error("Error fetching viewing user data:", error);
      }
    };

    if (props.userId) {
      fetchViewingUserData();
    }
  }, [props.userId]);

  return (
    <React.Fragment>
      <Card key={props._id} className="my-2 w-full max-w-md">
        <Link to={`/profile/${props.userId}`}>
          <CardHeader className="flex flex-row items-center space-x-4 p-4">
            <Avatar className="h-10 w-10 border-2 border-secondary">
              <AvatarFallback>{viewingUser?.nickname[0]}</AvatarFallback>
              <AvatarImage
                className="object-cover"
                src={viewingUser?.avatar}
                alt={viewingUser?.nickname}
              />
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <CardDescription className="font-semibold md:font-semibold">
                  {viewingUser?.nickname}
                </CardDescription>

                <HeartWavesSolid
                  className={`${
                    viewingUser?.type === "Plus"
                      ? "text-info"
                      : viewingUser?.type === "Admin"
                      ? "text-danger"
                      : viewingUser?.type === "verified"
                      ? "text-success"
                      : "hidden"
                  } h-3.5 w-3.5`}
                />
              </div>
              <CardDescription className="text-xs md:text-xs">
                {formatDistanceToNow(new Date(props.insertAt), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </CardDescription>
            </div>
          </CardHeader>
        </Link>

        <CardContent className="relative pb-0">
          <CardDescription className="text-foreground font-normal md:font-light tracking-tight text-md md:text-sm">
            <span className="font-semibold md:font-medium">
              {viewingUser?.nickname}:{" "}
            </span>
            {showFullComment ? (
              <>{props.content}</>
            ) : (
              `${props.content.substring(0, 50)}`
            )}
            {props.content.length > 50 && (
              <span
                className="text-muted-foreground tracking-tight font-normal md:font-light cursor-pointer"
                onClick={toggleComment}
              >
                {showFullComment ? " ...ver menos" : " ...ver mais"}
              </span>
            )}
          </CardDescription>

          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center">
              <HeartSolid className="animate-ping text-primary h-20 w-20" />
            </div>
          )}
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleLike}
          >
            {liked ? (
              <HeartSolid className="text-primary h-5 md:h-4 w-5 md:w-4" />
            ) : (
              <HeartBrokenSolid className="h-5 md:h-4 w-5 md:w-4" />
            )}
            {likeCount}
          </Button>
          <Button variant="outline" size="sm">
            <MessageSolid className="mr-2 h-4 w-4" />
            Responder
          </Button>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};
