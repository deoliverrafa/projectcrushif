// IMPORT - LIBRARYS //

// IMPORT - COMPONENTS //
import { NavBar } from './../../components/navbar.tsx';
import { BottomBar } from './../../components/bottombar.tsx';

// IMPORT - SCRIPTS //
import { getUserData } from "./../../utils/getUserData";

// IMPORT - ICONS //
import {
  Error404Icon
} from './../../icons/icons.tsx';

const MatchPage = () => {
  const userData = getUserData();
  
  return (
    <>
      <NavBar
        user={userData} 
        avatarPath={userData?.avatar ? userData.avatar : ""} />
      
      <main className="flex flex-col justify-center items-center h-screen w-full">
        <Error404Icon className="text-default text-center size-20" />
        <p className="font-Poppins text-default font-semibold text-wrap text-center text-2xl">Ops... Conteúdo indísponivel no momento!</p>
      </main>
      
      <BottomBar />
    </>
  );
};

export default MatchPage;