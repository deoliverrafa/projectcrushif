import LogoLayout from "../../layout/logo.layout.tsx";
import LoginLayout from '../../layout/desktop/login.layout.tsx';
import LoginLayoutMobile from "../../layout/mobile/login.layout.tsx";

const LoginPage = () => {
  return (
    <>
      <div className="select-none flex flex-col md:flex-row justify-around items-center h-svh w-full">
        <LogoLayout />
        <LoginLayout />
        <LoginLayoutMobile />
      </div>
    </>
  );
};

export default LoginPage;
