// IMPORT - COMPONENTS //
import { NavBarReturn } from "../../components/navbar";
import { BaseUserShow } from "../../components/baseUserShow";
import { Loading } from './../../components/loading.tsx';

// IMPORT - SCRIPTS //
import { getUserData } from "../../utils/getUserData";

const EditProfilePage = () => {
    const userData = getUserData();

    return (
      <>
        <NavBarReturn title="Editando" />
          {userData ? (
            <main className="flex flex-col justify-center items-center">
              <BaseUserShow user={userData} />
            </main>
          ) : (
            <Loading />
          )}
      </>
    );
};

export default EditProfilePage;