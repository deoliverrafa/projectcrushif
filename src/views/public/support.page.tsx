import { NavBar } from '../../layout/navbar.layout.tsx';
import { BottomBar } from '../../layout/bottombar.layout.tsx';
import { 
  Image
} from '@nextui-org/react';

import { getUserData } from "../../utils/getUserData.tsx";

import Error404 from './../../../public/images/error404.gif';

const SupportPage = () => {
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

export default SupportPage;