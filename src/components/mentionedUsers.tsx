import * as React from "react";

import { SearchUserCard } from "./user-card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

import { At, SpinnerSolid } from "@mynaui/icons-react";

import { getUserDataById } from "../utils/getUserDataById";

interface Comment {
  _id: string;
  content: string;
  insertAt: Date;
  userId: string;
  likeCount: number;
  isFollowing?: boolean
  likedBy: string[];
  mentionedUsers: string[];
}

interface User {
  _id: string;
  nickname: string;
  avatar: string;
  type: string;
  isFollowing: boolean;
}

export const MentionedUsers: React.FC<Comment> = (props) => {
  const [mentionedUsers, setMentionedUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  
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
  }, [props.userId, props.likedBy, props.mentionedUsers]);

  
  
  return (
    <React.Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <At className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marcações</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex flex-row items-center">
              <SpinnerSolid className="animate-spin mr-2 h-5 w-5" />
              <p className="text-muted-foreground text-sm">Carregando...</p>
            </div>
          ) : mentionedUsers.length > 0 ? (
            <ScrollArea className="h-72 w-full rounded-md">
              {mentionedUsers.map((user) => (
                <SearchUserCard
                  key={user._id}
                  avatar={user.avatar}
                  nickname={user.nickname}
                  type={user.type}
                  _id={user._id}
                  following={props.isFollowing}
                />
              ))}
            </ScrollArea>
          ) : (
            <DialogDescription>Nenhum usuário marcado</DialogDescription>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
