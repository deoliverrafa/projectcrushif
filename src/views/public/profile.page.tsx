import { NavBarReturn } from "../../layout/navbar.layout.tsx";
import { ProfileLayout } from "../../layout/profile.layout";

const ProfilePage = () => {

  return (
        <>
            <NavBarReturn title="Perfil" />
            
            <main className="select-none flex flex-col justify-center items-center h-svh w-full">
                <ProfileLayout />
            </main>
        </>
    );
};

export default ProfilePage;
