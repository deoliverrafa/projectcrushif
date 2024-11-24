import React, { useCallback, useEffect, useState } from "react";
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
} from "../../components/ui/card.tsx";
import { ScrollArea } from "../../components/ui/scroll-area.tsx";

import NotFoundArt from "../../../public/images/not_found_art.png";

import { getStatusUser } from "../../utils/getStatusUser.tsx";
import decodeToken from "../../utils/decodeToken.tsx";
import { getUserData } from "../../utils/getUserData.tsx";
import { User } from "../../interfaces/userInterface.ts";

const SearchLayout = () => {
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );

  const [formData, setFormData] = useState({
    nickname: "",
    token: localStorage.getItem("token"),
  });

  const [queryResponse, setQueryResponse] = useState<User[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [userData] = useState<User>(getUserData);
  const [noResults, setNoResults] = useState(false);

  
  const fetchSuggestedUsers = useCallback(() => {
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

  const fetchData = useCallback(
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
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    },
    [formData.token]
  );

  const debounceFetchData = useCallback(debounce(fetchData, 1000), [fetchData]);

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

  useEffect(() => {
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
          <CardTitle className="text-primary uppercase tracking-widest text-2xl md:text-5xl">
            Pesquisar
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-row justify-between items-center space-x-2 w-full">
            <div className="flex flex-col justify-center w-full">
              <Input
                type="search"
                placeholder="Procure"
                className="font-inter font-medium"
                name="query"
                id="query"
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardContent>
        {queryResponse.length > 0 && (
          <p className="font-poppins font-medium md:font-normal tracking-wide text-md md:text-sm text-muted-foreground">
            {queryResponse.length === 1 ? (
              <div className="flex flex-row items-center ml-4">
                <CardDescription>Resultado</CardDescription>
              </div>
            ) : queryResponse.length > 1 ? (
              <div className="flex flex-row items-center ml-4">
                <CardDescription>Resultados</CardDescription>
              </div>
            ) : (
              ""
            )}
          </p>
        )}

        {queryResponse.length > 0 || suggestedUsers.length > 0 ? (
          <ScrollArea className="h-96 w-full rounded-md">
            <div className="p-4">
              {queryResponse.length > 0 ? (
                queryResponse.map((user: User) => {
                  const isFollowing = userData?.following.some(
                    (followingId) => followingId === user._id
                  );
                  return (
                    <>
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
                  <CardDescription>Sugestões para você</CardDescription>
                  <UserSuggestions removeUserId={userData._id} />
                </div>
              )}
            </div>
          </ScrollArea>
        ) : null}
      </Card>
    </form>
  );
};

const SearchPage = () => {
  const decodedObj = decodeToken(localStorage.getItem("token") ?? "");
  const userData = decodedObj?.user;
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
