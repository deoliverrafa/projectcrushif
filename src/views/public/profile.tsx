import * as React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { NavBarReturn } from "../../components/navbar.tsx";

import LoadingPage from "../../views/public/loading.tsx";

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
import { Separator } from "../../components/ui/separator.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Input } from "../../components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../components/ui/tooltip.tsx";

import { getUserData } from "../../utils/getUserData.tsx";
import { getUserDataById } from "../../utils/getUserDataById.tsx";

import {
  PencilRuler,
  SearchX,
  BadgeCheck,
  UserRoundPlus,
  Share,
  EllipsisVertical,
  Copy,
  Check,
} from "lucide-react";

interface User {
  userName: string;
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  avatar: string;
  birthdaydata: string;
  Nfollowers: number;
  Nfollowing: number;
  curso: string;
  type: string;
}

const ProfileLayout = () => {
  const currentUser = getUserData();
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);
  const [age, setAge] = React.useState<number | null>(null);
  const { id } = useParams<string>();

  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  React.useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(id);
        setViewingUser(data);
        if (data && data.birthdaydata) {
          const calculatedAge = calculateAge(data.birthdaydata);
          setAge(calculatedAge);
        }
      } catch (error) {
        console.error("Error fetching viewing user data:", error);
      }
    };

    if (id) {
      fetchViewingUserData();
    }
  }, [id]);

  if (!currentUser || !viewingUser) {
    return <LoadingPage />;
  }

  const isOwnProfile = currentUser._id === viewingUser._id;

  return (
    <>
      <Card className="w-full md:w-10/12">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="md:h-16 md:w-16">
              <AvatarFallback>{viewingUser.nickname}</AvatarFallback>
              <AvatarImage src={viewingUser.avatar} />
            </Avatar>

            <Badge
              variant={"outline"}
              className="cursor-pointer flex flex-col items-center"
            >
              <p className="text-foreground font-medium text-sm">
                {viewingUser.Nfollowers}
              </p>
              <p className="tracking-tight font-light text-sm">Seguidores</p>
            </Badge>

            <Badge
              variant={"outline"}
              className="cursor-pointer flex flex-col items-center"
            >
              <p className="font-medium text-sm">{viewingUser.Nfollowing}</p>
              <p className="tracking-tight font-light text-sm">Seguindo</p>
            </Badge>
          </div>

          <Button variant={"outline"} size={"icon"}>
            <EllipsisVertical className="cursor-pointer" />
          </Button>
        </CardHeader>

        <Separator className="mb-5" />

        <CardContent className="space-y-2">
          <CardTitle className="tracking-tight font-light text-sm">
            {viewingUser.userName ? viewingUser.userName : "Nome indisponível"}
          </CardTitle>

          <Badge variant={"secondary"}>
            {viewingUser.nickname ? `@${viewingUser.nickname}` : "indisponível"}

            <BadgeCheck
              className={`${
                viewingUser.type === "Plus"
                  ? "text-info"
                  : viewingUser.type === "Admin"
                  ? "text-danger"
                  : "text-success"
              } ml-1 size-3`}
            />
          </Badge>

          <div className="space-y-0.5">
            <CardDescription className="tracking-tight font-light text-sm">
              {age ? `Idade: ${age} anos` : "Idade: indisponível"}
            </CardDescription>
            <CardDescription className="tracking-tight font-light text-sm">
              {viewingUser.curso
                ? `Curso: ${viewingUser.curso}`
                : "Curso: indisponível"}
            </CardDescription>
            <CardDescription className="tracking-tight font-light text-sm">
              {viewingUser.campus
                ? `Campus: ${viewingUser.campus}`
                : "Campus: indisponível"}
            </CardDescription>
          </div>

          <div className="flex flex-row justify-center items-center space-x-1">
            {isOwnProfile && (
              <Link
                className="flex justify-center items-center w-full"
                to="/profile/edit"
              >
                <Button
                  variant={"secondary"}
                  className="font-poppins font-semibold uppercase w-full"
                >
                  <PencilRuler className="mr-2 size-4" />
                  Editar
                </Button>
              </Link>
            )}

            {!isOwnProfile && (
              <Button
                variant={"secondary"}
                className="font-poppins font-semibold uppercase w-full"
              >
                <UserRoundPlus className="mr-2 size-4" />
                Seguir
              </Button>
            )}

            <Dialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <DialogTrigger asChild>
                      <Button variant={"secondary"} size={"icon"}>
                        <Share className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compartilhar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Compartilhar link</DialogTitle>
                  <DialogDescription>
                    Qualquer pessoa com acesso ao link poderar acessar ao
                    conteúdo.
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
                          <Copy className="h-4 w-4" />
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
                      <Check className="h-4 w-4" />
                      copiado com sucesso!
                    </DialogDescription>
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="space-y-2">
          <div className="flex flex-col justify-center items-center space-y-2 w-full">
            <SearchX className="text-slate-500 dark:text-slate-400 size-14" />
            <CardDescription className="font-inter font-bold text-center w-full">
              Usuário não possui nenhuma publicação.
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

const ProfilePage = () => {
  return (
    <>
      <NavBarReturn title={"Perfil"} />

      <main className="flex flex-col justify-center items-center h-screen w-full">
        <ProfileLayout />
      </main>
    </>
  );
};

export default ProfilePage;
