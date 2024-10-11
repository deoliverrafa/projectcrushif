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
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import {
  Dropdown,
  DropdownItem,
  DropdownContent,
  DropdownTrigger,
  DropdownSeparator,
  DropdownLabel,
} from "./ui/dropdown.tsx";
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
  BadgeCheck,
  Heart,
  MessageCircleHeart,
  Share,
  Crown,
  EllipsisVertical,
  Siren,
  Ban,
  Pencil,
  Trash2,
  Copy,
  Check,
} from "lucide-react";

import { getUserData } from "../utils/getUserData.tsx";

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

  const [open, setOpen] = React.useState(false);
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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_ID}${
            props.userId
          }`
        );

        setUserData(response.data.userFinded);
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

  return (
    <>
      <Card
        className="select-none my-2 w-full md:w-6/12"
        onDoubleClick={handleLike}
      >
        <CardHeader className="flex flex-row justify-between items-center">
          {!props.isAnonymous ? (
            <Link to={`/profile/${props.id}`} className="flex space-x-2">
              <div className="flex relative">
                <div className="flex absolute right-0 bottom-0 h-2.5 w-2.5 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2.5 w-2.5"></span>
                </div>
                <Avatar>
                  <AvatarFallback>
                    {!props.isAnonymous ? userData?.nickname : ""}
                  </AvatarFallback>

                  <AvatarImage
                    src={!props.isAnonymous ? userData?.avatar : ""}
                  />
                </Avatar>
              </div>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <CardTitle className="font-medium tracking-tight">
                      {!props.isAnonymous ? userData?.nickname : "Anônimo"}
                    </CardTitle>
                  </div>
                  <div>
                    <BadgeCheck className="text-success size-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <div className="flex relative">
                <div className="flex absolute right-0 bottom-0 h-2.5 w-2.5 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2.5 w-2.5"></span>
                </div>
                <Avatar>
                  <AvatarFallback>
                    {!props.isAnonymous ? userData?.nickname : "Anônimo"}
                  </AvatarFallback>

                  <AvatarImage
                    src={!props.isAnonymous ? userData?.avatar : ""}
                  />
                </Avatar>
              </div>
              <div className="flex flex-col items-start justify-center space-y-1">
                <div className="flex flex-row items-center space-x-1">
                  <div>
                    <CardTitle className="font-medium tracking-tight">
                      {!props.isAnonymous ? userData?.nickname : "Anônimo"}
                    </CardTitle>
                  </div>
                  <div>
                    <BadgeCheck className="text-success size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!props.isAnonymous && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant={"outline"} size={"icon"}>
                  <EllipsisVertical className="cursor-pointer" />
                </Button>
              </DropdownTrigger>

              <DropdownContent className="select-none">
                <DropdownLabel>Perfil</DropdownLabel>
                <DropdownSeparator />

                <Link to={`/profile/${props.id}`}>
                  <DropdownItem className="cursor-pointer">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="flex relative">
                        <div className="flex absolute right-0 bottom-0 h-2.5 w-2.5 z-10">
                          <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                          <span className="bg-success rounded-full inline-flex relative h-2.5 w-2.5"></span>
                        </div>
                        <Avatar>
                          <AvatarFallback>
                            {!props.isAnonymous
                              ? userData?.nickname
                              : "Anônimo"}
                          </AvatarFallback>

                          <AvatarImage
                            src={!props.isAnonymous ? userData?.avatar : ""}
                          />
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center space-x-1">
                          <div>
                            <p className="text-foreground font-medium ">
                              {!props.isAnonymous ? userData?.nickname : ""}
                            </p>
                          </div>

                          <div>
                            <BadgeCheck className="text-success size-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DropdownItem>
                </Link>

                <DropdownSeparator />

                <DropdownItem className="cursor-pointer" onClick={handleLike}>
                  {liked ? (
                    <Heart className="text-primary fill-primary size-4 mr-2" />
                  ) : (
                    <Heart className="size-4 mr-2" />
                  )}
                  Curtir
                </DropdownItem>

                <DropdownItem
                  className="cursor-pointer"
                  onClick={handleFavorite}
                >
                  {favorited ? (
                    <Crown className="text-warning fill-warning size-4 mr-2" />
                  ) : (
                    <Crown className="size-4 mr-2" />
                  )}
                  Favoritar
                </DropdownItem>

                <DropdownItem
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <Share className="mr-2 size-4" />
                  Compartilhar
                </DropdownItem>

                {props.id !== dataUser._id ? null : (
                  <>
                    <DropdownSeparator />

                    <DropdownItem className="cursor-pointer text-danger">
                      <Pencil className="mr-2 size-4" />
                      Editar
                    </DropdownItem>
                    <DropdownItem className="cursor-pointer text-danger">
                      <Trash2 className="mr-2 size-4" />
                      Excluir
                    </DropdownItem>
                  </>
                )}

                {props.id === dataUser._id ? null : (
                  <>
                    <DropdownSeparator />

                    <DropdownItem className="cursor-pointer text-danger">
                      <Siren className="mr-2 size-4" />
                      Reportar
                    </DropdownItem>
                    <DropdownItem className="cursor-pointer text-danger">
                      <Ban className="mr-2 size-4" />
                      Bloquear
                    </DropdownItem>
                  </>
                )}
              </DropdownContent>
            </Dropdown>
          )}
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
                <Heart className="animate-ping text-secondary fill-secondary size-20" />
              </div>
            )}

            {showFavorited && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Crown className="animate-ping text-secondary fill-secondary size-20" />
              </div>
            )}

            <div className="flex flex-row items-center h-full w-full">
              <CardDescription className="text-foreground font-light tracking-tight text-sm">
                <span className="font-medium">
                  {!props.isAnonymous ? userData?.nickname : "anônimo"}:{" "}
                </span>
                {showFullContent ? (
                  <>
                    {props.content}
                    {props.references && (
                      <div>
                        <a
                          key={props._id}
                          className="cursor-pointer font-poppins tracking-tight font-light text-primary text-sm"
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
                    className="text-muted-foreground tracking-thight font-light cursor-pointer"
                    onClick={toggleContent}
                  >
                    {showFullContent ? " ...ver menos" : " ...ver mais"}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>

          <CardDescription className="cursor-pointer font-light tracking-tight text-sm">
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
                    <Heart className="text-primary fill-primary size-4" />
                  ) : (
                    <Heart className="size-4" />
                  )}
                </Button>
                <Button variant={"outline"} size={"icon"}>
                  <MessageCircleHeart className="size-4" />
                </Button>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-row items-center space-x-1">
                  <div className="flex flex-row items-center space-x-1">
                    <MessageCircleHeart className="text-primary h-4 w-4" />
                    <CardDescription className="font-light tracking-tight text-sm">
                      {0} coméntarios
                    </CardDescription>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row items-center space-x-2 w-full">
            <div className="flex relative">
              <div className="flex absolute right-0 bottom-0 h-2.5 w-2.5 z-10">
                <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span className="bg-success rounded-full inline-flex relative h-2.5 w-2.5"></span>
              </div>
              <Avatar>
                <AvatarFallback>{dataUser.nickname}</AvatarFallback>

                <AvatarImage src={dataUser.avatar} />
              </Avatar>
            </div>

            <Input type="text" placeholder="Adicione um coméntario..." />
          </div>

          {formattedData && (
            <CardDescription className="text-sm font-light tracking-tight">
              há {formattedData} atrás
            </CardDescription>
          )}
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
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

            <Button
              type="submit"
              size="icon"
              variant={"outline"}
              onClick={handleCopy}
            >
              <span className="sr-only">Copiar</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {copied && (
            <DialogFooter className="sm:justify-start">
              <DialogDescription className="text-success flex flex-row items-center gap-2">
                <Check className="h-4 w-4" />
                copiado com sucesso!
              </DialogDescription>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
