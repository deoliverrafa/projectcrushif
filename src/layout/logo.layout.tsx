import { Image } from "@nextui-org/react";

import logo from "./../../public/images/logo/logo.png";

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={logo} className="h-32 md:h-[300px] w-32 md:w-[300px]" />
      <h1 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold uppercase tracking-widest text-2xl md:text-5xl">
        Crush
      </h1>
    </div>
  );
};

export default LogoLayout;