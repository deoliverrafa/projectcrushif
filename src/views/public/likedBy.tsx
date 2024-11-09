import * as React from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import { SearchUserCard } from "../../components/user-card";

import { Card, CardContent, CardDescription } from "../../components/ui/card";

import NoHaveArt from "../../../public/images/no_have_art.png";

import { getUserDataById } from "../../utils/getUserDataById";
import { getStatusUser } from "../../utils/getStatusUser";

interface User {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  avatar: string;
  userName: string;
  following: boolean;
  type: string;
}

const LikedByLayout = () => {
  const { id } = useParams<string>();
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  const [viewingUser, setViewingUser] = React.useState<User | null>(null);
  const [likedUsers, setLikedUsers] = React.useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = React.useState(true);

  React.useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(id);
        setViewingUser(data);

        const usersPromises = data.likedBy.map((userId: string) =>
          getUserDataById(userId)
        );
        const users = await Promise.all(usersPromises);
        setLikedUsers(users);
      } catch (error) {
        console.error("Error fetching viewing post data:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (id) {
      fetchViewingUserData();
    }
  }, [id]);

  getStatusUser(userId);

  if (!viewingUser) {
    return <LoadingPage />;
  }

  if (loadingUsers) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <Card className="select-none mt-2 w-full md:w-6/12">
        <CardContent>
          {likedUsers.length > 0 ? (
            likedUsers.map((user) => (
              <SearchUserCard
                key={user._id}
                avatar={user.avatar}
                nickname={user.nickname}
                userName={user.userName}
                type={user.type}
                _id={user._id}
                following={user.following}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2 w-full">
              <img
                src={NoHaveArt}
                className="h-32 md:h-[300px] w-32 md:w-[300px]"
                alt="404"
              />
              <CardDescription>Nenhum usuário curtiu esse perfil</CardDescription>
            </div>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const LikedByPage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title="Curtidas" />
      <main className="flex flex-col justify-center items-center h-full w-full">
        <LikedByLayout />
      </main>
    </React.Fragment>
  );
};

export default LikedByPage;
