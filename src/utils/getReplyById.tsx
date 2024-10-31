import axios from "axios";

export async function getUserDataById(id: String | undefined) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}${
      import.meta.env.VITE_COMMENT_REPLY_ID
    }${id}`
  );
  return response.data.userFinded;
}
