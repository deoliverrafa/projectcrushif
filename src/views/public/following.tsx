import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import { SearchUserCard } from "../../components/user-card";

import { Card, CardContent, CardDescription } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Input } from "../../components/ui/input";

import { InfoSolid } from "@mynaui/icons-react";

import Logo from "../../../public/images/logo/logo.png";
import NoHaveArt from "../../../public/images/no_have_art.png";

import { getStatusUser } from "../../utils/getStatusUser.tsx";
import { User } from "../../interfaces/userInterface.ts";
import { getUserData } from "../../utils/getUserData.tsx";

const FollowingLayout = () => {
  const { id } = useParams<string>();
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  const userData = getUserData();

  const [followingUsers, setFollowingUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_FOLLOWING_USER
          }${id}`
        );

        if (response.data.following) {
          setFollowingUsers(response.data.following);
          setFilteredUsers(response.data.following);
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

    if (id) {
      fetchFollowingUsers();
    }
  }, [id]);

  React.useEffect(() => {
    const filtered = followingUsers.filter(
      (user) =>
        user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, followingUsers]);

  getStatusUser(userId);

  if (loading || userData._id == "") {
    return <LoadingPage />;
  }

  const MenuNavbar = () => {
    return (
      <React.Fragment>
        <Drawer>
          <DrawerTrigger>
            <InfoSolid />
          </DrawerTrigger>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Seguindo</DrawerTitle>
              </DrawerHeader>

              <div className="flex items-center gap-2 p-4 pb-0">
                <img className="h-14 w-14" src={Logo} alt="logo" />
                <DrawerDescription className="text-foreground">
                  {filteredUsers.length} usuários sendo seguidos por esté perfil
                  no Crush IF.
                </DrawerDescription>
              </div>

              <DrawerFooter>
                <DrawerDescription className="text-xs md:text-xs text-center">
                  Você está vendo os usuários sendo seguidos por esté perfil no
                  Crush IF.
                </DrawerDescription>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <NavBarReturn title="Seguindo" menu={<MenuNavbar />} />

      <main className="flex flex-col justify-center items-center h-full w-full">
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
                <CardDescription className="text-foreground mt-6 uppercase">
                  Seguindo
                </CardDescription>

                <CardDescription className="mt-6 text-xs md:text-xs">
                  {followingUsers.length} seguindo
                </CardDescription>
              </div>
            ) : null}

            {filteredUsers.length > 0 ? <Separator className="my-2" /> : null}

            {filteredUsers.length > 0 && userData._id != "" ? (
              filteredUsers.map((user) => {
                const isFollowing = userData?.following.some(
                  (followingId) => followingId === user._id
                );                
                return (
                  <SearchUserCard
                    key={user._id}
                    avatar={user.avatar}
                    type={user.type}
                    userName={user.userName}
                    nickname={user.nickname}
                    _id={user._id}
                    status={user.status}
                    following={isFollowing}
                  />
                );
              })
            ) : (
              <div className="flex flex-col justify-center items-center space-y-2 w-full">
                <img
                  src={NoHaveArt}
                  className="h-32 md:h-[300px] w-32 md:w-[300px]"
                  alt="404"
                />
                <CardDescription>
                  Esté usuário não está seguindo
                </CardDescription>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </React.Fragment>
  );
};

const FollowingPage = () => {
  return (
    <React.Fragment>
      <FollowingLayout />
    </React.Fragment>
  );
};

export default FollowingPage;
