import axios from "axios";

export async function getUserDataById(id: String | undefined ) {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_ID}${id}`);
  return response.data.userFinded;
}
