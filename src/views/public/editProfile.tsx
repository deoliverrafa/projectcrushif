// IMPORT - COMPONENTS //
import { NavBarReturn } from "../../components/navbar";
import { BaseUserShow } from "../../components/baseUserShow";
import { Loading } from './../../components/loading.tsx';

// IMPORT - SCRIPTS //
import { getUserData } from "../../utils/getUserData";

const EditProfilePage = () => {
    const userData = getUserData();

    return (
      <div className="w-full h-svh flex flex-col">
      <NavBarReturn title="Editar Perfil" />
      {userData ? (
        <main className="flex flex-col h-full w-full justify-center items-center">
          <BaseUserShow user={userData} />
        </main>
      ) : (
        <Loading />
      )}
    </div>
    );
};

export default EditProfilePage;