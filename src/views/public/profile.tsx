import { ProfileLayout } from "../../layout/user/profile.layout.tsx";

const ProfilePage = () => {
  return (
    <>
      <main className="select-none flex flex-col justify-center items-center h-full w-full">
        <ProfileLayout />
      </main>
    </>
  );
};

export default ProfilePage;
