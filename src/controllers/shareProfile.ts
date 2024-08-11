export const handleShare = async (nickname: string, id: string) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Crush IF',
        text: `Visite o perfil do @${nickname}, no Crush IF:`,
        url: `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PROFILE}${id}`
      });
    } else {
      throw new Error('API Web Share não suportada no seu navegador.');
    }
  } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
};