import * as React from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import SearchUserCard from "../../components/user-card";

import { Card, CardContent } from "../../components/ui/card";
import { getPostDataById } from "../../utils/getPostDataById";
import { getUserDataById } from "../../utils/getUserDataById";

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
}

const LikedByLayout = () => {
  const { id } = useParams<string>();
  const [viewingPost, setViewingPost] = React.useState<Post | null>(null);
  const [likedUsers, setLikedUsers] = React.useState<User[]>([]);
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

  if (!viewingPost) {
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
                type="normal"
                _id={user._id}
                following={user.following}
              />
            ))
          ) : (
            <p>Nenhum usuário curtiu esta postagem.</p>
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