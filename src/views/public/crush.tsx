import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { NavBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";

import { getUserData } from "../../utils/getUserData";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import {
  CogFourSolid,
  FireSolid,
  FlagOneSolid,
  HeartSolid,
  UserCircleSolid,
  UserSolid,
  XSolid,
} from "@mynaui/icons-react";

interface User {
  _id: number;
  userName: string;
  birthdaydata: string;
  avatar: string;
  campus: string;
}

const CrushLayout = () => {
  const [users, setUsers] = React.useState<User[]>([]);

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

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_CRUSH_USERS
          }`
        );

        const shuffledUsers = response.data.sort(() => Math.random() - 0.5);
        setUsers(shuffledUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

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

            <Button
              variant={"outline"}
              className="text-muted-foreground gap-1"
              size={"sm"}
            >
              <CogFourSolid className="h-5 md:h-4 w-5 md:w-4" />
              Selecionar gênero
            </Button>
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
                      src={currentUser.avatar}
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
          <Button
            variant={"outline"}
            className="text-muted-foreground gap-1"
            size={"sm"}
          >
            <UserSolid className="h-5 md:h-4 w-5 md:w-4" />
            Perfil
          </Button>

          <Button
            variant={"outline"}
            className="text-muted-foreground gap-1"
            size={"sm"}
          >
            <UserCircleSolid className="h-5 md:h-4 w-5 md:w-4" />
            Sobre
          </Button>

          <Button variant={"outline"} className="text-danger gap-1" size={"sm"}>
            <FlagOneSolid className="h-5 md:h-4 w-5 md:w-4" />
            Reportar
          </Button>
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
