import * as React from "react";
import axios from "axios";
import {
  debounce
} from "lodash";
import {
  Link
} from "react-router-dom";
import {
  Toaster
} from "../../components/ui/toaster.tsx"
import {
  useToast
} from "../../hooks/use-toast.ts"

import LoadingPage from "./loading.tsx";

import {
  NavBar
} from "../../components/navbar.tsx";
import {
  BottomBar
} from "../../components/bottombar.tsx";
import {
  Fab
} from "../../components/ui/fab.tsx";
import {
  CardPost
} from "../../components/post.tsx";
import {
  UserFollowing
} from "../../components/userSuggestions.tsx"

import {
  PlusSolid,
  SpinnerSolid
} from "@mynaui/icons-react";

import {
  getStatusUser
} from "../../utils/getStatusUser.tsx";
import {
  User
} from "../../interfaces/userInterface.ts";

const localAvatarPath = localStorage.getItem("avatar") ?? "";

interface CardProps {
  _id: string;
  content: string;
  isAnonymous: boolean;
  photoURLs: string[];
  videoURLs: string[];
  insertAt: Date;
  userId: string;
  likeCount: number;
  commentCount: number;
  likedBy: string[];
  favoritedBy: string[];
  mentionedUsers: string[];
}

export default function HomePage() {
  const [userData,
    setUserData] = React.useState < User | null > (null);
  const [finishedPosts,
    setFinishedPosts] = React.useState(false);
  const [posts,
    setPosts] = React.useState < CardProps[] > ([]);
  const [skip,
    setSkip] = React.useState(0);
  const [limit] = React.useState(5);
  const [loading,
    setLoading] = React.useState(false);

  const [userId] = React.useState < string | null > (
    localStorage.getItem("userId")
  );

  const {
    toast
  } = useToast()

  const deletePostFromState = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_POST_DELETE}`,
        {
          data: {
            postId, token
          }
        }
      );

      if (response.data.deleted) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        console.error("Erro ao deletar post:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };


  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/auth/login";
    }

    async function getUserData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_USER_TOKEN
          }${token}`
        );
        setUserData(response.data.userFinded);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.data.validToken === false
        ) {
          window.location.href = "/auth/login";
        }
      }
    }

    getUserData();
  },
    []);

  React.useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_GET
          }${token}/${skip}/${limit}`
        );

        if (response.data.validToken === false) {
          window.location.href = "/auth/login";
        }
        if (response.data.posts.length === 0) {
          setFinishedPosts(true);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        }
      } catch (error) {
        console.log("Erro ao buscar posts", error);
      } finally {
        setLoading(false);
      }
    }

    if (!finishedPosts) {
      getPosts();
    }
  },
    [skip,
      finishedPosts]);

  getStatusUser(userId);

  React.useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        !loading &&
        !finishedPosts
      ) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    },
      200);

    window.addEventListener("scroll",
      handleScroll);
    return () => window.removeEventListener("scroll",
      handleScroll);
  }, [loading, limit, finishedPosts]);

  React.useEffect(() => {
    if (localStorage.getItem("welcome") === "true" && userData?.nickname) {
      toast( {
        title: `Bem-vindo de volta, ${userData.nickname}`,
        description: `Ficamos felizes em ver você de novo! Seus dados foram atualizados com sucesso.`,
      });

      setTimeout(() => {
        localStorage.removeItem("welcome");
      }, 5000);
    }
  },
    [userData]);
    
  return (
    <>
      {userData ? (
        <div className="flex flex-col">
          <NavBar
            user={userData}
            avatarPath={userData.avatar || localAvatarPath}
            />
          <main className="w-full h-full flex flex-col justify-center items-center">
            <UserFollowing />

            {posts.map((post) => {

              const followingMentionedUsers = post.mentionedUsers.map((mentionedId) =>
                userData.following.includes(mentionedId)
              );
              const isFollowingUserPost = userData.following.includes(post.userId);

              return (
                <CardPost
                  key={post._id}
                  _id={post._id}
                  id={post.userId}
                  content={post.content}
                  isAnonymous={post.isAnonymous}
                  photoURLs={post.photoURLs}
                  videoURLs={post.videoURLs}
                  userId={post.userId}
                  insertAt={post.insertAt}
                  likeCount={post.likeCount}
                  likedBy={post.likedBy}
                  favoritedBy={post.favoritedBy}
                  commentCount={post.commentCount}
                  mentionedUsers={post.mentionedUsers}
                  followingMentionedUsers={followingMentionedUsers}
                  isFollowingUserPost={isFollowingUserPost}
                  onDelete={deletePostFromState}
                  />
              );
            })}

            {loading && (
              <div className="flex flex-row items-center">
                <SpinnerSolid className="animate-spin text-primary mr-2 h-5 w-5" />
                <p className="text-primary text-sm">
                  Carregando...
                </p>
              </div>
            )}

            <Toaster />
          </main>

          <div className="mt-10"></div>

          <Link to={"/publish"}>
            <Fab>
              <PlusSolid className="h-8 w-8 md:h-7 md:w-7" />
            </Fab>
          </Link>

          <BottomBar />
        </div>
      ): (
        <LoadingPage />
      )}
    </>
  );
}