import * as React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { NavBarReturn } from "../../components/navbar.tsx";

import LoadingPage from "../../views/public/loading.tsx";

import { UserSuggestions } from "../../components/userSuggestions.tsx";
import { CardPost } from "../../components/post.tsx";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button.tsx";
import { Badge } from "../../components/ui/badge.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.tsx";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
  DropdownSeparator
} from "../../components/ui/dropdown.tsx";
import { Separator } from "../../components/ui/separator.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Input } from "../../components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../components/ui/tooltip.tsx";

// import { getUserData } from "../../utils/getUserData.tsx";
import { getUserDataById } from "../../utils/getUserDataById.tsx";
import { getStatusUser } from "../../utils/getStatusUser.tsx";
import { User } from "../../interfaces/userInterface.ts";
import { toggleFollow } from "../../utils/followUtils.tsx";
import { getUserData } from "../../utils/getUserData.tsx";

import {
  HeartWavesSolid,
  ShareSolid,
  MessageSolid,
  CopySolid,
  FolderSlashSolid,
  HeartSolid,
  HeartBrokenSolid,
  CheckSquareOneSolid,
  UserPlusSolid,
  UserCheckSolid,
  UserCircleSolid,
  EditOneSolid,
  FlagOneSolid,
  SpinnerSolid,
  DotsVerticalSolid,
  At,
  BrandInstagramSolid,
  BrandFacebookSolid,
  BrandXSolid
} from "@mynaui/icons-react";

import UserIcon from "../../../public/images/user.png";

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

const ProfileLayout = () => {
  const currentUser = getUserData();
  const [viewingUser, setViewingUser] = React.useState<User | undefined>(
    undefined
  );
  const { id } = useParams<string>();
  const [userId] = React.useState<string>(localStorage.getItem("userId") ?? "");

  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);

  const [skip, setSkip] = React.useState(0);
  const [limit] = React.useState(5);
  const [hasMorePosts, setHasMorePosts] = React.useState(true);
  const [posts, setPosts] = React.useState<Post[]>([]);
  
  const [showFullBio, setShowFullBio] = React.useState(false);
  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  const [loading, setLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [openShare, setOpenShare] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
      } catch (error) {
        console.error("Erro ao copiar para área de transferência: ", error);
      }
    }
  };

  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  React.useEffect(() => {
  const fetchViewingUserData = async () => {
    try {
      const data = await getUserDataById(id);
      setViewingUser(data);

      if (data.likedBy.includes(userId || "")) {
        setLiked(true);
      }

      setLikeCount(data.likeCount);
      await fetchPosts(data._id);
    } catch (error) {
      console.error("Error fetching viewing user data:", error);
    }
  };

  if (id) {
    fetchViewingUserData();
  }
}, [id, currentUser, userId]);

  const fetchPosts = async (userId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_GET_USER
        }${userId}/${skip}/${limit}`
      );

      if (response.data.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        setSkip((prevSkip) => prevSkip + limit);
        setHasMorePosts(true);
      } else {
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
      setHasMorePosts(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 // Modificado para -10
      ) {
        if (!loading && hasMorePosts) {
          fetchPosts(viewingUser?._id || "");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMorePosts, viewingUser]);

  const handleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);

    if (newLiked) {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_LIKE}`,
        { token: localStorage.getItem("token"), userId: viewingUser?._id }
      );
      setLikeCount(likeCount + 1);
    } else {
      axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_USER_UNLIKE
        }`,
        { token: localStorage.getItem("token"), userId: viewingUser?._id }
      );
      setLikeCount(likeCount - 1);
    }
  };

  getStatusUser(userId);

  // Follow Logic
  const token = localStorage.getItem("token");

  const [followedUser, setFollowedUser] = React.useState<boolean>(false);
  const [NFollowing, setNFollowing] = React.useState(0);

  React.useEffect(() => {
    if (userId && viewingUser?.followers) {
      setFollowedUser(viewingUser.followers.includes(userId));
      setNFollowing(viewingUser.Nfollowers);
    }
  }, [userId, viewingUser?.followers]);

  const handleFollowToggle = () => {
    if (token) {
      toggleFollow({
        userId: viewingUser?._id,
        token,
        followed: followedUser,
        setFollowedUser,
      }).then((response: any) => {
        if (response.data.unfollowed) {
          setNFollowing(NFollowing - 1);
        } else {
          setNFollowing(NFollowing + 1);
        }
      });
    }
  };

  // DELETE POST

  const deletePostFromState = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_POST_DELETE}`,
        { data: { postId, token } }
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
  
  const [likedByUsers, setLikedByUsers] = React.useState<User[]>([]);

const isUserFollowed = (user: User) => {
  return currentUser?.following?.includes(user._id);
};

const fetchLikedByUsers = async () => {
  if (viewingUser?.likedBy?.length) {
    try {
      const userIds = viewingUser?.likedBy.slice(0, 3);
      const userPromises = userIds.map((id) => getUserDataById(id));
      const users = await Promise.all(userPromises);

      const filteredUsers = users.filter(
        (user) => user._id !== currentUser?._id && isUserFollowed(user)
      );

      setLikedByUsers(filteredUsers);
    } catch (error) {
      console.error("Erro ao buscar dados dos curtidores:", error);
    }
  }
};

React.useEffect(() => {
  fetchLikedByUsers();
}, [viewingUser?.likedBy]);
  
  if (!currentUser || !viewingUser) {
    return <LoadingPage />;
  }
  
  const isOwnProfile = currentUser._id === viewingUser?._id;
  
  const MenuNavbar = () => {
    return (
      <React.Fragment>
        <Dropdown>
          <DropdownTrigger>
            <DotsVerticalSolid className="h-8 w-8" />
          </DropdownTrigger>
          
          <DropdownContent>
            <DropdownLabel>
              Menu
            </DropdownLabel>
            
            <DropdownItem
              onClick={handleLike}
              className="px-4"
            >
              {liked ? (
                <>
                <HeartSolid className="text-primary h-5 w-5 mr-2" />
                {likeCount} Curtidas
                </>
              ) : (
                <>
                <HeartBrokenSolid className="h-5 w-5 mr-2" />
                {likeCount} Curtidas
                </>
              )}
            </DropdownItem>
            
            {!isOwnProfile && (
              <DropdownItem
                className="justify-start items-center w-full px-4"
                onClick={handleFollowToggle}
              > {followedUser ? (
                  <>
                  <UserCheckSolid className="h-5 w-5 mr-2" />
                  Seguindo
                  </>
                ) : (
                  <>
                  <UserPlusSolid className="h-5 w-5 mr-2" />
                  Seguir
                  </>
                )}
              </DropdownItem>
            )}
            
            <DropdownSeparator />
            
            <DropdownItem
              className="justify-start items-center w-full px-4"
              onClick={() => setOpenShare(true)}
            >
              <ShareSolid className="h-5 w-5 mr-2" />
              Compartilhar
            </DropdownItem>
            
            <Link to={`/about/${viewingUser._id}`}>
              <DropdownItem className="justify-start items-center w-full px-4" >
                <UserCircleSolid className="h-5 w-5 mr-2" />
                  Sobre
              </DropdownItem>
            </Link>
            
            <DropdownSeparator />
            
            {isOwnProfile && (
              <Link to={"/profile/edit"}>
                <DropdownItem
                  className="text-danger justify-start items-center w-full px-4"
                >
                  <EditOneSolid className="h-5 w-5 mr-2" />
                    Editar
                </DropdownItem>
              </Link>
            )}
            
            {!isOwnProfile && (
              <DropdownItem
                className="text-danger justify-start items-center w-full px-4"
              >
                <FlagOneSolid className="h-5 w-5 mr-2" />
                Reportar
              </DropdownItem>
            )}
          </DropdownContent>
        </Dropdown>
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment>
      <NavBarReturn title={"Perfil"} menu={<MenuNavbar />} />
      
      <Card className="select-none mt-2 w-full md:w-6/12">
        <div className="relative w-full h-40">
          <img
            src={
              viewingUser?.banner
                ? viewingUser?.banner
                : "https://img.freepik.com/fotos-premium/fundo-abstrato-da-lua-em-cores-esteticas-generative-ai_888418-6857.jpg?w=996"
            }
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-[-30px] left-4">
            <div className="relative">
            <Avatar className="h-20 w-20 shadow-lg border-4 border-border rounded-full">
              <AvatarFallback>{viewingUser.nickname}</AvatarFallback>
              <AvatarImage
                className="object-cover"
                src={viewingUser.avatar ? viewingUser.avatar : UserIcon}
              />
            </Avatar>
            
            <div className="pulse-status-container bottom-1 right-3 rounded-full text-xs absolute">
              <span className={`pulse-status ${viewingUser?.status === "online" ? "bg-success/70" : "bg-secondary/70"}`}></span>
              <span className={`pulse-status-core h-3.5 w-3.5 ${viewingUser?.status === "online" ? "bg-success" : "bg-secondary"}`}></span>
            </div>
            </div>
          </div>
        </div>

        <CardHeader className="flex flex-row justify-between items-center mt-8">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between items-center w-full my-0.5">
              <CardDescription className="flex flex-row items-center text-foreground font-bold md:font-semibold text-sm md:text-sm truncate max-w-72">
                <At className="h-4 w-4" />
                {viewingUser.nickname
                  ? `${viewingUser.nickname}`
                  : "indisponível"}
              </CardDescription>
              
              <Badge variant={"outline"} className="text-muted-foreground w-fit">
                {viewingUser?.type}
                <HeartWavesSolid
                  className={`${
                    viewingUser?.type === "Plus"
                      ? "text-info"
                      : viewingUser?.type === "Admin"
                      ? "text-danger"
                      : viewingUser?.type === "verified"
                      ? "text-success"
                      : "hidden"
                  } ml-1 h-3.5 w-3.5`}
                />
              </Badge>
            </div>
            
            <CardTitle className="my-0.5 text-foreground truncate max-w-72">
              {viewingUser.userName
                ? viewingUser.userName
                : "Nome indisponível"}
            </CardTitle>
            
          {viewingUser.bio && (
            <div className="my-0.5">
              <CardDescription className="text-foreground text-xs md:text-xs">
                {viewingUser?.bio ? (
                <>
                  {showFullBio ? (
                    viewingUser?.bio
                  ) : (
                  `${viewingUser?.bio.slice(0, 50)}${viewingUser?.bio.length > 50 ? "" : ""}`
                  )}
                  {viewingUser.bio.length > 50 && (
                  <span
                    onClick={toggleBio}
                    className="text-muted-foreground tracking-tight font-normal md:font-light cursor-pointer"
                  >
                    {showFullBio ? " ...ver menos" : " ...ver mais"}
                  </span>
                  )}
                </>
                ) : (
                <></>
                )}
              </CardDescription>
            </div>
          )}
            
            {viewingUser.link && (
            <div className="flex flex-row justify-start items-center my-0.5">
              <Link className="text-primary font-bold md:font-semibold underline text-xs md:text-xs" to={viewingUser.link}>
              https://www.crushif.vercel.app/
              </Link>
            </div>
            )}
            
            {viewingUser.instagram || viewingUser.facebook || viewingUser.twitter && (
            <div className="flex flex-row justify-start gap-2 items-center my-0.5">
              <Button variant={"outline"} size={"icon"}>
                <BrandInstagramSolid />
              </Button>
              
              <Button variant={"outline"} size={"icon"}>
                <BrandFacebookSolid />
              </Button>
              
              <Button variant={"outline"} size={"icon"}>
                <BrandXSolid />
              </Button>
            </div>
            )}
            
            <div className="flex flex-row justify-start items-center my-0.5">
            {Array.isArray(likedByUsers) && likedByUsers.length > 0 ? (
                <Link to={`/likedBy/${viewingUser._id}`} className="flex flex-row items-center gap-1 w-fit">
                  <div className="flex -space-x-3 *:ring *:ring-background">
                   {likedByUsers.map((friend, index) => (
                      <Avatar key={`${friend._id}-${index}`} className="h-6 w-6 shadow-lg border border-border">
                  <AvatarFallback>
                    {friend.nickname ? friend.nickname.slice(0, 2) : ""}
                  </AvatarFallback>
                    <AvatarImage
                      className="object-cover"
                      src={friend.avatar ? friend.avatar : UserIcon}
                    />
              </Avatar>
              ))}
            </div>
            
            <CardDescription className="text-xs md:text-xs">
        Curtido(a) por{" "}
        {likedByUsers.map((friend, index) => (
          <span key={`${friend._id}-${index}`} className="text-foreground">
            {friend.nickname}
            {index < likedByUsers.length - 1 ? ", " : ""}
          </span>
        ))}{" "}
        {viewingUser.likedBy.length - likedByUsers.length > 0 && (
          <>
            e {viewingUser.likedBy.length - likedByUsers.length > 1
                ? "outras"
                : "outra"}{" "}
            <span className="text-foreground">
              {viewingUser.likedBy.length - likedByUsers.length}{" "}
              {viewingUser.likedBy.length - likedByUsers.length > 1
                ? "pessoas"
                : "pessoa"}
            </span>
          </>
        )}
      </CardDescription>
      </Link>
      ) : (
      <Link to={`/likedByPost/${viewingUser._id}`} className="w-fit">
      <CardDescription className="text-xs md:text-xs">
        Curtido(a) por{" "}
        <span className="text-foreground">
          {viewingUser.likedBy.length}{" "}
          {viewingUser.likedBy.length > 1 ? "pessoas" : "pessoa"}
        </span>
      </CardDescription>
    </Link>
      )}
            </div>
          </div>
        </CardHeader>

        <Separator className="mb-5" />

        <CardContent className="space-y-6">
          <div className="flex flex-row justify-evenly items-center">
            <Link
              to={`/followers/${viewingUser._id}`}
              className="flex flex-col items-center"
            >
              <CardTitle className="text-foreground">{NFollowing}</CardTitle>

              <CardDescription className="text-foreground">Seguidores</CardDescription>
            </Link>

            <Separator className="h-10" orientation="vertical" />

            <Link
              to={`/following/${viewingUser._id}`}
              className="flex flex-col items-center"
            >
              <CardTitle className="text-foreground">{viewingUser.Nfollowing}</CardTitle>

              <CardDescription className="text-foreground">Seguindo</CardDescription>
            </Link>
          </div>

          <div className="flex flex-row justify-center items-center space-x-1">
            {isOwnProfile && (
              <Link
                className="flex justify-center items-center w-full"
                to="/profile/edit"
              >
                <Button variant={"outline"} className="w-full">
                  Editar
                </Button>
              </Link>
            )}

            {!isOwnProfile && (
              <Button
                variant={"outline"}
                className="w-full"
                onClick={handleFollowToggle}
              >
                {followedUser ? "Seguindo" : "Seguir"}
              </Button>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {!isOwnProfile && (
                    <Link to={`/message/${viewingUser._id}`}>
                      <Button variant={"outline"} size={"icon"}>
                        <MessageSolid className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                </TooltipTrigger>

                <TooltipContent>
                  <p>Mensagem</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {isOwnProfile && (
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => setOpenShare(true)}
                    >
                      <ShareSolid className="h-5 w-5" />
                    </Button>
                  )}
                </TooltipTrigger>

                <TooltipContent>
                  <p>Compartilhar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-1">
            <CardDescription className="text-foreground uppercase">Sugestões para você</CardDescription>
            <UserSuggestions removeUserId={viewingUser._id} />
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col space-y-2 px-0 w-full">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center space-y-2">
              <FolderSlashSolid className="h-20 w-20" />

              <CardDescription className="text-center text-wrap">
                Usuário {viewingUser.nickname} não possui nenhuma publicação
              </CardDescription>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center w-full">
                {posts.map((post) => {
                  const followingMentionedUsers = post.mentionedUsers.map((mentionedId) =>
                    currentUser.following.includes(mentionedId)
                  );
                  const isFollowingUserPost = currentUser.following.includes(
                    post.userId
                  );

                  return (
                    <CardPost
                      classNames="w-full md:w-full"
                      key={post._id}
                      userId={post.userId}
                      _id={post._id}
                      content={post.content}
                      isAnonymous={post.isAnonymous}
                      photoURLs={post.photoURLs}
                      insertAt={post.insertAt}
                      id={post.userId}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                      likedBy={post.likedBy}
                      mentionedUsers={post.mentionedUsers}
                      followingMentionedUsers={followingMentionedUsers}
                      isFollowingUserPost={isFollowingUserPost}
                      onDelete={deletePostFromState}
                    />
                  );
                })}
              </div>

              {loading ? (
                <div className="flex flex-row items-center">
                  <SpinnerSolid className="animate-spin text-primary mr-2 h-5 w-5" />
                  <p className="text-primary text-sm">Carregando...</p>
                </div>
              ) : null}
            </>
          )}
        </CardFooter>
      </Card>

      <Dialog open={openShare} onOpenChange={setOpenShare}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar link</DialogTitle>
            <DialogDescription>
              Qualquer pessoa com acesso ao link poderá acessar o conteúdo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                ref={inputRef}
                value={`https://crushif.vercel.app/profile/${viewingUser._id}`}
                readOnly
              />
            </div>

            <Button
              type="submit"
              size="icon"
              className="rounded-full"
              variant={"outline"}
              onClick={handleCopy}
            >
              <span className="sr-only">Copiar</span>
              <CopySolid className="h-4 w-4" />
            </Button>
          </div>

          {copied && (
            <DialogFooter className="sm:justify-start">
              <DialogDescription className="text-success flex flex-row items-center gap-2">
                <CheckSquareOneSolid className="h-4 w-4" />
                copiado com sucesso!
              </DialogDescription>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const ProfilePage = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center h-full w-full">
        <ProfileLayout />
      </main>
    </>
  );
};

export default ProfilePage;
