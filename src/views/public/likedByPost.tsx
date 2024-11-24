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

import { getPostDataById } from "../../utils/getPostDataById";
import { getUserDataById } from "../../utils/getUserDataById";
import { getStatusUser } from "../../utils/getStatusUser";

interface Post {
  _id: string;
  likedBy: string[];
}

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

const LikedByPostLayout = () => {
  const { id } = useParams<string>();
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  const [viewingPost, setViewingPost] = React.useState<Post | null>(null);
  const [likedUsers, setLikedUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [loadingUsers, setLoadingUsers] = React.useState(true);

  React.useEffect(() => {
    const fetchViewingPostData = async () => {
      try {
        const postData = await getPostDataById(id);
        setViewingPost(postData);

        const usersPromises = postData.likedBy.map((userId: string) =>
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
      fetchViewingPostData();
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

  if (!viewingPost) {
    return <LoadingPage />;
  }

  if (loadingUsers) {
    return <LoadingPage />;
  }

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

              <div className="flex items-center gap-2 p-4 pb-0">
                <img className="h-14 w-14" src={Logo} alt="logo" />
                <DrawerDescription className="text-foreground">
                  {filteredUsers.length} usuários curtiram está postagem no Crush IF.
                </DrawerDescription>
              </div>

              <DrawerFooter>
                <DrawerDescription className="text-xs md:text-xs text-center">
                  Você está vendo os usuários que curtiram está postagem no Crush IF.
                </DrawerDescription>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <NavBarReturn title="Curtidas" menu={<MenuNavbar />} />

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
      </main>
    </React.Fragment >
  );
};

const LikedByPostPage = () => {
  return (
    <React.Fragment>
      <LikedByPostLayout />
    </React.Fragment>
  );
};

export default LikedByPostPage;
