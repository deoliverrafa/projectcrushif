import logo from "../../../public/images/logo/logo.png";

const LoadingPage = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center space-y-2 h-screen w-full">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} className="h-32 md:h-[300px] w-32 md:w-[300px]" />
          <h1 className="text-primary font-recursive font-semibold uppercase tracking-widest text-2xl md:text-5xl">
            CrushIF
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>by Hexa inc.</p>
          <p>v1.0.0</p>
        </div>
      </main>
    </>
  );
};

export default LoadingPage;
