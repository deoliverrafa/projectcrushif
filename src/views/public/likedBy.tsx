import * as React from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import { SearchUserCard } from "../../components/user-card";

import { Card, CardContent, CardDescription } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../components/ui/drawer";
import { Input } from "../../components/ui/input";

import { InfoSolid } from "@mynaui/icons-react";

import Logo from "../../../public/images/logo/logo.png";
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
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
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
        setFilteredUsers(users);
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

  React.useEffect(() => {
    const filtered = likedUsers.filter((user) =>
      user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, likedUsers]);

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
          {filteredUsers.length > 0 ? (
            <div className="mt-6">
              <Input
                placeholder="Pesquisar"
                name="query"
                id="query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          ) : null}

          {filteredUsers.length > 0 ? (
            <div className="flex flex-row justify-between items-center">
              <CardDescription className="text-foreground mt-6 uppercase">Curtido por</CardDescription>

              <CardDescription className="mt-6 text-xs md:text-xs">{likedUsers.length} curtidas</CardDescription>
            </div>
          ) : null}

          {filteredUsers.length > 0 ? (
            <Separator className="my-2" />
          ) : null}

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
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

const MenuNavbar = () => {
  return (
    <React.Fragment>
      <Drawer>
        <DrawerTrigger asChild>
          <InfoSolid />
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Curtidas</DrawerTitle>
            </DrawerHeader>

            <div className="flex items-center justify-center p-4 pb-0">
              <img className="h-20 w-20" src={Logo} alt="logo" />
            </div>

            <DrawerFooter>
              <DrawerDescription className="text-center">
                Você está vendo as curtidas feitas pelos usuários no perfil do usuário do Crush IF.
              </DrawerDescription>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  )
}

const LikedByPage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title="Curtidas" menu={<MenuNavbar />} />
      <main className="flex flex-col justify-center items-center h-full w-full">
        <LikedByLayout />
      </main>
    </React.Fragment>
  );
};

export default LikedByPage;
