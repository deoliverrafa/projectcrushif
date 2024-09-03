import { NavBar } from '../../layout/navbar.layout.tsx';
import { BottomBar } from '../../layout/bottombar.layout.tsx';

import { getUserData } from "../../utils/getUserData.tsx";

import {
  Error404Icon
} from '../../icons/icons.tsx';

const NotificationsPage = () => {
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

export default NotificationsPage;