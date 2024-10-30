import * as React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { NavBarReturn } from "../../components/navbar.tsx";

import LoadingPage from "../../views/public/loading.tsx";

import { UserSuggestions } from "../../components/userSuggestions.tsx";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button.tsx";
import { Badge } from "../../components/ui/badge.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.tsx";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "../../components/ui/drawer.tsx";
import { Separator } from "../../components/ui/separator.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Input } from "../../components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../components/ui/tooltip.tsx";
import { ScrollArea } from "../../components/ui/scroll-area.tsx";

import { getUserData } from "../../utils/getUserData.tsx";
import { getUserDataById } from "../../utils/getUserDataById.tsx";
import { getStatusUser } from "../../utils/getStatusUser.tsx";

import {
  HeartWavesSolid,
  MenuSolid,
  ShareSolid,
  MessageSolid,
  CopySolid,
  FolderSlashSolid,
  HeartSolid,
  HeartBrokenSolid,
  FolderHeartSolid,
  CheckSquareOneSolid,
  UserPlusSolid,
  UserCircleSolid,
  EditOneSolid,
  Ban,
  FlagOneSolid,
} from "@mynaui/icons-react";

interface User {
  userName: string;
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  avatar: string;
  banner: string;
  birthdaydata: string;
  Nfollowers: number;
  Nfollowing: number;
  curso: string;
  type: string;
  status: string;
  likeCount: number;
  likedBy: String[];
}

const ProfileLayout = () => {
  const currentUser = getUserData();
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);
  const { id } = useParams<string>();
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );

  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [openShare, setOpenShare] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

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
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  React.useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(id);
        setViewingUser(data);
        if (data.likedBy.includes(userId || "")) {
          setLiked(true);
        }
        setLikeCount(data.likeCount);
      } catch (error) {
        console.error("Error fetching viewing user data:", error);
      }
    };

    if (id) {
      fetchViewingUserData();
    }
  }, [id, userId]);

  const handleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);

    if (newLiked) {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_LIKE}`,
        { token: localStorage.getItem("token"), userId: viewingUser?._id }
      );
      setLikeCount(likeCount + 1);
    } else {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_USER_UNLIKE
        }`,
        { token: localStorage.getItem("token"), userId: viewingUser?._id }
      );
      setLikeCount(likeCount - 1);
    }
  };

  getStatusUser(userId);

  if (!currentUser || !viewingUser) {
    return <LoadingPage />;
  }

  const isOwnProfile = currentUser._id === viewingUser._id;

  return (
    <>
      <Card className="mt-2 w-full md:w-6/12">
        <div className="relative w-full h-40">
          <img
            src={
              viewingUser.banner
                ? viewingUser.banner
                : "https://img.freepik.com/fotos-premium/fundo-abstrato-da-lua-em-cores-esteticas-generative-ai_888418-6857.jpg?w=996"
            }
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-[-30px] left-4">
            <Avatar className="h-20 w-20 shadow-lg border-4 border-secondary rounded-full">
              <AvatarFallback>{viewingUser.nickname}</AvatarFallback>
              <AvatarImage className="object-cover" src={viewingUser.avatar} />
            </Avatar>
          </div>
        </div>

        <CardHeader className="flex flex-row justify-between items-center mt-8">
          <div className="flex flex-col gap-1">
            <CardTitle className="font-medium text-sm md:text-sm">
              {viewingUser.userName
                ? viewingUser.userName
                : "Nome indisponível"}
            </CardTitle>

            <div className="flex flex-row items-center gap-1">
              <Badge variant={"outline"} className="font-light w-fit">
                {viewingUser.nickname
                  ? `@${viewingUser.nickname}`
                  : "indisponível"}
                <HeartWavesSolid
                  className={`${
                    viewingUser?.type === "Plus"
                      ? "text-info"
                      : viewingUser?.type === "Admin"
                      ? "text-danger"
                      : viewingUser?.type === "verified"
                      ? "text-success"
                      : "hidden"
                  } ml-1 h-3.5 w-3.5`}
                />
              </Badge>
            </div>
          </div>

          <Drawer>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DrawerTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                      <MenuSolid className="h-5 w-5" />
                    </Button>
                  </DrawerTrigger>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Menu</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
                </DrawerHeader>
              </div>

              <Separator />

              <div className="py-5 space-y-2 mx-auto w-full max-w-sm">
                {!isOwnProfile && (
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

                <Link to={`/about/${viewingUser._id}`}>
                  <Button className="justify-start w-full" variant={"ghost"}>
                    <UserCircleSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    Sobre
                  </Button>
                </Link>
              </div>

              <Separator />

              <div className="py-5 space-y-2 mx-auto w-full max-w-sm">
                {isOwnProfile && (
                  <Link to={"/profile/edit"}>
                    <Button
                      variant={"ghost"}
                      className="text-danger justify-start w-full"
                    >
                      <EditOneSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                )}

                {!isOwnProfile && (
                  <Button
                    variant={"ghost"}
                    className="text-danger justify-start w-full"
                  >
                    <FlagOneSolid className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    Reportar
                  </Button>
                )}

                {!isOwnProfile && (
                  <Button
                    variant={"ghost"}
                    className="text-danger justify-start w-full"
                  >
                    <Ban className="h-5 md:h-4 w-5 md:w-4 mr-2" />
                    Bloquear
                  </Button>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </CardHeader>

        <Separator className="mb-5" />

        <CardContent className="space-y-6">
          <div className="flex flex-row justify-evenly items-center">
            <div className="flex flex-col items-center">
              <CardTitle>{viewingUser.Nfollowers}</CardTitle>

              <CardDescription>Seguidores</CardDescription>
            </div>

            <Separator className="h-10" orientation="vertical" />

            <div className="flex flex-col items-center">
              <CardTitle>{viewingUser.Nfollowing}</CardTitle>

              <CardDescription>Seguindo</CardDescription>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center space-x-1">
            {isOwnProfile && (
              <Link
                className="flex justify-center items-center w-full"
                to="/profile/edit"
              >
                <Button variant={"outline"} className="w-full">
                  Editar
                </Button>
              </Link>
            )}

            {!isOwnProfile && (
              <Button variant={"outline"} className="w-full">
                Seguir
              </Button>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {!isOwnProfile && (
                    <Button
                      variant={"outline"}
                      className="rounded"
                      size={"icon"}
                    >
                      <MessageSolid className="h-5 w-5" />
                    </Button>
                  )}
                </TooltipTrigger>

                <TooltipContent>
                  <p>Mensagem</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isOwnProfile && (
                    <Button
                      variant={"outline"}
                      className="rounded"
                      size={"icon"}
                      onClick={() => setOpenShare(true)}
                    >
                      <ShareSolid className="h-5 w-5" />
                    </Button>
                  )}
                </TooltipTrigger>

                <TooltipContent>
                  <p>Compartilhar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-1">
            <CardDescription>Sugestões para você</CardDescription>
            <UserSuggestions />
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col space-y-2 w-full">
          <div className="flex flex-row justify-around items-center my-4 w-full">
            <Link to={`/likedBy/${viewingUser._id}`}>
              <Badge variant={"outline"} className="text-primary gap-1">
                <HeartSolid className="h-3 w-3" />
                Curtidas: {likeCount}
              </Badge>
            </Link>

            <Badge variant={"outline"} className="text-warning gap-1">
              <FolderHeartSolid className="h-3 w-3" />
              Postagens: 0
            </Badge>

            <Badge
              variant={"outline"}
              className={`${
                viewingUser.status === "online"
                  ? "text-success"
                  : "text-secondary"
              } gap-1`}
            >
              {viewingUser.status === "online" ? (
                <span className="bg-success rounded-full h-2 w-2"></span>
              ) : (
                <span className="bg-secondary rounded-full h-2 w-2"></span>
              )}
              {viewingUser.status}
            </Badge>
          </div>

          <ScrollArea className="w-full rounded-md">
            <div className="flex flex-col items-center space-y-4">
              <FolderSlashSolid className="h-20 w-20" />

              <CardDescription className="text-center text-wrap text-sm md:text-md">
                Usuário {viewingUser.nickname} não possui nenhuma publicação
              </CardDescription>
            </div>
          </ScrollArea>
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
                value={`https://crushif.vercel.app/profile/${viewingUser._id}`}
                readOnly
              />
            </div>

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

const ProfilePage = () => {
  return (
    <>
      <NavBarReturn title={"Perfil"} />

      <main className="flex flex-col justify-center items-center h-full w-full">
        <ProfileLayout />
      </main>
    </>
  );
};

export default ProfilePage;
