import * as React from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import { CardPost } from "../../components/post";

interface Post {
  className?: string;
  userId?: string;
  _id?: string;
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL?: string;
  userAvatar?: string;
  insertAt?: string;
  id?: string;
  likeCount: number;
  likedBy: String[];
  commentCount: number;
}

import { getPostDataById } from "../../utils/getPostDataById";

const PostLayout = () => {
  const { id } = useParams<string>();
  const [viewingPost, setViewingPost] = React.useState<Post | null>(null);

  React.useEffect(() => {
    const fetchViewingPostData = async () => {
      try {
        const data = await getPostDataById(id);
        setViewingPost(data);
      } catch (error) {
        console.error("Error fetching viewing post data:", error);
      }
    };

    if (id) {
      fetchViewingPostData();
    }
  }, [id]);

  if (!viewingPost) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <CardPost
        key={id}
        _id={id}
        id={viewingPost.userId}
        campus={viewingPost.campus}
        content={viewingPost.content}
        email={viewingPost.email}
        isAnonymous={viewingPost.isAnonymous}
        nickname={viewingPost.nickname}
        references={viewingPost.references}
        userAvatar={viewingPost.userAvatar}
        photoURL={viewingPost.photoURL}
        userId={viewingPost.userId}
        insertAt={viewingPost.insertAt}
        likeCount={viewingPost.likeCount}
        likedBy={viewingPost.likedBy}
        commentCount={viewingPost.commentCount}
      />
    </React.Fragment>
  );
};

const PostPage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title={"Postagem"} />

      <main className="flex flex-col justify-center items-center h-full w-full">
        <PostLayout />
      </main>
    </React.Fragment>
  );
};

export default PostPage;
