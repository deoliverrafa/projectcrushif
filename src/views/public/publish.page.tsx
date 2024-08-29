import { NavBarReturn } from "../../layout/navbar.layout";
import { PublishLayout } from "../../layout/publish.layout";

const PublishPage = () => {
  return (
    <>
      <NavBarReturn title="Publique" />

      <main className="select-none flex flex-col justify-center items-center h-full w-full">
        <PublishLayout />
      </main>
    </>
  );
};

export default PublishPage;
