import * as React from "react";

import logo from "../../../public/images/logo/logo.png";

const LoadingPage = () => {
  return (
    <React.Fragment>
      <main className="flex flex-col justify-center items-center h-screen w-full">
        <div className="flex flex-col items-center">
          <img src={logo} className="h-32 md:h-[300px] w-32 md:w-[300px]" />
          <h1 className="text-primary font-cookie font-medium text-[3rem]">
            Crushif
          </h1>

          <p className="font-semibold">by Hexa inc.</p>
          <p className="font-semibold">v1.0.0</p>
        </div>
      </main>
    </React.Fragment>
  );
};

export default LoadingPage;
