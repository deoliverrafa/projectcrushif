import axios from "axios";

interface FollowToggleData {
  userId: string | undefined;
  token: string;
  followed: boolean;
  setFollowedUser?: (followed: boolean) => void;
}

export const toggleFollow = async ({
  userId,
  token,
  followed,
  setFollowedUser,
}: FollowToggleData) => {
  const endpoint = followed
    ? `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_UNFOLLOW_USER}`
    : `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_FOLLOW_USER}`;

  try {
    const response = await axios.put(endpoint, {
      userFollowId: userId,
      unfollowId: userId,
      token,
    });
    if (setFollowedUser) { setFollowedUser(response.data.followed); }
    return response;
  } catch (error) {
    console.error("Erro ao seguir/desseguir o usuário:", error);
  }
};
