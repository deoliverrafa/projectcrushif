import { LogoLayout } from "../../layout/logo.layout";
import { NavBarReturn } from "../../layout/navbar.layout";
import { PublishLayout } from "../../layout/user/publish.layout";

const PublishPage = () => {
  return (
    <>
      <NavBarReturn title="Publique" />

      <main className="select-none flex flex-col md:flex-row justify-around items-center h-svh w-full">
        <LogoLayout />
        <PublishLayout />
      </main>
    </>
  );
};

export default PublishPage;
