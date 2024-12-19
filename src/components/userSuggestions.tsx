import * as React from "react";
import axios from "axios";
import {
  Link
} from "react-router-dom";

import {
  ScrollArea,
  ScrollBar
} from "./ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";
import {
  Button
} from "./ui/button";

import {
  HeartWavesSolid,
  XSolid
} from "@mynaui/icons-react";

import UserIcon from "../../public/images/user.png";
import {
  toggleFollow
} from "../utils/followUtils";
import {
  User
} from "../interfaces/userInterface";
import {
  getUserData
} from "../utils/getUserData.tsx";
import LoadingPage from "../views/public/loading.tsx";

interface UserSuggestions {
  removeUserId: string;
}

export const UserSuggestions = (props: UserSuggestions) => {
  const [suggestedUsers,
    setSuggestedUsers] = React.useState < User[] > ([]);
  const [error,
    setError] = React.useState < string | null > (null);
  const token = localStorage.getItem("token");

  const [hiddenUsers,
    setHiddenUsers] = React.useState < {
    [key: string]: boolean;
  } > ({});

  const fetchSuggestedUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_USER_SUGGESTIONS
        }${token}`
      );

      setSuggestedUsers(response.data.suggestions);
      setError(null);
    } catch (error: any) {
      setError("Erro ao buscar sugestões de usuários");
      console.error("Erro:", error.message);
    }
  };

  React.useEffect(() => {
    if (token) {
      fetchSuggestedUsers();
    } else {
      setError("Token não encontrado");
    }
  },
    [token]);

  React.useEffect(() => {
    hideUser(props.removeUserId);
  },
    [props.removeUserId]);

  const hideUser = (userId: string) => {
    setHiddenUsers((prev) => ({
      ...prev, [userId]: true
    }));
  };

  // Follow Logic

  const handleFollowToggle = (userId: string) => {
    if (token) {
      toggleFollow( {
        userId,
        token,
        followed: false,
      }).then((response: any) => {
        if (response.data.followed) {
          hideUser(userId);
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
          {suggestedUsers.map((user, index) => {
            return (
              !hiddenUsers[user._id] && (
                <Card
                  key={`${user._id}-${index}`}
                  className="select-none relative flex flex-col items-center"
                  >
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
                    >
                    <CardHeader>
                      <div className="relative">
                        <Avatar className="h-16 w-16 shadow-lg border-2 border-secondary rounded-full">
                          <AvatarFallback>{user.nickname}</AvatarFallback>
                          <AvatarImage
                            className="object-cover"
                            src={user.avatar ? user.avatar: UserIcon}
                            />
                        </Avatar>

                        <div className="pulse-status-container bottom-0 right-2 rounded-full text-xs absolute">
                          <span
                            className={`pulse-status ${
                            user.status === "online"
                            ? "bg-success/70": "bg-secondary/70"
                            }`}
                            ></span>
                          <span
                            className={`pulse-status-core h-3 w-3 ${
                            user.status === "online"
                            ? "bg-success": "bg-secondary"
                            }`}
                            ></span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center w-16">
                      <div className="flex flex-row items-center gap-0.5">
                        <CardDescription className="truncate max-w-20 text-center font-semibold md:font-medium">
                          {user.nickname}
                        </CardDescription>

                        <HeartWavesSolid
                          className={`${
                          user.type === "Plus"
                          ? "text-info": user.type === "Admin"
                          ? "text-danger": user.type === "Verified"
                          ? "text-success": "hidden"
                          } h-3.5 w-3.5`}
                          />
                      </div>

                      <CardDescription className="truncate max-w-20 text-xs md:text-xs text-center">
                        {user.userName}
                      </CardDescription>
                    </CardContent>
                  </Link>

                  <CardFooter>
                    <Button
                      onClick={() => {
                        handleFollowToggle(user._id);
                      }}
                      >
                      Seguir
                    </Button>
                  </CardFooter>
                </Card>
              )
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </React.Fragment>
  );
};

interface UserFollowingInterface {
  redirectPage?: string;
}

export const UserFollowing = (props: UserFollowingInterface) => {
  const [userId] = React.useState < string | null > (
    localStorage.getItem("userId")
  );
  const userData = getUserData();

  const [followingUsers, setFollowingUsers] = React.useState < User[] > ([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_FOLLOWING_USER
          }${userId}`
        );

        if (response.data.following) {
          setFollowingUsers(response.data.following);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar usuários que estão sendo seguidos:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFollowingUsers();
    }
  },
    [userId]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <Card className="rounded-3xl flex flex-col select-none pt-6 pb-0 mt-1 w-full md:w-6/12">
        <ScrollArea className="w-full border-none whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4">
            <CardContent className="flex flex-row items-center space-x-4">
              <Link to={`/profile/${userData._id}`}>
                <Avatar className="h-16 w-16 shadow-lg border-2 border-border rounded-full">
                  <AvatarFallback>
                    {userData.nickname ? userData.nickname: ""}
                  </AvatarFallback>

                  <AvatarImage
                    className="object-cover"
                    src={userData.avatar ? userData.avatar: UserIcon}
                    />
                </Avatar>

                <CardDescription className="text-foreground text-xs md:text-xs truncate max-w-16 text-center font-medium md:font-normal">
                  Seu perfil
                </CardDescription>
              </Link>

              {
              !props.redirectPage ?
              (
                followingUsers.map((user, index) => (
                  <Link to={`/profile/${user._id}`} key={`${user._id}-${index}`}>
                    <div className="relative">
                      <Avatar className="h-16 w-16 shadow-lg border-2 border-border rounded-full">
                        <AvatarFallback>
                          {user.nickname ? user.nickname: ""}
                        </AvatarFallback>

                        <AvatarImage
                          className="object-cover"
                          src={user.avatar ? user.avatar: UserIcon}
                          />
                      </Avatar>

                      <div className="pulse-status-container bottom-0 right-2 rounded-full text-xs absolute">
                        <span
                          className={`pulse-status ${
                          user.status === "online"
                          ? "bg-success/70": "bg-secondary/70"
                          }`}
                          ></span>
                        <span
                          className={`pulse-status-core h-3 w-3 ${
                          user.status === "online"
                          ? "bg-success": "bg-secondary"
                          }`}
                          ></span>
                      </div>
                    </div>

                    <CardDescription className="text-foreground text-xs md:text-xs truncate max-w-16 text-center font-medium md:font-normal">
                      {user.nickname}
                    </CardDescription>
                  </Link>
                ))
              ):
              followingUsers.map((user, index) => (
                <Link to={`/${props.redirectPage}/${user._id}`} key={`${user._id}-${index}`}>
                  <div className="relative">
                    <Avatar className="h-16 w-16 shadow-lg border-2 border-border rounded-full">
                      <AvatarFallback>
                        {user.nickname ? user.nickname: ""}
                      </AvatarFallback>

                      <AvatarImage
                        className="object-cover"
                        src={user.avatar ? user.avatar: UserIcon}
                        />
                    </Avatar>

                    <div className="pulse-status-container bottom-0 right-2 rounded-full text-xs absolute">
                      <span
                        className={`pulse-status ${
                        user.status === "online"
                        ? "bg-success/70": "bg-secondary/70"
                        }`}
                        ></span>
                      <span
                        className={`pulse-status-core h-3 w-3 ${
                        user.status === "online"
                        ? "bg-success": "bg-secondary"
                        }`}
                        ></span>
                    </div>
                  </div>

                  <CardDescription className="text-foreground text-xs md:text-xs truncate max-w-16 text-center font-medium md:font-normal">
                    {user.nickname}
                  </CardDescription>
                </Link>
              ))
              }
            </CardContent>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </React.Fragment>
  );
};