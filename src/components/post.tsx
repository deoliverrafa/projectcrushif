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
import { Comment } from "./ui/comment.tsx";
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
  likedBy: String[];
}

interface UserData {
  nickname: string;
  avatar: string;
  email: string;
}

export const CardPost = (props: CardProps) => {
  const [userData, setUserData] = React.useState<UserData>();
  const dataUser = getUserData();
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);
  const [formattedData, setFormattedData] = React.useState("");

  const [liked, setLiked] = React.useState(false);
  const [showHeart, setShowHeart] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);
  const [showFavorited, setShowFavorited] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(props.likeCount);

  const [showFullContent, setShowFullContent] = React.useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
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
    const fetchUserData = async () => {
      try {
        // const response = await axios.get(
        //   `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_ID}${
        //     props.userId
        //   }`
        // );
        // setUserData(response.data.userFinded);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setUserData({
          nickname: "Deletado",
          avatar: "",
          email: "Deletado",
        });
      }
    };

    fetchUserData();

    if (props.insertAt) {
      const parsedDate = parseISO(props.insertAt);
      setFormattedData(formatDistanceToNow(parsedDate, { locale: ptBR }));
    }
  }, [props.userId, props.insertAt]);

  // Comment Logic
  const [comment, setComment] = React.useState<String>();
  const [statusComment, setStatusComment] = React.useState<Boolean>(false)

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_POST_COMMENT}`,{ comment, token:localStorage.getItem('token'), postId: props._id})
    } catch (error: any) {
      console.log("Erro ao postar comentário", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setComment(value)
  }


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

          <CardDescription className="cursor-pointer font-normal md:font-light tracking-tight text-md md:text-sm">
            ver todas as {likeCount} curtidas
          </CardDescription>
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
                    <Button variant={"outline"} size={"icon"}>
                      <MessageSolid className="h-5 md:h-4 w-5 md:w-4" />
                    </Button>
                  </DrawerTrigger>

                  <DrawerContent>
                    <DrawerHeader>
                      <div className="flex items-start space-x-2">
                        <Avatar className="shadow-lg border-2 border-secondary">
                          <AvatarFallback>{dataUser.nickname}</AvatarFallback>

                          <AvatarImage src={dataUser.avatar} />
                        </Avatar>

                        <div className="rounded-lg bg-card border border-border p-4 w-auto max-w-[75%] shadow-sm">
                          <div className="flex flex-row justify-center items-center space-x-1">
                            <div className="flex flex-row items-center">
                              <At className="w-3 h-3" />
                              <p className="text-muted-foreground font-poppins font-semibold md:font-medium text-xs tracking-tight">
                                {dataUser.nickname}
                              </p>
                            </div>

                            <HeartWaves className="text-background fill-success h-4 w-4" />
                          </div>
                          <div className="flex flex-row items-center">
                            <p className="font-poppins font-medium md:font-normal text-xs">
                              {comment ? comment : "Mensagem de teste que nao vale nada, apenas para testar a responsabilidade do site"}
                            </p>
                          </div>
                          <p className="font-poppins text-muted-foreground font-normal md:font-light tracking-tight text-xs">
                            há 4 dias atrás
                          </p>
                        </div>
                      </div>
                    </DrawerHeader>

                    <Separator />

                    <DrawerFooter>
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
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-row items-center space-x-1">
                  <div className="flex flex-row items-center space-x-1">
                    <ChatMessagesSolid className="h-5 md:h-4 w-5 md:w-4" />
                    <CardDescription className="font-normal md:font-light tracking-tight text-md md:text-sm">
                      {0} coméntarios
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

            <Input type="text" placeholder="Adicione um coméntario" />

            <Button className="rounded" variant={"outline"} size={"icon"}>
              <FatCornerUpRightSolid className="h-5 w-5" />
            </Button>
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
