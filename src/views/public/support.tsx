import * as React from "react";
import emailjs from "emailjs-com";

import {
  NavBarReturn
} from "../../components/navbar";
import {
  DialogSuccess
} from "../../components/dialog.tsx"

import {
  RadioGroup,
  RadioGroupItem
} from "../../components/ui/radio-group.tsx"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../../components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import {
  Button
} from "../../components/ui/button.tsx";
import {
  Label
} from "../../components/ui/label.tsx"

import {
  InfoSolid
} from "@mynaui/icons-react";

import Logo from "../../../public/images/logo/logo.png";

import {
  getUserData
} from "../../utils/getUserData";

const SupportLayout = () => {
  const userData = getUserData();
  const [selectedSupport,
    setSelectedSupport] = React.useState < string > ("Problema com login");

  const handleSendSupport = () => {
    if (!selectedSupport) {
      alert("Por favor, selecione um tipo de suporte.");
      return;
    }

    const templateParamsAdmin = {
      user_email: userData.email,
      user_name: userData.nickname,
      support_type: selectedSupport,
    };

    const templateParamsUser = {
      user_email: userData.email,
      user_name: userData.nickname,
      support_type: selectedSupport,
    };

    emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
      templateParamsAdmin,
      import.meta.env.VITE_EMAILJS_API_KEY
    )
    .then(
      () => {
        emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
          templateParamsUser,
          import.meta.env.VITE_EMAILJS_API_KEY
        )
        .then(
          (response: any) => {
            console.log("E-mail enviado para o usuário com sucesso!", response);
          },
          (error: any) => {
            console.error("Erro ao enviar e-mail para o usuário:", error);
          }
        );
      },
      (error: any) => {
        console.error("Erro ao enviar e-mail para o administrador:", error);
      }
    );
  };

  const MenuNavbar = () => {
    return (
      <React.Fragment>
        <Drawer>
          <DrawerTrigger>
            <InfoSolid />
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Suporte </DrawerTitle>
            </DrawerHeader>

            <div className="flex items-center gap-2 p-4 pb-0">
              <img
              className="h-14 w-14"
              src={Logo}
              alt="logo"
              />
            <DrawerDescription className="text-foreground">
              Você pode solicitar ajuda pelo suporte no Crush IF.
            </DrawerDescription>
          </div>

          <DrawerFooter>
            <DrawerDescription className="text-xs md:text-xs text-center">
              Você está vendo a solicitação para suporte para esté
              perfil no Crush IF.
            </DrawerDescription>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  )
}

return (
  <React.Fragment>
    <NavBarReturn title={"Suporte"} menu={<MenuNavbar />} />

    <Card className="select-none mt-1 w-full md:w-6/12">
      <CardHeader>
        <CardTitle className="text-foreground">Solicitar suporte</CardTitle>
        <CardDescription>Informe o tipo de suporte que você precisa</CardDescription>
      </CardHeader>

      <CardContent>
        <RadioGroup defaultValue="Problema com login">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Problema com login" id="r1"
              checked={selectedSupport === "Problema com login"}
              onClick={() => setSelectedSupport("Problema com login")}
              />
            <Label htmlFor="r1">Problema com login</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Erro ao carregar página" id="r2"
              checked={selectedSupport === "Erro ao carregar página"}
              onClick={() => setSelectedSupport("Erro ao carregar página")}
              />
            <Label htmlFor="r2">Error ao carregar página</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Outros" id="r3"
              checked={selectedSupport === "Outros"}
              onClick={() => setSelectedSupport("Outros")}
              />
            <Label htmlFor="r3">Outros</Label>
          </div>
        </RadioGroup>
      </CardContent>

      <CardFooter className="flex flex-row justify-end items-end">
        <DialogSuccess
          title="Suporte Enviado"
          content="Sua solicitação foi enviada com sucesso. Em breve entraremos em contato."
          >
          <Button variant={"success"} onClick={handleSendSupport}>Enviar</Button>
        </DialogSuccess>
      </CardFooter>
    </Card>
  </React.Fragment>
)
}

const SupportPage = () => {
return (
<React.Fragment>
<main className="flex flex-col justify-center items-center h-full w-full">
<SupportLayout />
</main>
</React.Fragment>
);
};

export default SupportPage;