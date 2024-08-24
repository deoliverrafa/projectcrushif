// IMPORT - LIBRARYS //

// IMPORT - COMPONENTS //
import { NavBar } from '../../layout/navbar.layout';
import { BottomBar } from '../../layout/bottombar.layout';
import { 
  Image
} from '@nextui-org/react';

// IMPORT - SCRIPTS //
import { getUserData } from "../../utils/getUserData";

// IMPORT - ICONS //
import Error404 from './../../../public/images/error404.gif';

const EventsPage = () => {
  const userData = getUserData();
  
  return (
    <>
      <NavBar
        user={userData} 
        avatarPath={userData?.avatar ? userData.avatar : ""} />
      
      <main className="flex flex-col justify-center items-center h-screen w-full">
        <Image src={Error404} />
        <p className="font-Poppins text-default font-semibold text-wrap text-center text-xl">Ops... Conteúdo indísponivel no momento!</p>
      </main>
      
      <BottomBar />
    </>
  );
};

export default EventsPage;