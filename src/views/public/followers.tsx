import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import { SearchUserCard } from "../../components/user-card";

import { Card, CardContent, CardDescription } from "../../components/ui/card";

import NoHaveArt from "../../../public/images/no_have_art.png";

interface User {
  _id: string;
  nickname: string;
  avatar: string;
  userName: string;
  type: string;
}

const FollowersLayout = () => {
  const { id } = useParams<string>();

  const [followersUsers, setFollowersUsers] = React.useState<User[]>([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchFollowersUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_FOLLOWERS_USER
          }${id}`
        );

        if (response.data.followers) {
          setFollowersUsers(response.data.followers);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar usuários que está seguindo:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFollowersUsers();
    }
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <Card className="select-none mt-2 w-full md:w-6/12">
        <CardContent>
          {followersUsers.length > 0 ? (
            followersUsers.map((user) => (
              <SearchUserCard
                key={user._id}
                avatar={user.avatar}
                type={user.type}
                userName={user.userName}
                nickname={user.nickname}
                _id={user._id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center space-y-2 w-full">
              <img
                src={NoHaveArt}
                className="h-32 md:h-[300px] w-32 md:w-[300px]"
                alt="Nenhum"
              />
              <CardDescription className="text-center">
                Esté usuário não está sendo seguindo ninguém.
              </CardDescription>
            </div>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const FollowingPage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title="Seguidores" />
      <main className="flex flex-col justify-center items-center h-full w-full">
        <FollowersLayout />
      </main>
    </React.Fragment>
  );
};

export default FollowingPage;
