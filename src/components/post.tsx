import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { MentionedUsers } from "./mentionedUsers.tsx";
import { Comment } from "./comment.tsx";

import { Badge } from "./ui/badge.tsx"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.tsx";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
} from "./ui/drawer.tsx";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";
import { Separator } from "./ui/separator.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog.tsx";
import { Label } from "../components/ui/label.tsx";
import { ScrollArea } from "./ui/scroll-area.tsx";

import {
  HeartBrokenSolid,
  HeartSolid,
  BookmarkSolid,
  MessageSolid,
  UserPlusSolid,
  ShareSolid,
  TrashOneSolid,
  FlagOneSolid,
  CopySolid,
  CheckSquareOneSolid,
  HeartWavesSolid,
  FatCornerUpRightSolid,
  MaximizeSolid,
  DownloadSolid,
  PlusSolid,
  MinusSolid
} from "@mynaui/icons-react";

import AnonymousIcon from "../../public/images/anonymous.png";
import UserIcon from "../../public/images/user.png";
import NotFoundArt from "../../public/images/not_found_art.png";

import { User } from "../interfaces/userInterface.ts";
import { toggleFollow } from "../utils/followUtils.js";
import { getUserData } from "../utils/getUserData.tsx";
import { getUserDataById } from "../utils/getUserDataById.tsx";

interface CardProps {
  classNames?: string;
  userId: string;
  _id: string;
  content: string;
  isAnonymous: boolean;
  photoURLs: string[];
  insertAt: Date;
  following?: boolean;
  id: string;
  status?: string;
  likeCount: number;
  commentCount: number;
  likedBy: string[];
  mentionedUsers: string[];
  followingMentionedUsers: boolean[];
  isFollowingUserPost: boolean;
  onDelete: (postId: string) => Promise<void>; // Adicione o método para exclusão
}

export const CardPost = (props: CardProps) => {
  // const decodedObj = decodeToken(localStorage.getItem("token") ?? "");
  const token = localStorage.getItem("token");
  const dataUser = getUserData();

  const [viewingUser, setViewingUser] = React.useState<User | undefined>(
    undefined
  );
  const [formattedData, setFormattedData] = React.useState("");

  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);
  const [showHeart, setShowHeart] = React.useState(false);
  const [animateClick, setAnimateClick] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [showFavorited, setShowFavorited] = React.useState(false);

  const [followedUser, setFollowedUser] = React.useState<boolean>(
    props.isFollowingUserPost
  );

  const [showFullContent, setShowFullContent] = React.useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const increaseZoom = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200));
  };
  const decreaseZoom = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 10));
  };


  React.useEffect(() => {
    if (props.likedBy.includes(localStorage.getItem("userId") || "")) {
      setLiked(true);
    }
  }, []);

  const handleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);
    setAnimateClick(true);

    if (newLiked) {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_POST_LIKE}`,
        { token: localStorage.getItem("token"), postId: props._id }
      );
      setLikeCount(likeCount + 1);
    } else {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_UNLIKE
        }`,
        { token: localStorage.getItem("token"), postId: props._id }
      );
      setLikeCount(likeCount - 1);
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

  const handleFavorite = () => {
    setFavorited(!favorited);
    setShowFavorited(true);
    setTimeout(() => setShowFavorited(false), 500);
  };

  const [openShare, setOpenShare] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  
  const [openImage, setOpenImage] = React.useState(false);
  const [imageExpand, setImageExpand] = React.useState("");
  
  const handleImageExpand = (image: string) => {
    setOpenImage(true);
    setImageExpand(image);
  };

  const downloadImage = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "imagem-crushif.jpg";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
  }
};
  
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
      } catch (error) {
        console.error("Erro ao copiar para área de transferência: ", error);
      }
    }
  };

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

  React.useEffect(() => {
    if (props.insertAt) {
      setFormattedData(
        formatDistanceToNow(new Date(props.insertAt), {
          addSuffix: true,
          locale: ptBR,
        })
      );
    }
  }, [props.userId, props.insertAt]);

  const handleFollowToggle = () => {
    if (token) {
      toggleFollow({
        userId: props.userId,
        token,
        followed: followedUser,
        setFollowedUser,
      });
    }
  };

  // Lógica para comentar
  const [comment, setComment] = React.useState<string | undefined>();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const [commentCount, setCommentCount] = React.useState<number>(
    props.commentCount
  );

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_COMMENT
        }`,
        {
          content: comment,
          token: localStorage.getItem("token"),
          postId: props._id,
          userId: localStorage.getItem("userId"),
        }
      );

      if (response.data.posted) {
        const newComment = {
          _id: response.data.commentId,
          content: comment || "",
          insertAt: new Date(),
          userId: localStorage.getItem("userId") || "",
          likeCount: 0,
          likedBy: [],
          mentionedUsers: [],
          replies: [],
          userData: dataUser,
          getComments: { getNewstComments },
        };

        // Adiciona o novo comentário imediatamente ao estado
        setCommentUserData({
          [localStorage.getItem("userId") ?? ""]: dataUser,
        });
        setComments((prevComments) => {
          const updatedComments = [newComment, ...prevComments];
          return updatedComments;
        });
        setCommentCount((prevCount) => prevCount + 1);
        setComment("");
      }
    } catch (error: any) {
      console.log("Erro ao postar comentário", error);
      setErrorMessage(error.response?.data?.message || "Erro ao comentar");
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setComment(value);
  };

  interface Comment {
    _id: string;
    content: string;
    insertAt: Date;
    userId: string;
    likeCount: number;
    likedBy: string[];
    mentionedUsers: string[];
    replies: string[];
    userData: User;
  }

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [skip, setSkip] = React.useState(0);
  const limit = 10;
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [commentUserData, setCommentUserData] = React.useState<{
    [key: string]: User;
  }>({});

  const fetchUserData = async (userId: string) => {
    if (!commentUserData[userId]) {
      try {
        const data = await getUserDataById(userId);
        setCommentUserData((prevUserData) => ({
          ...prevUserData,
          [userId]: data,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
  };

  // Função para buscar comentários do post
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_GETCOMMENTS
        }${localStorage.getItem("token")}/${props._id}`,
        { params: { skip, limit } }
      );

      const newComments: Comment[] = response.data.comments;

      // Filtrar comentários duplicados
      const existingCommentIds = new Set(
        comments.map((comment) => comment._id)
      );
      const filteredComments = newComments.filter(
        (comment) => !existingCommentIds.has(comment._id)
      );

      // Buscar dados dos usuários
      await Promise.all(
        filteredComments.map((comment) => fetchUserData(comment.userId))
      );

      // Atualizar estado
      setComments((prevComments) => [...prevComments, ...filteredComments]);
      setSkip((prevSkip) => prevSkip + limit);

      if (filteredComments.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoading(false);
  }, [comments]);

  // Função para buscar comentários ao chegar no final deles
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore &&
      !loading
    ) {
      fetchComments();
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const getNewstComments = () => {
    fetchComments();
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

  // Lógica para deletar Post

  const deletePost = async (postId: string) => {
    try {
      const response: any = await props.onDelete(postId);

      if (response.data.deleted) {
        console.log("Post deletado com sucesso");
      } else {
        console.error("Erro: Post não foi deletado");
      }
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <React.Fragment>
      <ContextMenu>
        <ContextMenuTrigger className="relative flex justify-center w-full">
          <Card
            className={`select-none my-1 w-full md:w-6/12 ${props.classNames}`}
            onDoubleClick={handleDoubleLike}
          >
            <CardHeader className="flex flex-row justify-between items-center">
              {!props.isAnonymous ? (
                <Link to={`/profile/${props.id}`} className="flex space-x-2">
                <div className="relative">
                <Avatar className="shadow-lg border-2 border-border">
                    <AvatarFallback>
                      {!props.isAnonymous ? viewingUser?.nickname : ""}
                    </AvatarFallback>

                    <AvatarImage
                      className="object-cover"
                      src={!props.isAnonymous ? viewingUser?.avatar : UserIcon}
                    />
                  </Avatar>

                <span
              className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs ${
                viewingUser?.status === "online" ? "bg-success" : "bg-secondary"
              } absolute`}
            ></span>
          </div>

                  <div className="flex flex-col items-start justify-center space-y-1">
                    <div className="flex flex-row items-center space-x-1">
                      <div>
                        <CardTitle className="text-foreground font-semibold md:font-medium text-lg md:text-md tracking-tight">
                          {!props.isAnonymous
                            ? viewingUser?.nickname
                            : "Anônimo"}
                        </CardTitle>
                      </div>
                      <div>
                        <HeartWavesSolid
                          className={`${
                            viewingUser?.type === "Plus"
                              ? "text-info"
                              : viewingUser?.type === "Admin"
                              ? "text-danger"
                              : viewingUser?.type === "verified"
                              ? "text-success"
                              : "hidden"
                          } h-4 w-4`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex space-x-2">
                  <Avatar className="shadow-lg border-2 border-border">
                    <AvatarFallback>
                      {!props.isAnonymous ? viewingUser?.nickname : "Anônimo"}
                    </AvatarFallback>

                    <AvatarImage
                      className="object-cover"
                      src={
                        !props.isAnonymous ? viewingUser?.avatar : AnonymousIcon
                      }
                    />
                  </Avatar>

                  <div className="flex flex-col items-start justify-center space-y-1">
                    <div className="flex flex-row items-center space-x-1">
                      <div>
                        <CardTitle className="font-semibold md:font-medium text-lg md:text-md tracking-tight">
                          {!props.isAnonymous
                            ? viewingUser?.nickname
                            : "Anônimo"}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="relative pb-0">
              <div className="flex flex-col items-center justify-center">
                {props.photoURLs.length >= 1 && (
                  <Carousel className="flex flex-col items-center my-2 relative h-[500px] w-[300px] md:w-[400px]">
                    <CarouselContent>
                      {props.photoURLs.map((photo, index) => (
                        <CarouselItem className="relative" key={index}>
                          <img
                            className="rounded-lg object-cover min-h-[500px] max-h-[500px] w-[300px] md:w-[400px]"
                            src={photo}
                            alt={`Imagem ${index + 1}`}
                          />
                          
                          <Button className="absolute top-1 left-6 h-8 w-8 rounded-full" variant={"outline"} size={"icon"} onClick={() => handleImageExpand(photo)}>
                          <MaximizeSolid className="h-4 w-4" />
                          </Button>
                          
                          <Badge className="bg-background text-foreground font-semibold md:font-medium border border-border absolute top-2 right-2">{index + 1}/{props.photoURLs.length}</Badge>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious
                      className={`${
                        props.photoURLs.length <= 1 ? "hidden" : ""
                      } left-4`}
                    />
                    <CarouselNext
                      className={`${
                        props.photoURLs.length <= 1 ? "hidden" : ""
                      } right-4`}
                    />
                  </Carousel>
                )}

                <p>{props.mentionedUsers ? null : "error"}</p>

                {showHeart && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HeartSolid className="animate-ping text-primary h-20 w-20" />
                  </div>
                )}

                {showFavorited && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookmarkSolid className="animate-ping text-warning h-20 w-20" />
                  </div>
                )}

                <div className="flex flex-row items-center h-full w-full">
                  <CardDescription className="text-foreground font-normal md:font-light tracking-tight text-md md:text-sm break-words">
                    <span className="font-semibold md:font-medium">
                      {!props.isAnonymous ? viewingUser?.nickname : "anônimo"}:{" "}
                    </span>
                    {showFullContent ? (
                      <>{highlightMentionsAndHashtags(props.content)}</>
                    ) : (
                      highlightMentionsAndHashtags(
                        props.content.substring(0, 50)
                      )
                    )}
                    {props.content.length > 50 && (
                      <span
                        className="text-muted-foreground tracking-tight font-normal md:font-light cursor-pointer"
                        onClick={toggleContent}
                      >
                        {showFullContent ? " ...ver menos" : " ...ver mais"}
                      </span>
                    )}
                  </CardDescription>
                </div>
              </div>

              <div className="flex justify-start w-fit">
                <Link to={`/likedByPost/${props._id}`} className="w-fit">
                  <CardDescription className="font-normal md:font-light tracking-tight text-md md:text-sm w-fit">
                    ver todas as {likeCount} curtidas
                  </CardDescription>
                </Link>
              </div>
            </CardContent>

            <Separator className="my-2" />

            <CardFooter className="flex-col justify-start items-start space-y-2">
              {formattedData && (
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row space-x-2">
                    <Button
                      className="gap-1"
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                    >
                      {liked ? (
                        <HeartSolid
                          className={`${
                            animateClick ? "animate__heartBeat" : ""
                          } text-primary h-5 md:h-4 w-5 md:w-4`}
                        />
                      ) : (
                        <HeartBrokenSolid
                          className={`${
                            animateClick ? "animate__heartBeat" : ""
                          } h-5 md:h-4 w-5 md:w-4`}
                        />
                      )}
                      {likeCount}
                    </Button>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="gap-1"
                          size={"sm"}
                          onClick={() => {
                            fetchComments();
                          }}
                        >
                          <MessageSolid className="h-5 md:h-4 w-5 md:w-4" />
                          {commentCount}
                        </Button>
                      </DrawerTrigger>

                      <DrawerContent>
                        <div className="w-full max-w-sm mx-auto">
                          <ScrollArea className="h-72 w-full rounded-md">
                            {loading ? (
                              // Skeleton enquanto os comentários estão carregando
                              <div className="flex flex-col items-center">
                                {[...Array(3)].map((_, index) => (
                                  <Card
                                    key={index}
                                    className="w-full max-w-md my-1"
                                  >
                                    <div className="flex justify-start w-fit">
                                      <CardHeader className="flex flex-row items-center space-x-4 p-4">
                                        <span className="bg-muted-foreground rounded-full animate-pulse h-10 w-10"></span>

                                        <div className="flex flex-col gap-1">
                                          <div className="flex items-center gap-1">
                                            <span className="bg-muted-foreground rounded animate-pulse h-3 w-10"></span>

                                            <span className="bg-muted-foreground rounded animate-pulse h-3.5 w-3.5"></span>
                                          </div>
                                          <span className="bg-muted-foreground rounded animate-pulse h-2 w-16"></span>
                                        </div>
                                      </CardHeader>
                                    </div>

                                    <CardContent className="relative pb-0 gap-1 flex flex-row items-center">
                                      <div className="bg-muted-foreground rounded animate-pulse h-3 w-8"></div>
                                      <div className="bg-muted-foreground rounded animate-pulse h-3 w-28"></div>
                                    </CardContent>

                                    <Separator className="my-2" />

                                    <CardFooter className="flex flex-row justify-between items-center pb-4">
                                      <div className="flex flex-col items-center w-full">
                                        <div className="flex flex-row justify-between items-center w-full">
                                          <div className="flex flex-row items-center gap-2">
                                            <Button
                                              className="gap-1"
                                              variant="outline"
                                              size="sm"
                                            >
                                              <span className="bg-muted-foreground rounded animate-pulse h-3.5 w-3.5"></span>
                                              <span className="bg-muted-foreground rounded animate-pulse h-2.5 w-8"></span>
                                            </Button>

                                            <Button
                                              className="gap-1"
                                              variant="outline"
                                              size="sm"
                                            >
                                              <span className="bg-muted-foreground rounded animate-pulse h-3.5 w-3.5"></span>
                                              <span className="bg-muted-foreground rounded animate-pulse h-2.5 w-14"></span>
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </CardFooter>
                                  </Card>
                                ))}
                              </div>
                            ) : comments.length > 0 ? (
                              comments.map((comment) => {
                                const dataUser =
                                  commentUserData[comment.userId];
                                return (
                                  dataUser && (
                                    <Comment
                                      key={comment._id}
                                      _id={comment._id}
                                      content={comment.content}
                                      insertAt={comment.insertAt}
                                      userId={comment.userId}
                                      likeCount={comment.likeCount}
                                      likedBy={comment.likedBy}
                                      mentionedUsers={comment.mentionedUsers}
                                      replies={comment.replies}
                                      postId={props._id}
                                      userData={dataUser}
                                      getComments={getNewstComments}
                                    />
                                  )
                                );
                              })
                            ) : (
                              <div className="flex flex-col justify-center items-center space-y-2 w-full">
                                <img
                                  src={NotFoundArt}
                                  className="h-32 md:h-[200px] w-32 md:w-[200px]"
                                />
                                <DrawerDescription className="text-center mt-6">
                                  Nenhum comentário disponível. Seja o primeiro
                                  a comentar
                                </DrawerDescription>
                              </div>
                            )}
                          </ScrollArea>

                          <DrawerFooter>
                            <div className="flex flex-col w-full">
                              {errorMessage && (
                                <DrawerDescription className="text-danger text-xs md:text-xs">
                                  {errorMessage}
                                </DrawerDescription>
                              )}

                              <div className="flex flex-row justify-between items-center gap-1 w-full">
                                <Avatar className="shadow-lg border-2 border-border">
                                  <AvatarFallback>
                                    {dataUser?.nickname[0]}
                                  </AvatarFallback>
                                  <AvatarImage
                                    className="object-cover"
                                    src={
                                      dataUser?.avatar
                                        ? dataUser?.avatar
                                        : UserIcon
                                    }
                                  />
                                </Avatar>

                                <form
                                  action=""
                                  method="POST"
                                  onSubmit={handleCommentSubmit}
                                  className="flex flex-row justify-between gap-1 w-full"
                                >
                                  <Input
                                    type="text"
                                    placeholder="Adicione um comentário"
                                    value={comment}
                                    onInput={handleCommentChange}
                                  />

                                  <Button variant={"outline"} size={"icon"}>
                                    <FatCornerUpRightSolid className="h-5 w-5" />
                                  </Button>
                                </form>
                              </div>
                            </div>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row items-center space-x-1">
                      {
                        <div className="flex flex-row items-center gap-2">
                          {props.mentionedUsers.length > 0 && (
                          <MentionedUsers
                            _id={props._id}
                            content={props.content}
                            insertAt={props.insertAt}
                            userId={props.userId}
                            likeCount={props.likeCount}
                            likedBy={props.likedBy}
                            mentionedUsers={props.mentionedUsers}
                            followingMentionedUsers={
                              props.followingMentionedUsers
                            }
                          />
                          )} 
                        </div>
                      }
                    </div>
                  </div>
                </div>
              )}

              <ContextMenuContent>
                {props.isAnonymous || props.id === dataUser?._id ? null : (
                  <ContextMenuItem
                    className="cursor-pointer focus:text-primary/70"
                    onClick={handleFollowToggle}
                  >
                    <UserPlusSolid className="h-4 w-4 mr-1" />
                    {followedUser ? "Seguindo" : "Seguir"}
                  </ContextMenuItem>
                )}

                <ContextMenuItem
                  className="cursor-pointer focus:text-primary/70"
                  onClick={handleFavorite}
                >
                  {favorited ? (
                    <BookmarkSolid className="text-warning h-4 w-4 mr-1" />
                  ) : (
                    <BookmarkSolid className="h-4 w-4 mr-1" />
                  )}
                  Favoritar
                </ContextMenuItem>

                <ContextMenuItem
                  className="cursor-pointer focus:text-primary/70"
                  onClick={() => setOpenShare(true)}
                >
                  <ShareSolid className="h-4 w-4 mr-1" />
                  Compartilhar
                </ContextMenuItem>

                {props.id !== dataUser?._id ? null : (
                  <ContextMenuItem
                    className="cursor-pointer text-danger focus:text-primary/70"
                    onClick={() => setOpenDelete(true)}
                  >
                    <TrashOneSolid className="h-4 w-4 mr-1" />
                    Excluir
                  </ContextMenuItem>
                )}

                {props.id === dataUser?._id ? null : (
                  <ContextMenuItem className="cursor-pointer text-danger focus:text-primary/70">
                    <FlagOneSolid className="h-4 w-4 mr-1" />
                    Reportar
                  </ContextMenuItem>
                )}
              </ContextMenuContent>

              <div className="flex flex-row justify-between items-center gap-1 w-full">
                <Avatar className="shadow-lg border-2 border-border">
                  <AvatarFallback>{dataUser?.nickname}</AvatarFallback>

                  <AvatarImage
                    className="object-cover"
                    src={dataUser?.avatar ? dataUser.avatar : UserIcon}
                  />
                </Avatar>
                <form
                  action=""
                  method="POST"
                  onSubmit={handleCommentSubmit}
                  className="flex flex-row justify-between gap-1 w-full"
                >
                  <Input
                    type="text"
                    placeholder="Adicione um coméntario"
                    value={comment}
                    onInput={handleCommentChange}
                  />

                  <Button variant={"outline"} size={"icon"}>
                    <FatCornerUpRightSolid className="h-5 w-5" />
                  </Button>
                </form>
              </div>

              {formattedData && (
                <CardDescription className="text-md md:text-sm font-normal md:font-light tracking-tight">
                  {formattedData} atrás
                </CardDescription>
              )}
            </CardFooter>
          </Card>
        </ContextMenuTrigger>
      </ContextMenu>
      
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-0.5">
            <DialogTitle>Excluir postagem</DialogTitle>

            <DialogDescription>
              Deseja excluir está postagem?
            </DialogDescription>
          </DialogHeader>
        
          <DialogFooter>
            <Button variant={"danger"} onClick={() => {
                deletePost(props._id);
              }}>
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
            <Dialog open={openImage} onOpenChange={setOpenImage}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Visualizando imagem ampliada</DialogTitle>
            <DialogDescription>
              Explore a imagem em maior detalhe. Use o botão de fechar para retornar à visualização anterior.
            </DialogDescription>
          </DialogHeader>
      
          <div className="relative flex justify-center items-center">
            <img
              className="rounded-lg object-cover min-h-[500px] max-h-[500px] w-[300px] md:w-[400px] transition-transform duration-300 ease-in-out"
              src={imageExpand}
              alt="post"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            />
      
            <div className="absolute flex items-center justify-center gap-2 bg-background border border-border text-foreground font-semibold md:font-medium rounded-lg px-2.5 py-0.5 bottom-2">
              <button
                className="flex items-center justify-center p-1 border rounded-full"
                onClick={decreaseZoom}
                disabled={zoomLevel <= 10}
              >
                <MinusSolid />
              </button>
              <span>{zoomLevel}%</span>
              <button
                className="flex items-center justify-center p-1 border rounded-full"
                onClick={increaseZoom}
                disabled={zoomLevel >= 200}
              >
                <PlusSolid />
              </button>
            </div>
          </div>
      
          <DialogFooter>
            <Button variant={"secondary"} onClick={() => downloadImage(imageExpand)}>
              <DownloadSolid />
              Baixar imagem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openShare} onOpenChange={setOpenShare}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar link</DialogTitle>
            <DialogDescription>
              Qualquer pessoa com acesso ao link poderá acessar o conteúdo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                ref={inputRef}
                value={`https://crushif.vercel.app/post/${props._id}`}
                readOnly
              />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="submit"
                    size="icon"
                    variant={"outline"}
                    onClick={handleCopy}
                  >
                    <span className="sr-only">Copiar</span>
                    <CopySolid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copiar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {copied && (
            <DialogFooter className="sm:justify-start">
              <DialogDescription className="text-success flex flex-row items-center gap-2">
                <CheckSquareOneSolid className="h-4 w-4" />
                copiado com sucesso!
              </DialogDescription>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
