import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Envelope } from "@mynaui/icons-react";

import LoginArt from "../../../public/images/login_art.png";

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <img src={LoginArt} className="h-52 md:h-[300px] w-52 md:w-[300px]" />
    </div>
  );
};

const VerifyLayout = () => {
  return (
    <React.Fragment>
      <Card className="max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <Envelope className="text-primary h-20 w-20" />
          <CardTitle className="text-primary">Verifique seu e-mail</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Para completar o processo e acessar todos os recursos,{" "}
            <span className="text-primary">verifique seu e-mail</span> e
            confirme seu endereço. Isso ajuda a garantir a segurança da sua
            conta e melhorar sua experiência!
          </CardDescription>
        </CardContent>

        <CardFooter>
          <CardDescription>
            Está com problemas para verificar seu e-mail? Entre em contato
            conosco pelo e-mail{" "}
            <span className="cursor-pointer underline text-primary">
              support@crushif.com
            </span>{" "}
            para mais orientações.
          </CardDescription>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

const VerifyPage = () => {
  return (
    <React.Fragment>
      <main className="select-none flex flex-col items-center md:flex-row md:justify-around md:items-center h-svh w-full">
        <LogoLayout />
        <VerifyLayout />
      </main>
    </React.Fragment>
  );
};

export default VerifyPage;
