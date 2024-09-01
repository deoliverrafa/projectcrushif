import { useCallback, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

import SearchUserCard from "../components/user/searchUserCard.tsx";

import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card.tsx";

import { getUserData } from "../utils/getUserData.tsx";

import { ScanSearch, Search } from "lucide-react";

interface User {
  nickname: string;
  userName: string;
  avatar: string;
  type: string;
  _id: string;
  isFollowing: boolean;
}

export const SearchLayout = () => {
  const userData = getUserData();

  const [formData, setFormData] = useState({
    nickname: "",
    token: localStorage.getItem("token"),
  });

  const [queryResponse, setQueryResponse] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ nickname: value, token: localStorage.getItem("token") });
  };

  const fetchData = useCallback(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_SEARCH_PAGE_USER
        }
      `,
        formData
      )
      .then((response: any) => {
        setQueryResponse(
          response.data.usersFinded.map((user: any) => ({
            ...user,
            isFollowing: user.isFollowing || false, // Defina o valor padrão
          }))
        );
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  }, [formData]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debounceFetchData();
  };

  const debounceFetchData = useCallback(debounce(fetchData, 500), [formData]);

  console.log(userData.following);

  return (
    <form
      action="searchUser"
      method="post"
      onSubmit={handleFormSubmit}
      className="flex flex-col items-center w-full"
    >
      <Card className="w-full md:w-6/12">
        <CardHeader>
          <CardTitle className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest text-2xl md:text-5xl">
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

            <Button variant={"default"} size="icon">
              <Search className="size-4" />
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          {queryResponse.length > 0 ? (
            queryResponse.map((user: User) => {
              console.log("Id do card:", user._id);

              const isFollowing = userData.following.some((followingId) => {
                console.log("Id do array:", followingId);
                return followingId === user._id;
              });
              console.log(isFollowing);

              return (
                <SearchUserCard
                  avatar={user.avatar}
                  nickname={user.nickname}
                  userName={user.userName}
                  type={user.type}
                  _id={user._id}
                  following={isFollowing}
                  key={user._id}
                />
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2 w-full">
              <ScanSearch className="text-slate-500 dark:text-slate-400 size-14" />
              <CardDescription className="text-default font-inter font-medium text-tiny text-center w-full">
                Procure por um usário válido.
              </CardDescription>
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};
