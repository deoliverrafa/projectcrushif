import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  DrawerHeader,
  DrawerFooter,
} from "./ui/drawer.tsx";
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
  MenuSolid,
  HeartBrokenSolid,
  HeartSolid,
  BookmarkSolid,
  BookmarkCheckSolid,
  MessageSolid,
  ChatMessagesSolid,
  UserPlusSolid,
  ShareSolid,
  UserCircleSolid,
  EditOneSolid,
  TrashOneSolid,
  Ban,
  FlagOneSolid,
  CopySolid,
  CheckSquareOneSolid,
  HeartWavesSolid,
  FatCornerUpRightSolid,
  SpinnerSolid,
} from "@mynaui/icons-react";

import { getUserData } from "../utils/getUserData.tsx";
import { getUserDataById } from "../utils/getUserDataById.tsx";

interface CardProps {
  className?: string;
  userId?: string;
  _id?: string;
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL?: string;
  userAvatar?: string;
  insertAt?: string;
  id?: string;
  likeCount: number;
  commentCount: number;
  likedBy: String[];
}

interface User {
  _id: string;
  nickname: string;
  userName: string;
  email: string;
  campus: string;
  avatar: string;
  birthdaydata: string;
  Nfollowing: number;
  Nfollowers: number;
  following: string[];
  followers: string[];
  curso: string;
  type: string;
  bio: string;
}

export const CardPost = (props: CardProps) => {
  const dataUser: User = getUserData();
  const [viewingUser, setViewingUser] = React.useState<User | undefined>(
    undefined
  );
  const [formattedData, setFormattedData] = React.useState("");

  const [liked, setLiked] = React.useState(false);
  const [showHeart, setShowHeart] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [showFavorited, setShowFavorited] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);

  const [likedComments, setLikedComments] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [likeCommentCounts, setLikeCommentCounts] = React.useState<{
    [key: string]: number;
  }>({});

  const [showFullContent, setShowFullContent] = React.useState(false);
  const [showFullComment, setShowFullComment] = React.useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  React.useEffect(() => {
    if (props.likedBy.includes(localStorage.getItem("userId") || "")) {
      setLiked(true);
    }

    if (props.likedBy.includes(localStorage.getItem("userId") || "")) {
      setLiked(true);
    }
  }, []);

  const handleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);

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
    setTimeout(() => setShowHeart(false), 500);
  };

  const handleLikeComment = async (commentId: string) => {
    const newLiked = !likedComments[commentId];
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [commentId]: newLiked,
    }));

    const newLikeCount = newLiked
      ? likeCommentCounts[commentId] + 1
      : likeCommentCounts[commentId] - 1;
    setLikeCommentCounts((prevLikeCommentCounts) => ({
      ...prevLikeCommentCounts,
      [commentId]: newLikeCount,
    }));

    try {
      if (newLiked) {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_COMMENT_LIKE
          }`,
          {
            token: localStorage.getItem("token"),
            commentId,
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_COMMENT_UNLIKE
          }`,
          {
            token: localStorage.getItem("token"),
            commentId,
          }
        );
      }
    } catch (error) {
      console.error("Erro ao curtir/descurtir comentário:", error);
    }
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
    setShowFavorited(true);
    setTimeout(() => setShowFavorited(false), 500);
  };

  const [openShare, setOpenShare] = React.useState(false);
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
      const parsedDate = parseISO(props.insertAt);
      setFormattedData(formatDistanceToNow(parsedDate, { locale: ptBR }));
    }
  }, [props.userId, props.insertAt]);

  // Lógica para comentar
  const [comment, setComment] = React.useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const [commentCount, setCommentCount] = React.useState<number>(
    props.commentCount
  );

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_POST_COMMENT
          }`,
          {
            content: comment,
            token: localStorage.getItem("token"),
            postId: props._id,
            userId: localStorage.getItem("userId"),
          }
        )
        .then((response) => {
          if (response.data.posted) {
            setCommentCount(commentCount + 1);
            setComment(undefined);
          }
        })
        .catch((error: any) => {
          setErrorMessage(error.response.data.message || "Erro ao comentar");
        });
    } catch (error: any) {
      console.log("Erro ao postar comentário", error);
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
    likedBy: String[];
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

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_GETCOMMENTS
        }${localStorage.getItem("token")}/${props._id}`,
        { params: { skip, limit } }
      );

      const newComments = response.data.comments;
      newComments.forEach((comment: Comment) => {
        fetchUserData(comment.userId);

        // Inicialize o estado de likes e contagens de likes para cada comentário
        setLikedComments((prevLikedComments) => ({
          ...prevLikedComments,
          [comment._id]: comment.likedBy.includes(
            localStorage.getItem("userId") || ""
          ),
        }));

        setLikeCommentCounts((prevLikeCommentCounts) => ({
          ...prevLikeCommentCounts,
          [comment._id]: comment.likeCount,
        }));
      });

      setComments((prevComments) => [...prevComments, ...newComments]);
      setSkip(skip + limit);
      if (newComments.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Card
        className="select-none my-2 w-full md:w-5/12"
        onDoubleClick={handleLike}
      >
        <CardHeader className="flex flex-row justify-between items-center">
          {!props.isAnonymous ? (
            <Link to={`/profile/${props.id}`} className="flex space-x-2">
              <Avatar className="shadow-lg border-2 border-secondary">
                <AvatarFallback>
                  {!props.isAnonymous ? viewingUser?.nickname : ""}
                </AvatarFallback>

                <AvatarImage
                  src={!props.isAnonymous ? viewingUser?.avatar : ""}
                />
              </Avatar>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <CardTitle className="font-semibold md:font-medium text-lg md:text-md tracking-tight">
                      {!props.isAnonymous ? viewingUser?.nickname : "Anônimo"}
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
              <Avatar className="shadow-lg border-2 border-secondary">
                <AvatarFallback>
                  {!props.isAnonymous ? viewingUser?.nickname : "Anônimo"}
                </AvatarFallback>

                <AvatarImage
                  src={
                    !props.isAnonymous
                      ? viewingUser?.avatar
                      : "https://i.postimg.cc/L87Rk9Bq/incognito-1.png"
                  }
                />
              </Avatar>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <CardTitle className="font-semibold md:font-medium text-lg md:text-md tracking-tight">
                      {!props.isAnonymous ? viewingUser?.nickname : "Anônimo"}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <MenuSolid className="h-5 md:h-4 w-5 md:w-4" />
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="flex flex-row justify-around items-center">
                  <div className="flex flex-col items-center space-y-1">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={handleLike}
                    >
                      {liked ? (
                        <HeartSolid className="text-primary h-5 md:h-4 w-5 md:w-4" />
                      ) : (
                        <HeartBrokenSolid className="h-5 md:h-4 w-5 md:w-4" />
                      )}
                    </Button>
                    <DrawerDescription>Curtir</DrawerDescription>
                  </div>

                  <div className="flex flex-col items-center space-y-1">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={handleFavorite}
                    >
                      {favorited ? (
                        <BookmarkCheckSolid className="text-warning h-5 md:h-4 w-5 md:w-4" />
                      ) : (
                        <BookmarkSolid className="h-5 md:h-4 w-5 md:w-4" />
                      )}
                    </Button>
                    <DrawerDescription>Favoritar</DrawerDescription>
                  </div>
                </DrawerHeader>
              </div>

              <Separator />

              <div className="py-5 space-y-2 mx-auto w-full max-w-sm">
                {props.isAnonymous || props.id === dataUser._id ? null : (
                  <Button variant={"ghost"} className="justify-start w-full">
                    <UserPlusSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    Seguir
                  </Button>
                )}

                <Button
                  className="justify-start w-full"
                  variant={"ghost"}
                  onClick={() => setOpenShare(true)}
                >
                  <ShareSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                  Compartilhar
                </Button>

                {props.isAnonymous ? null : (
                  <Link to={`/about/${props.id}`}>
                    <Button className="justify-start w-full" variant={"ghost"}>
                      <UserCircleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                      Sobre
                    </Button>
                  </Link>
                )}
              </div>

              <Separator />

              <div className="py-5 space-y-2 mx-auto w-full max-w-sm">
                {props.id !== dataUser._id ? null : (
                  <>
                    <Button
                      variant={"ghost"}
                      className="text-danger justify-start w-full"
                    >
                      <EditOneSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                      Editar
                    </Button>

                    <Button
                      variant={"ghost"}
                      className="text-danger justify-start w-full"
                    >
                      <TrashOneSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                      Excluir
                    </Button>
                  </>
                )}

                {props.id === dataUser._id ? null : (
                  <>
                    <Button
                      variant={"ghost"}
                      className="text-danger justify-start w-full"
                    >
                      <FlagOneSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                      Reportar
                    </Button>

                    {props.isAnonymous ? null : (
                      <Button
                        variant={"ghost"}
                        className="text-danger justify-start w-full"
                      >
                        <Ban className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                        Bloquear
                      </Button>
                    )}
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </CardHeader>

        <CardContent className="relative pb-0">
          <div className="flex flex-col items-center justify-center">
            {props.photoURL && (
              <Carousel className="flex flex-col items-center my-2 relative">
                <CarouselContent>
                  <CarouselItem>
                    <img
                      className="rounded-lg object-cover w-full"
                      src={props.photoURL}
                      alt="Imagem Post"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            )}

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
              <CardDescription className="text-foreground font-normal md:font-light tracking-tight text-md md:text-sm">
                <span className="font-semibold md:font-medium">
                  {!props.isAnonymous ? viewingUser?.nickname : "anônimo"}:{" "}
                </span>
                {showFullContent ? (
                  <>
                    {props.content}
                    {props.references && (
                      <div>
                        <a
                          key={props._id}
                          className="cursor-pointer font-poppins tracking-tight font-normal md:font-light text-primary text-md md:text-sm"
                          id={props._id}
                        >
                          {props.references}
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  `${props.content.substring(0, 50)}${
                    props.references ? "" : ""
                  }`
                )}
                {(props.content.length > 50 || props.references) && (
                  <span
                    className="text-muted-foreground tracking-thight font-normal md:font-light cursor-pointer"
                    onClick={toggleContent}
                  >
                    {showFullContent ? " ...ver menos" : " ...ver mais"}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>

          <Link to={`/likedBy/${props._id}`}>
            <CardDescription className="cursor-pointer font-normal md:font-light tracking-tight text-md md:text-sm">
              ver todas as {likeCount} curtidas
            </CardDescription>
          </Link>
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex-col justify-start items-start space-y-2">
          {formattedData && (
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row space-x-2">
                <Button variant={"outline"} size={"icon"} onClick={handleLike}>
                  {liked ? (
                    <HeartSolid className="text-primary h-5 md:h-4 w-5 md:w-4" />
                  ) : (
                    <HeartBrokenSolid className="h-5 md:h-4 w-5 md:w-4" />
                  )}
                </Button>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        fetchComments();
                      }}
                    >
                      <MessageSolid className="h-5 md:h-4 w-5 md:w-4" />
                    </Button>
                  </DrawerTrigger>

                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <ScrollArea className="h-72 w-full rounded-md">
                        {comments.map((comment) => {
                          const dataUser = commentUserData[comment.userId];
                          if (!dataUser) {
                            return (
                              <div className="flex flex-row items-center">
                                <SpinnerSolid className="animate-spin mr-2 h-5 w-5" />
                                <p className="text-muted-foreground text-sm">
                                  Carregando...
                                </p>
                              </div>
                            );
                          } else {
                            return (
                              <Card
                                key={comment._id}
                                className="my-2 w-full max-w-md"
                              >
                                <Link to={`/profile/${comment.userId}`}>
                                  <CardHeader className="flex flex-row items-center space-x-4 p-4">
                                    <Avatar className="h-10 w-10 border-2 border-secondary">
                                      <AvatarFallback>
                                        {dataUser.nickname[0]}
                                      </AvatarFallback>
                                      <AvatarImage
                                        src={dataUser.avatar}
                                        alt={dataUser.nickname}
                                      />
                                    </Avatar>
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-1">
                                        <CardDescription className="font-semibold md:font-semibold">
                                          {dataUser.nickname}
                                        </CardDescription>

                                        <HeartWavesSolid
                                          className={`${
                                            dataUser?.type === "Plus"
                                              ? "text-info"
                                              : dataUser?.type === "Admin"
                                              ? "text-danger"
                                              : dataUser?.type === "verified"
                                              ? "text-success"
                                              : "hidden"
                                          } h-3 w-3`}
                                        />
                                      </div>
                                      <CardDescription className="text-xs md:text-xs">
                                        {formatDistanceToNow(
                                          new Date(comment.insertAt),
                                          {
                                            addSuffix: true,
                                            locale: ptBR,
                                          }
                                        )}
                                      </CardDescription>
                                    </div>
                                  </CardHeader>
                                </Link>

                                <CardContent className="relative pb-0">
                                  <CardDescription className="text-foreground font-normal md:font-light tracking-tight text-md md:text-sm">
                                    <span className="font-semibold md:font-medium">
                                      {dataUser.nickname}:{" "}
                                    </span>
                                    {showFullComment ? (
                                      <>{comment.content}</>
                                    ) : (
                                      `${comment.content.substring(0, 50)}`
                                    )}
                                    {comment.content.length > 50 && (
                                      <span
                                        className="text-muted-foreground tracking-tight font-normal md:font-light cursor-pointer"
                                        onClick={toggleComment}
                                      >
                                        {showFullComment
                                          ? " ...ver menos"
                                          : " ...ver mais"}
                                      </span>
                                    )}
                                  </CardDescription>
                                </CardContent>

                                <Separator className="my-2" />

                                <CardFooter className="flex flex-row items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleLikeComment(comment._id)
                                    }
                                  >
                                    {likedComments[comment._id] ? (
                                      <HeartSolid className="text-primary mr-2 h-4 w-4" />
                                    ) : (
                                      <HeartBrokenSolid className="mr-2 h-4 w-4" />
                                    )}{" "}
                                    {likeCommentCounts[comment._id] || 0}
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MessageSolid className="mr-2 h-4 w-4" />
                                    Responder
                                  </Button>
                                </CardFooter>
                              </Card>
                            );
                          }
                        })}
                      </ScrollArea>

                      <DrawerFooter>
                        <div className="flex flex-col w-full">
                          {errorMessage ? (
                            <DrawerDescription className="text-danger text-xs md:text-xs">
                              {errorMessage}
                            </DrawerDescription>
                          ) : null}

                          <div className="flex flex-row justify-between items-center gap-1 w-full">
                            <Avatar className="shadow-lg border-2 border-secondary">
                              <AvatarFallback>
                                {dataUser.nickname}
                              </AvatarFallback>

                              <AvatarImage src={dataUser.avatar} />
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
                                onInput={handleCommentChange}
                              />

                              {/* Confirmador do comentário */}
                              <Button
                                className="rounded"
                                variant={"outline"}
                                size={"icon"}
                              >
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
                  <div className="flex flex-row items-center space-x-1">
                    <ChatMessagesSolid className="h-5 md:h-4 w-5 md:w-4" />
                    <CardDescription className="font-normal md:font-light tracking-tight text-md md:text-sm">
                      {commentCount} coméntarios
                    </CardDescription>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row justify-between items-center gap-1 w-full">
            <Avatar className="shadow-lg border-2 border-secondary">
              <AvatarFallback>{dataUser.nickname}</AvatarFallback>

              <AvatarImage src={dataUser.avatar} />
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
                onInput={handleCommentChange}
              />

              <Button className="rounded" variant={"outline"} size={"icon"}>
                <FatCornerUpRightSolid className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {formattedData && (
            <CardDescription className="text-md md:text-sm font-normal md:font-light tracking-tight">
              há {formattedData} atrás
            </CardDescription>
          )}
        </CardFooter>
      </Card>

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
                    className="rounded"
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
    </>
  );
};
