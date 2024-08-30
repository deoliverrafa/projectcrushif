import { LogoLayout } from "../../layout/logo.layout.tsx";
import { LoginLayout, LoginLayoutMobile } from "../../layout/login.layout.tsx";

const LoginPage = () => {
  return (
    <>
      <main className="select-none flex flex-col md:flex-row justify-around items-center h-svh w-full">
        <LogoLayout />
        <LoginLayout />
        <LoginLayoutMobile />
      </main>
    </>
  );
};

export default LoginPage;
