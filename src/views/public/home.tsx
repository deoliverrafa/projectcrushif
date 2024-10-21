import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

import LoadingPage from "./loading.tsx";

import { NavBar } from "../../components/navbar.tsx";
import { BottomBar } from "../../components/bottombar.tsx";
import { Fab } from "../../components/ui/fab.tsx";
import { CardPost } from "../../components/post.tsx";

import { LoaderCircle } from "lucide-react";
import { Plus } from "@mynaui/icons-react";

const localAvatarPath = localStorage.getItem("avatar") ?? "";

interface CardProps {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL: string;
  userAvatar: string;
  insertAt: string;
  userId: string;
  type: string;
  likeCount: number;
  likedBy: String[];
}

interface userData {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  avatar: string;
  following: string[];
}

export default function HomePage() {
  const [userData, setUserData] = useState<userData | null>(null);
  const [finishedPosts, setFinishedPosts] = useState(false);
  const [posts, setPosts] = useState<CardProps[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [skip, finishedPosts]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        !finishedPosts
      ) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, limit, finishedPosts]);

  return (
    <>
      {userData ? (
        <div className="flex flex-col">
          <NavBar
            user={userData}
            avatarPath={userData.avatar || localAvatarPath}
          />

          <main className="w-full h-full flex flex-col justify-center items-center">
            {posts.map((post) => (
              <CardPost
                key={post._id}
                _id={post._id}
                id={post.userId}
                campus={post.campus}
                content={post.content}
                email={post.email}
                isAnonymous={post.isAnonymous}
                nickname={post.nickname}
                references={post.references}
                userAvatar={post.userAvatar}
                photoURL={post.photoURL}
                userId={post.userId}
                insertAt={post.insertAt}
                likeCount={post.likeCount}
                likedBy={post.likedBy}
              />
            ))}

            {loading && (
              <div className="flex flex-row items-center">
                <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
                <p>Carregando...</p>
              </div>
            )}
          </main>

          <div className="mt-10"></div>

          <Link to={"/publish"}>
            <Fab>
              <Plus className="h-8 w-8 md:h-7 md:w-7" />
            </Fab>
          </Link>

          <BottomBar />
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
