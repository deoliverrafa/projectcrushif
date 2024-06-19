import { NavBarReturn } from "../../components/navbar";
import BaseUserShow from "../../components/baseUserShow";
import { getUserData } from "../../utils/getUserData";
import { Spinner } from '@nextui-org/react';

export default function UserBasePage() {
    
    const userData = getUserData();

    return (
      <>
        <div className='flex flex-col w-full h-full'>
            <NavBarReturn title="Perfil" />
            {
                userData ?
                    <BaseUserShow user={userData} />
                    :
                    <div className='flex flex-row justify-center items-center'>
                        <Spinner />Aguarde...
                    </div>
            }
            
        </div>
        </>
    );
}
