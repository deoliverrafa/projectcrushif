import * as React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";

import { MentionedUsers } from "./mentionedUsers";

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
  likedBy: string[];
  mentionedUsers: string[];
}

interface User {
  _id: string;
  nickname: string;
  avatar: string;
  type: string;
  isFollowing: boolean;
}

export const Comment: React.FC<Comment> = (props) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);
  const [showHeart, setShowHeart] = React.useState(false);
  const [showFullComment, setShowFullComment] = React.useState(false);
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  React.useEffect(() => {
    setLiked(props.likedBy.includes(localStorage.getItem("userId") || ""));

    const fetchUserData = async () => {
      try {
        const userData = await getUserDataById(props.userId);
        setViewingUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (props.userId) {
      fetchUserData();
    }
  }, [props.userId, props.likedBy, props.mentionedUsers]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          newLiked
            ? import.meta.env.VITE_COMMENT_LIKE
            : import.meta.env.VITE_COMMENT_UNLIKE
        }`,
        { token: localStorage.getItem("token"), commentId: props._id }
      );
      setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
    } catch (error) {
      console.error("Error updating like:", error);
    }

    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 500);
  };

  const [replies, setReplies] = React.useState<string[]>([]);

  const [newReply, setNewReply] = React.useState(""); 

  const handleReply = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_COMMENT_REPLY
        }`,
        {
          token: localStorage.getItem("token"),
          content: newReply,
          commentId: props._id,
          userId: localStorage.getItem("userId"),
        }
      );
      setReplies([...replies, response.data.replyId]); 
      setNewReply(""); 
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    }
  };

  const highlightMentionsAndHashtags = (text: string) => {
    const regex = /([@#][\w-]+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.match(regex)) {
        return (
          <span
            key={index}
            className="text-primary font-semibold md:font-medium"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
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
            <>{highlightMentionsAndHashtags(props.content)}</>
          ) : (
            highlightMentionsAndHashtags(props.content.substring(0, 50))
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

        <input
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Responder..."
        />
        <Button onClick={handleReply}>Responder</Button>

        {replies.map((replyId) => (
          <div key={replyId}>
            <p>Resposta ID: {replyId}</p>
            <p></p>
            {/* Aqui você poderia buscar e renderizar as informações da resposta */}
          </div>
        ))}
      </CardContent>

      <Separator className="my-2" />

      <CardFooter className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
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
        </div>

        <div className="flex flex-row items-center gap-2">
          <MentionedUsers
            _id={props._id}
            content={props.content}
            insertAt={props.insertAt}
            userId={props.userId}
            likeCount={props.likeCount}
            likedBy={props.likedBy}
            mentionedUsers={props.mentionedUsers}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
