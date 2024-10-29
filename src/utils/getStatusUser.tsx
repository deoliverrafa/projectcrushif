import * as React from "react";
import axios from "axios";

export const getStatusUser = (userId: string | null) => {
  const updateStatus = async (userId: string, status: string) => {
    if (!userId) {
      console.error("User ID não encontrado");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_USER_STATUS
        }${userId}`,
        { status }
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  React.useEffect(() => {
    if (userId) {
      // Atualiza o status inicial
      updateStatus(userId, navigator.onLine ? "online" : "offline");

      const handleOnline = () => updateStatus(userId, "online");
      const handleOffline = () => updateStatus(userId, "offline");
      const handleBeforeUnload = () => updateStatus(userId, "offline");

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Remove os eventos ao desmontar
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [userId]);
};
