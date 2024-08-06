import axios from "axios";

export async function getUserDataById(id: string) {
  const response = await axios.get(`https://crush-api.vercel.app/user/id/${id}`);
  return response.data.userFinded;
}
