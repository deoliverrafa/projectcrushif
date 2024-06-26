// IMPORT - COMPONENTS //
import { NavBarReturn } from "../../components/navbar";
import { BaseUserShow } from "../../components/baseUserShow";
import { Loading } from './../../components/loading.tsx';

// IMPORT - SCRIPTS //
import { getUserData } from "../../utils/getUserData";

const ProfilePage = () => {
    const userData = getUserData();

    return (
      <>
        <NavBarReturn title="Perfil" />
          {userData ? (
            <main>
              <p>perfil do {userData.nickname}</p>
            </main>
          ) : (
            <Loading />
          )}
      </>
    );
};

export default ProfilePage;