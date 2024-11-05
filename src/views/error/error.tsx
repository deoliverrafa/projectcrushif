import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";

import Art404 from "../../../public/images/404_art.png"

const ErrorPage = () => {
  return (
    <React.Fragment>
      <main className="flex flex-col justify-center items-center gap-1 h-screen w-full">
        <img src={Art404} className="h-32 md:h-[300px] w-32 md:w-[300px]" alt="404" />

        <h1 className="font-poppins font-bold md:font-semibold text-2xl md:text-3xl">
          Página não encontrada
        </h1>

        <p className="font-poppins text-muted-foreground text-center text-sm">
          Não conseguimos encontrar o que procuras. Por favor, verifique e tente
          novamente.
        </p>

        <div className="flex flex-row justify-between items-center gap-2 mt-1">
          <Link to={"/"}>
            <Button variant={"secondary"}>Voltar para inicio</Button>
          </Link>

          <Link to={"/support"}>
            <Button variant={"outline"}>Contatar o suporte</Button>
          </Link>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ErrorPage;
