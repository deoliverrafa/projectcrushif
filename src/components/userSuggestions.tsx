import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { HeartWavesSolid, XSolid } from "@mynaui/icons-react";

import UserIcon from "../../public/images/user.png"
import { toggleFollow } from "../utils/followUtils";
import { User } from "../interfaces/userInterface";

interface UserSuggestions{
  removeUserId: string
}

export const UserSuggestions = (props: UserSuggestions) => {
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  
  
  const [hiddenUsers, setHiddenUsers] = useState<{ [key: string]: boolean }>(
    {}
  );

  const fetchSuggestedUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_SUGGESTIONS
        }${token}`
      );
      
      setSuggestedUsers(response.data.suggestions);
      setError(null);
    } catch (error: any) {
      setError("Erro ao buscar sugestões de usuários");
      console.error("Erro:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSuggestedUsers();
    } else {
      setError("Token não encontrado");
    }
  }, [token]);

  useEffect(() => {
    hideUser(props.removeUserId)
  }, [props.removeUserId]);

  const hideUser = (userId: string) => {
    setHiddenUsers((prev) => ({ ...prev, [userId]: true }));
  };

  // Follow Logic

  const handleFollowToggle = (userId: string) => {
    if (token) {
      toggleFollow({
        userId,
        token,
        followed: false,
      }).then((response: any) => {
        if (response.data.followed) {
          hideUser(userId)
        }
      });
    }
  };

  return (
    <React.Fragment>
      {error && (
        <CardDescription className="text-danger flex flex-row justify-center items-center gap-2">
          <XSolid className="h-4 w-4" />
          {error}
        </CardDescription>
      )}

      <ScrollArea className="w-full border-none whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {suggestedUsers.map(
            (user) => {
              return (
                !hiddenUsers[user._id] && (
                  <Card className="select-none relative flex flex-col items-center">
                    <Button
                      className="absolute top-0 right-0"
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => hideUser(user._id)}
                    >
                      <span className="sr-only">Fechar</span>
                      <XSolid className="h-5 md:h-4 w-5 md:w-4" />
                    </Button>

                  <Link
                    className="flex flex-col items-center"
                    to={`/profile/${user._id}`}
                    key={user._id}
                  >
                    <CardHeader>
                      <Avatar className="h-16 w-16 shadow-lg border-2 border-secondary rounded-full">
                        <AvatarFallback>{user.nickname}</AvatarFallback>
                        <AvatarImage
                          className="object-cover"
                          src={user.avatar ? user.avatar : UserIcon}
                        />
                      </Avatar>
                    </CardHeader>

                      <CardContent className="flex flex-col items-center w-16">
                        <div className="flex flex-row items-center gap-0.5">
                          <CardDescription className="truncate max-w-[80px] text-center font-semibold md:font-medium">
                            {user.nickname}
                          </CardDescription>

                          <HeartWavesSolid
                            className={`${user.type === "Plus"
                              ? "text-info"
                              : user.type === "Admin"
                                ? "text-danger"
                                : user.type === "verified"
                                  ? "text-success"
                                  : "hidden"
                              } h-3.5 w-3.5`}
                          />
                        </div>

                        <CardDescription className="truncate max-w-[80px] text-xs md:text-xs text-center">
                          {user.userName}
                        </CardDescription>
                      </CardContent>
                    </Link>

                    <CardFooter>
                      <Button onClick={() => { handleFollowToggle(user._id) }}>Seguir</Button>
                    </CardFooter>
                  </Card>
                )
              )
            })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </React.Fragment>
  );
};
