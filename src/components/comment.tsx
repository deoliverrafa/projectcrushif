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
import { Input } from "./ui/input";

import {
  FatCornerUpRightSolid,
  HeartBrokenSolid,
  HeartSolid,
  HeartWavesSolid,
  MessageSolid,
} from "@mynaui/icons-react";

import UserIcon from "../../public/images/user.png";

import { getUserDataById } from "../utils/getUserDataById";
import { getReplyById } from "../utils/getReplyById";
import decodeToken from "../utils/decodeToken";

interface Comment {
  _id: string;
  content: string;
  insertAt: Date;
  userId: string;
  likeCount: number;
  likedBy: string[];
  mentionedUsers: string[];
  replies: string[];
}

interface User {
  _id: string;
  nickname: string;
  avatar: string;
  type: string;
  isFollowing: boolean;
}

const ReplyComment: React.FC<Comment> = (props) => {
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);

  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);
  const [animateClick, setAnimateClick] = React.useState(false);
  const [showHeart, setShowHeart] = React.useState(false);
  const [showFullComment, setShowFullComment] = React.useState(false);

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

    fetchUserData();
  }, [props.userId, props.likedBy]);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setAnimateClick(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${newLiked
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
    setTimeout(() => {
      setShowHeart(false);
      setAnimateClick(false);
    }, 500);
  };

  const handleDoubleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLike();
  };

  const highlightMentionsAndHashtags = (text: string) => {
    const regex = /([@#][\w-]+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.match(regex)) {
        return (
          <span key={index} className="text-primary font-medium md:font-normal">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-end items-end mb-2">
        <Card key={props._id} className="w-11/12 max-w-md" onDoubleClick={handleDoubleLike}>
          <Link to={`/profile/${props.userId}`}>
            <CardHeader className="flex flex-row items-center space-x-4 p-4">
              <Avatar className="h-10 w-10 border-2 border-border">
                <AvatarFallback>{viewingUser?.nickname[0]}</AvatarFallback>
                <AvatarImage
                  className="object-cover"
                  src={viewingUser?.avatar ? viewingUser?.avatar : UserIcon}
                  alt={viewingUser?.nickname}
                />
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <CardDescription className="font-semibold md:font-semibold">
                    {viewingUser?.nickname}
                  </CardDescription>
                  <HeartWavesSolid
                    className={`${viewingUser?.type === "Plus"
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
                  <HeartSolid
                    className={`${animateClick ? "animate-click" : ""
                      } text-primary h-5 md:h-4 w-5 md:w-4`}
                  />
                ) : (
                  <HeartBrokenSolid
                    className={`${animateClick ? "animate-click" : ""
                      } h-5 md:h-4 w-5 md:w-4`}
                  />
                )}
                {likeCount}
              </Button>
            </div>

            {props.mentionedUsers.length > 0 && (
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
            )}
          </CardFooter>
        </Card>
      </div>
    </React.Fragment>
  );
};

export const Comment: React.FC<Comment> = (props) => {
  const decodedObject = decodeToken(localStorage.getItem("token") ?? "");
  const dataUser = decodedObject?.user;

  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);
  const [showHeart, setShowHeart] = React.useState(false);
  const [animateClick, setAnimateClick] = React.useState(false);

  const [showFullComment, setShowFullComment] = React.useState(false);
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);
  const [viewingReplies, setViewingReplies] = React.useState<Comment[]>([]);

  const [isHidden, setIsHidden] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

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
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [props.userId, props.likedBy]);

  const fetchRepliesData = async () => {
    setLoading(true);
    try {
      if (Array.isArray(props.replies) && props.replies.length > 0) {
        const fetchedReplies = await Promise.all(
          props.replies
            .filter((replyId) => replyId)
            .map(async (replyId) => {
              const replyData = await getReplyById(replyId);
              return replyData && replyData._id ? replyData : null;
            })
        );

        const validReplies = fetchedReplies.filter((reply) => reply !== null);
        setViewingReplies(validReplies);
      }
    } catch (error) {
      console.error("Erro ao buscar dados das respostas:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRepliesData();
  }, [props.replies]);

  const handleLike = async () => {
    const newLiked = !liked;

    setLiked(newLiked);
    setAnimateClick(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${newLiked
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
    setTimeout(() => {
      setShowHeart(false);
      setAnimateClick(false);
    }, 500);
  };

  const handleDoubleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLike();
  };

  const [replyText, setReplyText] = React.useState("");
  const [isReply, setIsReply] = React.useState<boolean>(false);

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReplyText(value);
  };

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_COMMENT_REPLY
        }`,
        {
          token: localStorage.getItem("token"),
          content: replyText,
          commentId: props._id,
          userId: localStorage.getItem("userId"),
        }
      );

      const newReply = response.data.comment;

      setViewingReplies((prevReplies) => [...prevReplies, newReply]);
      setReplyText("");
      window.location.href = "/";
    } catch (error: any) {
      console.error("Erro ao enviar resposta:", error);
    }
  };

  const handleReplyToUser = (nickname: string) => {
    setReplyText(`@${nickname} `);
    setIsReply(!isReply);
  };

  const highlightMentionsAndHashtags = (text: string) => {
    const regex = /([@#][\w-]+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.match(regex)) {
        return (
          <span key={index} className="text-primary font-medium md:font-normal">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col items-center my-2">
      <Card key={props._id} className="w-full max-w-md" onDoubleClick={handleDoubleLike}>
        <div className="flex justify-start w-fit">
          <Link to={`/profile/${props.userId}`}>
            <CardHeader className="flex flex-row items-center space-x-4 p-4">
              <Avatar className="h-10 w-10 border-2 border-border">
                <AvatarFallback>{viewingUser?.nickname[0]}</AvatarFallback>
                <AvatarImage
                  className="object-cover"
                  src={viewingUser?.avatar ? viewingUser?.avatar : UserIcon}
                  alt={viewingUser?.nickname}
                />
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <CardDescription className="font-semibold md:font-semibold">
                    {viewingUser?.nickname}
                  </CardDescription>
                  <HeartWavesSolid
                    className={`${viewingUser?.type === "Plus"
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
        </div>


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

          {isReply ? (
            <div className="flex flex-row justify-between gap-1 mt-4 w-full">
              <Avatar className="shadow-lg border-2 border-border">
                <AvatarFallback>{dataUser?.nickname[0]}</AvatarFallback>
                <AvatarImage
                  className="object-cover"
                  src={dataUser?.avatar ? dataUser?.avatar : UserIcon}
                />
              </Avatar>

              <form
                action=""
                method="POST"
                onSubmit={handleReplySubmit}
                className="flex flex-row justify-between gap-1 w-full"
              >
                <Input
                  type="text"
                  placeholder="Adicione um coméntario"
                  value={replyText}
                  onInput={handleReplyChange}
                />

                <Button variant={"outline"} size={"icon"}>
                  <FatCornerUpRightSolid className="h-5 w-5" />
                </Button>
              </form>
            </div>
          ) : null}
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex flex-row justify-between items-center pb-4">
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleLike}
                >
                  {liked ? (
                    <HeartSolid
                      className={`${animateClick ? "animate-click" : ""
                        } text-primary h-5 md:h-4 w-5 md:w-4`}
                    />
                  ) : (
                    <HeartBrokenSolid
                      className={`${animateClick ? "animate-click" : ""
                        } h-5 md:h-4 w-5 md:w-4`}
                    />
                  )}
                  {likeCount}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReplyToUser(viewingUser?.nickname || "")}
                >
                  <MessageSolid className="mr-2 h-4 w-4" />
                  {isReply ? "Cancelar" : "Responder"}
                </Button>
              </div>

              {props.mentionedUsers.length > 0 && (
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
              )}
            </div>

            <div className="flex flex-row justify-start items-start mt-4">
              {viewingReplies.length > 0 && isHidden && (
                <p
                  className="cursor-pointer text-muted-foreground font-poppins text-xs"
                  onClick={() => setIsHidden(!isHidden)}
                >
                  Exibir mais {viewingReplies.length} comentários
                </p>
              )}

              {!isHidden && (
                <p
                  className="cursor-pointer text-muted-foreground font-poppins text-xs"
                  onClick={() => setIsHidden(true)}
                >
                  Ocultar comentários
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>

      {!isHidden && viewingReplies.length > 0 && (
        <div className="mt-2 w-full">
          {viewingReplies.map(
            (reply) =>
              reply &&
              reply._id && (
                <div className="reply-container">
                  <ReplyComment
                    _id={reply._id}
                    content={reply.content}
                    insertAt={reply.insertAt}
                    userId={reply.userId}
                    likeCount={reply.likeCount}
                    likedBy={reply.likedBy}
                    mentionedUsers={reply.mentionedUsers}
                    replies={reply.replies}
                  />
                </div>
              )
          )}
        </div>
      )}
      {loading && <p>Carregando respostas...</p>}
    </div>
  );
};
