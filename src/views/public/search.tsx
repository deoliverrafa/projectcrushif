import * as React from "react";
import { debounce } from "lodash";
import axios from "axios";

import { SearchUserCard } from "../../components/user-card.tsx";
import { UserSuggestions } from "../../components/userSuggestions.tsx";

import { BottomBar } from "../../components/bottombar.tsx";
import { NavBar } from "../../components/navbar.tsx";

import { Input } from "../../components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "../../components/ui/card.tsx";
import { ScrollArea } from "../../components/ui/scroll-area.tsx";
import { Button } from "../../components/ui/button.tsx";

import { XSolid, UndoSolid } from "@mynaui/icons-react";
import NotFoundArt from "../../../public/images/not_found_art.png"

import { getStatusUser } from "../../utils/getStatusUser.tsx";
import decodeToken from "../../utils/decodeToken.tsx";
import { getUserData } from "../../utils/getUserData.tsx";

interface User {
  nickname: string;
  userName: string;
  avatar: string;
  type: string;
  _id: string;
  isFollowing: boolean;
  status: string;
}

const SearchLayout = () => {
  const userData = getUserData();
  
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );

  const [formData, setFormData] = React.useState({
    nickname: "",
    token: localStorage.getItem("token"),
  });

  const [queryResponse, setQueryResponse] = React.useState<User[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const [suggestedUsers, setSuggestedUsers] = React.useState<User[]>([]);
  const [noResults, setNoResults] = React.useState(false);
  
  React.useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(storedSearches);
  }, []);
  
  const updateRecentSearches = React.useCallback(
    (search: string) => {
      if (!recentSearches.includes(search)) {
        const updatedSearches = [search, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      }
    },
    [recentSearches]
  );
  
  const deleteRecentSearch = (search: string) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };
  
  const fetchSuggestedUsers = React.useCallback(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_SEARCH_PAGE_USER
        }`,
        { nickname: "o", token: formData.token }
      )
      .then((response: any) => {
        const users = response.data.usersFinded.map((user: any) => ({
          ...user,
          isFollowing: user.isFollowing || false,
        }));
        setSuggestedUsers(users);
      })
      .catch((error: any) => {
        console.log("Erro ao buscar sugestões:", error.message);
      });
  }, [formData.token]);

  const fetchData = React.useCallback(
    (nickname: string) => {
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_SEARCH_PAGE_USER
          }`,
          { nickname, token: formData.token }
        )
        .then((response: any) => {
          const users = response.data.usersFinded.map((user: any) => ({
            ...user,
            isFollowing: user.isFollowing || false,
          }));

          setQueryResponse(users);
          setNoResults(users.length === 0);
          updateRecentSearches(nickname);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    },
    [formData.token, updateRecentSearches]
  );

  const debounceFetchData = React.useCallback(debounce(fetchData, 1000), [fetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      nickname: value,
    }));

    if (value.trim() === "") {
      setQueryResponse([]);
      setNoResults(false);
    } else {
      debounceFetchData(value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debounceFetchData(formData.nickname);
  };
  
  const handleRecentSearchClick = (nickname: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nickname,
    }));
    fetchData(nickname);
  };

  React.useEffect(() => {
    fetchSuggestedUsers();
  }, [fetchSuggestedUsers]);

  getStatusUser(userId);

  return (
    <form
      action="searchUser"
      method="post"
      onSubmit={handleFormSubmit}
      className="select-none flex flex-col items-center w-full"
    >
      <Card className="w-full md:w-6/12">
        <CardHeader>
          <CardTitle className="text-foreground uppercase text-2xl md:text-5xl">
            Pesquisar
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-row justify-between items-center space-x-2 w-full">
            <div className="flex flex-col justify-center w-full">
              <Input
                placeholder="Pesquisar"
                name="query"
                id="query"
                onChange={handleSearch}
                value={formData.nickname}
              />
            </div>
          </div>
        </CardContent>
        
        {recentSearches.length > 0 && (
          <CardFooter className="flex flex-col items-start">
            <CardDescription className="text-muted-foreground text-xs md:text-xs mb-1">Pesquisas recentes</CardDescription>
            
            {recentSearches.map((search) => (
              <Card className="bg-background p-0 ps-2 my-0.5 w-full" key={search}>
                <CardContent className="flex flex-row justify-between items-center p-0">
                  <div className="cursor-pointer w-full flex flex-row items-center gap-1" onClick={() => handleRecentSearchClick(search)}>
                    <UndoSolid className="h-4 w-4" />
                    <CardDescription
                    className="text-sm md:text-sm">{search}</CardDescription>
                  </div>
                
                  <Button variant={"ghost"} size={"icon"} onClick={() => deleteRecentSearch(search)}>
                    <XSolid className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardFooter>
        )}
      </Card>
        
      <Card className="h-screen md:h-full w-full md:w-6/12 mt-2">
        {queryResponse.length > 0 && (
          <p className="font-poppins font-medium md:font-normal tracking-wide text-md md:text-sm text-muted-foreground">
            {queryResponse.length === 1 ? (
              <div className="flex flex-row justify-between items-center">
                <CardDescription className="text-foreground ml-4 mt-4 uppercase">Resultado</CardDescription>
                
                <CardDescription className="mr-4 mt-4 text-xs md:text-xs">{queryResponse.length} resultado</CardDescription>
              </div>
            ) : queryResponse.length > 1 ? (
              <div className="flex flex-row justify-between items-center">
                <CardDescription className="text-foreground ml-4 mt-4 uppercase">Resultados</CardDescription>
                
                <CardDescription className="mr-4 mt-4 text-xs md:text-xs">{queryResponse.length} resultados</CardDescription>
              </div>
            ) : (
              ""
            )}
          </p>
        )}

        {queryResponse.length > 0 || suggestedUsers.length > 0 ? (
            <div className="p-4">
              {queryResponse.length > 0 ? (
                queryResponse.map((user: User) => {
                  const isFollowing = userData?.following.some(
                    (followingId) => followingId === user._id
                  );
                  return (
                    <>
                    <ScrollArea className="h-full w-full rounded-md">
                      <SearchUserCard
                        avatar={user.avatar}
                        nickname={user.nickname}
                        userName={user.userName}
                        type={user.type}
                        _id={user._id}
                        following={isFollowing}
                        key={user._id}
                        status={user.status}
                      />
                      </ScrollArea>
                    </>
                  );
                })
              ) : noResults ? (
                <div className="flex flex-col justify-center items-center space-y-2 w-full">
                  <img
                    src={NotFoundArt}
                    className="h-32 md:h-[300px] w-32 md:w-[300px]"
                  />
                  <CardDescription>Nenhum usuário encontrado</CardDescription>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <CardDescription className="text-foreground uppercase">Sugestões para você</CardDescription>
                  <UserSuggestions removeUserId={userData._id} />
                </div>
              )}
            </div>
        ) : null}
      </Card>
    </form>
  );
};

const SearchPage = () => {
  const decodedObj = decodeToken(localStorage.getItem('token') ?? '')
  const userData = decodedObj?.user
  return (
    <>
      <NavBar user={userData} avatarPath={userData?.avatar} />

      <main className="flex flex-col justify-center items-center py-2 h-full w-full">
        <SearchLayout />
      </main>

      <BottomBar />
    </>
  );
};

export default SearchPage;