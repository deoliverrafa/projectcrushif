import axios from "axios";

export async function getReplyById(id: string | undefined) {
  if (!id) return null;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_COMMENT_REPLY_ID
      }${id}`
    );
    return response.data.comment;
  } catch (error) {
    console.error(`Erro ao buscar dados para a resposta com ID ${id}:`, error);
    return null;
  }
}
