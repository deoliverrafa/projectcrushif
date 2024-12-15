import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

import { NavBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";
import { UserCard } from "../../components/user-card";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
} from "../../components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

import {
  CogFourSolid,
  FireSolid,
  FlagOneSolid,
  HeartSolid,
  UserCircleSolid,
  UserSolid,
  XSolid,
} from "@mynaui/icons-react";

import SelfieIcon from "../../../public/images/selfie_art.png";
import NotFoundArt from "../../../public/images/not_found_art.png";

import { getUserData } from "../../utils/getUserData";
import { getStatusUser } from "../../utils/getStatusUser.tsx"
import decodeToken from "../../utils/decodeToken";

interface User {
  _id: string;
  userName: string;
  birthdaydata: string;
  avatar: string;
  campus: string;
  gender: string;
  type: string;
  status: string;
}

const CrushLayout = () => {
  const decodedObj = decodeToken(localStorage.getItem("token") ?? "");
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  
  const userData = decodedObj?.user;

  const [users, setUsers] = React.useState<User[]>([]);

  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [likedByUsers, setLikedByUsers] = React.useState<User[]>([]);
  const [matchesUsers, setMatchesUsers] = React.useState<User[]>([]);
  const [genderFilter, setGenderFilter] = React.useState<string>(
    localStorage.getItem("genderFilter") || "Todos"
  );

  const [dragging, setDragging] = React.useState(false);
  const [xOffset, setXOffset] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"left" | "right" | null>(
    null
  );

  const [animateClick, setAnimateClick] = React.useState(false);
  const [animateRefuse, setAnimateRefuse] = React.useState(false);

  const currentUser = users[currentIndex];

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = (e: any, info: any) => {
    e.stopPropagation();

    setDragging(false);
    const { offset } = info;
    const maxOffset = 50;

    if (offset.x > maxOffset) {
      likeUser(currentUser._id);
    } else if (offset.x < -maxOffset) {
      rejectUser();
    }
    setXOffset(0);
  };

  const handleSwipe = (swipeDirection: "left" | "right") => {
    setDirection(swipeDirection);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
      setDirection(null);
    }, 300);
  };

  const calculateAge = (birthday: string) => {
    const birthdayDate = new Date(birthday);
    const ageDifMs = Date.now() - birthdayDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_CRUSH_USERS
        }`
      );

      const shuffledUsers = response.data
        .filter((user: User) => user._id !== userData?._id)
        .sort(() => Math.random() - 0.5);
      setAllUsers(shuffledUsers);
      applyFilter(genderFilter, shuffledUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const applyFilter = (gender: string, userList = allUsers) => {
    setGenderFilter(gender);
    localStorage.setItem("genderFilter", gender);

    if (gender === "Todos") {
      setUsers(userList);
    } else {
      const filteredUsers = userList.filter((user) => user.gender === gender);
      setUsers(filteredUsers);
    }
    setCurrentIndex(0);
  };

  const likeUser = async (likedUserId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_CRUSH_LIKE
        }`,
        {
          userId: userData?._id,
          likedUserId,
        }
      );

      checkForMatch(likedUserId);
      fetchLikedByUsers();

      setAnimateClick(true);

      setTimeout(() => {
        setAnimateClick(false);
      }, 500);

      handleSwipe("right");
    } catch (error) {
      console.error("Erro ao curtir o usuário:", error);
    }
  };

  const rejectUser = () => {
    setAnimateRefuse(true);

    setTimeout(() => {
      setAnimateRefuse(false);
    }, 500);

    handleSwipe("left");
  };

  const fetchLikedByUsers = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_CRUSH_LIKED
        }`,
        { userId: userData?._id }
      );

      const uniqueLikedByUsers = Array.from(
        new Set(response.data.map((user: User) => user._id))
      ).map((id) => response.data.find((user: User) => user._id === id));

      setLikedByUsers(uniqueLikedByUsers);
      checkForMatches(uniqueLikedByUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários que curtiram:", error);
    }
  };

  const checkForMatch = (likedUserId: string) => {
    const matchUser = likedByUsers.find((user) => user._id === likedUserId);

    if (matchUser) {
      const storedMatches = JSON.parse(
        localStorage.getItem(`matchesUsers_${userData?._id}`) || "[]"
      );

      if (!storedMatches.some((user: User) => user._id === matchUser._id)) {
        const updatedMatches = [...storedMatches, matchUser];

        setMatchesUsers(updatedMatches);
        localStorage.setItem(
          `matchesUsers_${userData?._id}`,
          JSON.stringify(updatedMatches)
        );
      }
    }
  };

  const checkForMatches = (likedByList: User[]) => {
    const storedMatches = JSON.parse(
      localStorage.getItem(`matchesUsers_${userData?._id}`) || "[]"
    );

    const matchedUsers = likedByList.filter((user) =>
      allUsers.some((likedUser) => likedUser._id === user._id)
    );

    const updatedMatches = [
      ...storedMatches,
      ...matchedUsers.filter(
        (matchUser) =>
          !storedMatches.some(
            (storedUser: { _id: string }) => storedUser._id === matchUser._id
          )
      ),
    ];

    setMatchesUsers(updatedMatches);
    localStorage.setItem(
      `matchesUsers_${userData?._id}`,
      JSON.stringify(updatedMatches)
    );
  };

  React.useEffect(() => {
    if (userData?._id) {
      fetchUsers();
      fetchLikedByUsers();
    }
  }, [localStorage.getItem("token")]);

  getStatusUser(userId)
  
  return (
    <React.Fragment>
      <div className="bg-card border border-border flex flex-row justify-center items-center mt-1 w-full">
        <ScrollArea className="w-96 whitespace-nowrap rounded-md">
          <div className="flex w-max gap-2 p-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant={"outline"}
                  className="text-primary gap-2"
                  size={"sm"}
                >
                  <div className="flex flex-row items-center gap-1">
                    <FireSolid className="h-5 md:h-4 w-5 md:w-4" />
                    Curtiram você
                  </div>
                  {matchesUsers.length > 0 ? (
                    <div className="flex items-center justify-center h-4 w-4 right-[1px] bottom-0 relative rounded-full text-xs">
                      <span className="pulse-status bg-info/70"></span>
                      <span className="pulse-status-core bg-info rounded-full h-2.5 w-2.5"></span>
                    </div>
                  ) : null}
                </Button>
              </DrawerTrigger>

              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  {matchesUsers.length > 0 ? (
                    <DrawerHeader className="mx-auto">
                      <DrawerTitle>Você tem um crush</DrawerTitle>
                      <DrawerDescription>
                        Estes são os usuários que demonstraram interesse em
                        você! Mande mensagem para iniciar uma conexão.
                      </DrawerDescription>
                    </DrawerHeader>
                  ) : null}

                  <DrawerFooter>
                    <ScrollArea className="h-72 w-full rounded-md">
                      {matchesUsers.length > 0 ? (
                        matchesUsers.map((user) => (
                          <UserCard
                            key={user._id}
                            _id={user._id}
                            link="/message/"
                            avatar={user.avatar || ""}
                            userName={user.userName}
                            type={user.type}
                            status={user.status}
                            description="toque para conversar"
                          />
                        ))
                      ) : (
                        <div className="flex flex-col justify-center items-center space-y-2 w-full">
                          <img
                            src={NotFoundArt}
                            className="h-32 md:h-[200px] w-32 md:w-[200px]"
                          />
                          <DrawerDescription className="text-center mt-6">
                            Ainda não há curtidas no momento. Experimente postar
                            algumas fotos para aumentar suas chances de conexão!
                          </DrawerDescription>
                        </div>
                      )}
                    </ScrollArea>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant={"outline"}
                  className="text-muted-foreground gap-1"
                  size={"sm"}
                >
                  <CogFourSolid className="h-5 md:h-4 w-5 md:w-4" />
                  Selecionar gênero
                </Button>
              </DrawerTrigger>

              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Escolha o Gênero</DrawerTitle>
                    <DrawerDescription>
                      Selecione o gênero para filtrar os usuários de acordo com
                      sua preferência.
                    </DrawerDescription>
                  </DrawerHeader>

                  <DrawerFooter>
                    <RadioGroup
                      value={genderFilter}
                      onValueChange={applyFilter}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Todos" id="r1" />
                        <Label
                          className="font-medium md:font-normal cursor-pointer"
                          htmlFor="r1"
                        >
                          Todos
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Masculino" id="r2" />
                        <Label
                          className="font-medium md:font-normal cursor-pointer"
                          htmlFor="r2"
                        >
                          Homem
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Feminino" id="r3" />
                        <Label
                          className="font-medium md:font-normal cursor-pointer"
                          htmlFor="r3"
                        >
                          Mulher
                        </Label>
                      </div>
                    </RadioGroup>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="bg-card border border-border flex flex-col items-center justify-start min-h-screen w-full my-1 p-4">
        <div className="w-full max-w-sm">
          <AnimatePresence>
            {currentUser && (
              <motion.div
                key={currentUser._id}
                drag="x"
                dragConstraints={{ left: -300, right: 300 }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className={`${dragging ? "dragging" : ""}`}
                style={{
                  cursor: "grab",
                  x: xOffset,
                }}
                dragElastic={0.4}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  x: direction === "left" ? -300 : 300,
                  opacity: 0,
                  y: 100,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={currentUser.avatar ? currentUser.avatar : SelfieIcon}
                      alt={currentUser.userName}
                      className="w-full h-80 object-cover"
                    />
                    <div className="bg-background relative p-4">
                      <CardTitle className="text-2xl md:text-2xl truncate w-3/4">
                        {currentUser.userName}
                      </CardTitle>

                      <CardDescription>
                        {currentUser.birthdaydata
                          ? `${calculateAge(currentUser.birthdaydata)} anos`
                          : "Idade indisponível"}
                      </CardDescription>

                      <CardDescription>
                        {currentUser.campus
                          ? `Campus ${currentUser.campus}`
                          : "Campus indisponível"}
                      </CardDescription>

                      <div className="flex absolute right-8 md:right-10 bottom-24 md:bottom-20 justify-center mt-4 gap-2 md:gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`${
                            animateRefuse ? "animate__heartBeat" : ""
                          } bg-primary-foreground h-12 md:h-12 w-12 md:w-12 hover:bg-primary-foreground/90 rounded-full`}
                          onClick={rejectUser}
                        >
                          <XSolid className="text-primary md:h-8 md:w-8" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className={`${
                            animateClick ? "animate__heartBeat" : ""
                          } bg-primary hover:bg-primary/90 h-12 md:h-12 w-12 md:w-12 rounded-full`}
                          onClick={() => likeUser(currentUser._id)}
                        >
                          <HeartSolid className="text-primary-foreground md:h-8 md:w-8" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-row justify-center gap-4 mt-4 w-full">
          {currentUser && (
            <>
              <Link to={`/profile/${currentUser._id}`}>
                <Button
                  variant={"outline"}
                  className="text-muted-foreground gap-1"
                  size={"sm"}
                >
                  <UserSolid className="h-5 md:h-4 w-5 md:w-4" />
                  Perfil
                </Button>
              </Link>

              <Link to={`/about/${currentUser._id}`}>
                <Button
                  variant={"outline"}
                  className="text-muted-foreground gap-1"
                  size={"sm"}
                >
                  <UserCircleSolid className="h-5 md:h-4 w-5 md:w-4" />
                  Sobre
                </Button>
              </Link>

              <Button
                variant={"outline"}
                className="text-danger gap-1"
                size={"sm"}
              >
                <FlagOneSolid className="h-5 md:h-4 w-5 md:w-4" />
                Reportar
              </Button>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const CrushPage = () => {
  const userData = getUserData();

  return (
    <React.Fragment>
      <NavBar
        user={userData}
        avatarPath={userData?.avatar ? userData.avatar : ""}
      />

      <main className="flex flex-col justify-center items-center h-full w-full">
        <CrushLayout />
      </main>

      <BottomBar />
    </React.Fragment>
  );
};

export default CrushPage;
