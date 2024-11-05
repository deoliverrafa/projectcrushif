import * as React from "react";

import Logo from "../../../public/images/logo/logo.png";

const LoadingPage = () => {
  return (
    <React.Fragment>
      <main className="flex flex-col justify-center items-center h-screen w-full">
        <div className="flex flex-col items-center gap-2">
          <img
            src={Logo}
            className="h-28 md:h-[200px] w-32 md:w-[200px]"
          />

          <div className="flex flex-col items-center">
            <p className="font-poppins font-semibold md:font-medium">
              by Hexa inc.
            </p>
            <p className="font-poppins font-semibold md:font-medium">v1.0.0</p>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default LoadingPage;
