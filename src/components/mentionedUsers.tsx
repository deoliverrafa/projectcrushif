import * as React from "react";

import { SearchUserCard } from "./user-card";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

import { At, SpinnerSolid } from "@mynaui/icons-react";

import { getUserDataById } from "../utils/getUserDataById";
import { User } from "../interfaces/userInterface";

interface Comment {
  _id: string;
  content: string;
  insertAt: Date;
  userId: string;
  likeCount: number;
  isFollowing?: boolean;
  likedBy: string[];
  mentionedUsers: string[];
  followingMentionedUsers: boolean[];
}


export const MentionedUsers: React.FC<Comment> = (props) => {
  const [mentionedUsers, setMentionedUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [followingMentionedUsers, setFollowingMentionedUsers] = React.useState<
    boolean[]
  >(props.followingMentionedUsers);
  
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mentionedUserData = await Promise.all(
          props.mentionedUsers.map(getUserDataById)
        );
        setMentionedUsers(mentionedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (props.userId) {
      fetchUserData();
    }
  }, [props.userId, props.mentionedUsers]);

  // NÂO SEI OQ ESSA PORAR FAZ
  const toggleFollow = (index: number) => {
    setFollowingMentionedUsers((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <React.Fragment>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <At className="h-5 w-5" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Marcações</DrawerTitle>
            </DrawerHeader>

            {isLoading ? (
              <div className="flex flex-row items-center">
                <SpinnerSolid className="animate-spin mr-2 h-5 w-5" />
                <p className="text-muted-foreground text-sm">Carregando...</p>
              </div>
            ) : mentionedUsers.length > 0 ? (
              <ScrollArea className="h-72 w-full rounded-md">
                {mentionedUsers.map((user, index) => (
                  <SearchUserCard
                    key={user._id}
                    avatar={user.avatar}
                    nickname={user.nickname}
                    userName={user.userName}
                    type={user.type}
                    _id={user._id}
                    status={user.status}
                    following={followingMentionedUsers[index]}
                    onFollowToggle={() => {toggleFollow}}
                  />
                ))}
              </ScrollArea>
            ) : (
              <DrawerDescription>Nenhum usuário marcado</DrawerDescription>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};
