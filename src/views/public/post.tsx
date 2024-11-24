import * as React from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "./loading";

import { NavBarReturn } from "../../components/navbar";
import { CardPost } from "../../components/post";

interface Post {
  className?: string;
  userId: string;
  _id: string;
  content: string;
  isAnonymous: boolean;
  photoURLs: string[];
  insertAt: Date;
  id?: string;
  likeCount: number;
  likedBy: string[];
  commentCount: number;
  mentionedUsers: string[];
}

import { getPostDataById } from "../../utils/getPostDataById";
import { getUserData } from "../../utils/getUserData";
import axios from "axios";

const PostLayout = () => {
  const { id } = useParams<string>();
  const [viewingPost, setViewingPost] = React.useState<Post | null>(null);
  const postId = id || "";
  const userData = getUserData();

  React.useEffect(() => {
    const fetchViewingPostData = async () => {
      if (postId) {
        try {
          const data = await getPostDataById(postId);
          setViewingPost(data);
        } catch (error) {
          console.error("Error fetching viewing post data:", error);
        }
      }
    };

    fetchViewingPostData();
  }, [postId]);

  if (!viewingPost) {
    return <LoadingPage />;
  }

  const deletePostFromState = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_DELETE
        }`,
        { data: { postId, token } }
      );
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  const followingMentionedUsers = viewingPost.mentionedUsers.map(
    (mentionedId) => userData.following.includes(mentionedId)
  );
  const isFollowingUserPost = userData.following.includes(viewingPost.userId);

  return (
    <React.Fragment>
      <CardPost
        key={postId}
        _id={postId}
        id={viewingPost.userId}
        content={viewingPost.content}
        isAnonymous={viewingPost.isAnonymous}
        photoURLs={viewingPost.photoURLs}
        userId={viewingPost.userId}
        insertAt={viewingPost.insertAt}
        likeCount={viewingPost.likeCount}
        likedBy={viewingPost.likedBy}
        commentCount={viewingPost.commentCount}
        mentionedUsers={viewingPost.mentionedUsers}
        followingMentionedUsers={followingMentionedUsers}
        isFollowingUserPost={isFollowingUserPost}
        onDelete={deletePostFromState}
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
