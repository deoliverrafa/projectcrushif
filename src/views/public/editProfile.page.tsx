import { NavBarReturn } from "../../components/navbar.tsx";

import LoadingPage from "./loading.tsx";

import { getUserData } from "../../utils/getUserData.tsx";

const EditProfilePage = () => {
    const userData = getUserData();

    return (
      <div className="w-full h-svh flex flex-col">
      <NavBarReturn title="Editar Perfil" />
      {userData ? (
        <main className="flex flex-col h-full w-full justify-center items-center">
          {/* <BaseUserShow user={userData} /> */}
        </main>
      ) : (
        <LoadingPage />
      )}
    </div>
    );
};

export default EditProfilePage;