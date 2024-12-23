import * as React from "react";

import { NavBarReturn } from "../../components/navbar";
import { ChatUserCard } from "../../components/user-card";
import { Card, CardContent, CardDescription } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";

import { User } from "../../interfaces/userInterface";
import { getStatusUser } from "../../utils/getStatusUser.tsx";

import axios from "axios";

import LoadingPage from "./loading";

const MessagesLayout = () => {
  const [followingUsers, setFollowingUsers] = React.useState<User[]>([]);
  const userId = localStorage.getItem("userId")
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
  }, [userId]);
  
  getStatusUser(userId)
  
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <Card className="select-none mt-1 w-full md:w-6/12">
        {followingUsers.length > 0 ? (
           <div className="flex flex-row justify-between items-center">
            <CardDescription className="text-foreground ml-4 mt-4 uppercase">Contatos</CardDescription>
                
            <CardDescription className="mr-4 mt-4 text-xs md:text-xs">{followingUsers.length} contatos</CardDescription>
              </div>
        ) : null}
        
        <CardContent className="p-4">
          <ScrollArea className="h-screen md:h-96 w-full rounded-md">
          {followingUsers.map((user) => {
            return(
              <ChatUserCard 
              avatar={user.avatar} 
              type={user.type}
              status={user.status}
              _id={user._id}
              nickname={user.nickname}
              description="toque para conversar"
              />
            )
          })}
          {/* <ChatUserCard
            avatar={
              "http://res.cloudinary.com/dt6gk5vtg/image/upload/v1717360121/avatar/dlvyzeecstit3hcodt86.jpg"
            }
            type="Admin"
            status={"online"}
            _id={"65f5fb818358c58f940acd50"}
            nickname={"oliver"}
            description="2 novas mensagens"
          />

          <ChatUserCard
            avatar={
              "https://res.cloudinary.com/dt6gk5vtg/image/upload/v1730043005/avatar/tij2qb3aggwhs3dridlp.jpg"
            }
            type="Admin"
            status={"online"}
            _id={"666b00300b52f75271e9a272"}
            nickname={"tarlos"}
            description="1 nova mensagem"
          />

          <ChatUserCard
            avatar={
              "https://res.cloudinary.com/dt6gk5vtg/image/upload/v1724890013/avatar/wwthd5q5d7z9dziut4g9.jpg"
            }
            type="Plus"
            status={"offline"}
            _id={"664a4e1f1a3d34fb59e6ca88"}
            nickname={"BabyShark"}
            description="toque para conversar"
          /> */}
          </ScrollArea>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const MessagesPage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title={"Mensagens"} />

      <main className="flex flex-col justify-center items-center h-full w-full">
        <MessagesLayout />
      </main>
    </React.Fragment>
  );
};

export default MessagesPage;
