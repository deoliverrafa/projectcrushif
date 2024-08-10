export const handleShare = async (nickname, id) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Crush IF',
        text: `Visite o perfil do @${nickname}, no Crush IF:`,
        url: `https://projectcrushif.vercel.app/profile/${id}`
      });
    } else {
      throw new Error('API Web Share não suportada no seu navegador.');
    }
  } catch (error) {
      console.error('Erro ao compartilhar:', error.message);
    }
};