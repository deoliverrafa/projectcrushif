// IMPORT - COMPONENTS //
import { NavBarReturn } from "../../layout/navbar.layout";
import { BaseUserShow } from "../../components/baseUserShow.tsx";
import { Loading } from '../../components/loading.component.tsx';

// IMPORT - SCRIPTS //
import { getUserData } from "../../utils/getUserData.tsx";

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