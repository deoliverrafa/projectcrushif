import { NavBarReturn } from "../../layout/navbar.layout";
import { PublishLayout } from "../../layout/publish.layout";
import { LogoLayout } from "../../layout/logo.layout";

const PublishPage = () => {
  return (
    <>
      <NavBarReturn title="Publique" />

      <main className="select-none">
        <PublishLayout />
      </main>
    </>
  );
};

export default PublishPage;
