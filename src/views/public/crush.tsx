import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

import { NavBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
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

import { getUserData } from "../../utils/getUserData";

interface User {
  _id: string;
  userName: string;
  birthdaydata: string;
  avatar: string;
  campus: string;
  gender: string;
}

const CrushLayout = () => {
  const userData = getUserData();
  const [users, setUsers] = React.useState<User[]>([]);

  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [genderFilter, setGenderFilter] = React.useState<string>(
    localStorage.getItem("genderFilter") || "Todos"
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"left" | "right" | null>(
    null
  );

  const currentUser = users[currentIndex];

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

  React.useEffect(() => {
    if (userData?._id) {
      fetchUsers();
    }
  }, [userData]);

  return (
    <React.Fragment>
      <div className="bg-card flex flex-row justify-center items-center mt-2 w-full">
        <ScrollArea className="w-96 whitespace-nowrap rounded-md">
          <div className="flex w-max gap-2 p-4">
            <Button
              variant={"outline"}
              className="text-primary gap-1"
              size={"sm"}
            >
              <HeartSolid className="h-5 md:h-4 w-5 md:w-4" />
              Curtiram você
            </Button>

            <Button
              variant={"outline"}
              className="text-primary gap-1"
              size={"sm"}
            >
              <FireSolid className="h-5 md:h-4 w-5 md:w-4" />
              Deu crush
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="text-muted-foreground gap-1"
                  size={"sm"}
                >
                  <CogFourSolid className="h-5 md:h-4 w-5 md:w-4" />
                  Selecionar gênero
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="space-y-0.5">
                  <DialogTitle>Selecionar gênero</DialogTitle>
                  <DialogDescription>
                    Selecione o gênero para aplicar uma filtragem nos usuários.
                  </DialogDescription>
                </DialogHeader>

                <RadioGroup value={genderFilter} onValueChange={applyFilter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Todos" id="r1" />
                    <Label className="cursor-pointer" htmlFor="r1">
                      Todos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Masculino" id="r2" />
                    <Label className="cursor-pointer" htmlFor="r2">
                      Homem
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Feminino" id="r3" />
                    <Label className="cursor-pointer" htmlFor="r3">
                      Mulher
                    </Label>
                  </div>
                </RadioGroup>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="bg-card flex flex-col items-center justify-start min-h-screen w-full my-2 p-4">
        <div className="w-full max-w-sm">
          <AnimatePresence>
            {currentUser && (
              <motion.div
                key={currentUser._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ x: direction === "left" ? -300 : 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
                          className="bg-primary-foreground h-12 md:h-12 w-12 md:w-12 hover:bg-primary-foreground/90 rounded-full"
                          onClick={() => handleSwipe("left")}
                        >
                          <XSolid className="text-primary md:h-8 md:w-8" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-primary hover:bg-primary/90 h-12 md:h-12 w-12 md:w-12 rounded-full"
                          onClick={() => handleSwipe("right")}
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
