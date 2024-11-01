import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";

import { NavBarReturn } from "../../components/navbar";
import { CardPost } from "../../components/post";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

import { SpinnerSolid } from "@mynaui/icons-react";

interface CardProps {
  _id: string;
  content: string;
  isAnonymous: boolean;
  photoURL: string;
  insertAt: Date;
  userId: string;
  likeCount: number;
  commentCount: number;
  likedBy: string[];
  mentionedUsers: string[];
}

const SavedLayout = ({ savedPosts }: { savedPosts: CardProps[] }) => {
  return (
    <React.Fragment>
      {savedPosts.map((post) => (
        <CardPost
          key={post._id}
          userId={post.userId}
          _id={post._id}
          content={post.content}
          isAnonymous={post.isAnonymous}
          photoURL={post.photoURL}
          insertAt={post.insertAt}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          likedBy={post.likedBy}
          mentionedUsers={post.mentionedUsers}
          id={post._id}
        />
      ))}
    </React.Fragment>
  );
};

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = React.useState<CardProps[]>([]);
  const [skip, setSkip] = React.useState(0);
  const [limit] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [finishedPosts, setFinishedPosts] = React.useState(false);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}${
            import.meta.env.VITE_POST_SAVED
          }${token}/${skip}/${limit}`
        );

        if (response.data.likedPosts.length === 0) {
          setFinishedPosts(true);
        } else {
          setSavedPosts((prevPosts) => [
            ...prevPosts,
            ...response.data.likedPosts,
          ]);
        }
      } catch (error) {
        console.error("Erro ao carregar posts salvos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!finishedPosts && token) {
      fetchSavedPosts();
    }
  }, [skip, finishedPosts, token]);

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
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, limit, finishedPosts]);

  return (
    <React.Fragment>
      <NavBarReturn title="Salvos" />

      <main className="w-full h-full flex flex-col justify-center items-center">
        {savedPosts.length === 0 && !loading ? (
          <Card className="mt-2 w-full md:w-6/12">
            <CardHeader className="space-y-0">
              <CardTitle>Sem publicações curtidas</CardTitle>

              <CardDescription>
                Você ainda não tem nenhum post salvo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explore novos conteúdos e curta as publicações que mais chamarem
                sua atenção! Suas curtidas aparecerão aqui para fácil acesso.
                Comece agora e salve suas postagens favoritas!
              </CardDescription>
            </CardContent>

            <CardFooter>
              <Link to={"/"}>
                <Button variant={"secondary"}>Voltar para inicio</Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <SavedLayout savedPosts={savedPosts} />
        )}

        {loading && (
          <div className="flex flex-row items-center mt-5">
            <SpinnerSolid className="animate-spin mr-2 h-5 w-5" />
            <p className="text-muted-foreground text-sm">Carregando...</p>
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default SavedPage;
