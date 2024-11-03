import axios from "axios";

export async function getPostDataById(id: string | undefined) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_POST_ID}${id}`
  );
  return response.data.postFinded;
}
