import * as React from "react";
import axios from "axios";
import { debounce } from "lodash";

import { NavBarReturn } from "../../components/navbar";
import { CardPost } from "../../components/post";

import {
  Card,
  CardContent,
  CardDescription,
} from "../../components/ui/card";

import { SpinnerSolid } from "@mynaui/icons-react";

import NoHaveArt from "../../../public/images/no_have_art.png";

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
            <CardContent className="flex flex-col justify-center items-center space-y-2 w-full">
              <img
                src={NoHaveArt}
                className="h-32 md:h-[300px] w-32 md:w-[300px]"
                alt="404"
              />
              <CardDescription>Sem publicações curtidas</CardDescription>
            </CardContent>
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
