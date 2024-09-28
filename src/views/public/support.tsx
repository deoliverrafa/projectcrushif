import { NavBar } from '../../components/navbar';
import { BottomBar } from '../../components/bottombar';

import { getUserData } from "../../utils/getUserData";

import Error404 from './../../../public/images/error404.gif';

const SupportPage = () => {
  const userData = getUserData();
  
  return (
    <>
      <NavBar
        user={userData} 
        avatarPath={userData?.avatar ? userData.avatar : ""} />
      
      <main className="flex flex-col justify-center items-center h-screen w-full">
        <img src={Error404} />
        <p className="font-Poppins text-default font-semibold text-wrap text-center text-xl">Ops... Conteúdo indísponivel no momento!</p>
      </main>

      <BottomBar />
    </>
  );
};

export default SupportPage;