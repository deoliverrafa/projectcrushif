import * as React from "react";

import { NavBarReturn } from "../../components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
} from "../../components/ui/drawer";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { Switch } from "../../components/ui/switch";

import logo from "../../../public/images/logo/logo.png";

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={logo} className="h-32 md:h-[300px] w-32 md:w-[300px]" />
      <h1 className="text-primary font-recursive font-semibold uppercase tracking-widest text-2xl md:text-5xl">
        CrushIF
      </h1>
    </div>
  );
};

import { getUserData } from "../../utils/getUserData";

import { SendHorizontal, ArrowRight, ArrowLeft } from "lucide-react";

interface CardData {
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL?: string;
  userPhotoUrl?: string;
}

const PublishLayout = () => {
  const userData = getUserData();

  const [isAnonymous, setAnonymous] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [step, setStep] = React.useState(1);

  const [cardData, setCardData] = React.useState<CardData>({
    nickname: "",
    email: "",
    campus: "",
    references: "",
    content: "",
    isAnonymous: false,
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  function handleIsAnonymous() {
    setAnonymous(!isAnonymous);
  }

  function handleChangeData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  const handlePreviousStep = () => {
    setStep((prevCount) => prevCount - 1);
  };

  const handleNextStep = () => {
    setStep((prevCount) => prevCount + 1);
  };

  React.useEffect(() => {
    if (userData) {
      setCardData((prevData) => ({
        ...prevData,
        nickname: userData.nickname,
        email: userData.email,
        campus: userData.campus,
        isAnonymous: isAnonymous,
      }));
    }
  }, [userData]);

  React.useEffect(() => {
    setCardData((prevData) => ({
      ...prevData,
      isAnonymous: isAnonymous,
    }));
  }, [isAnonymous]);

  React.useEffect(() => {
    if (selectedFile) {
      if (
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/gif"
      ) {
        setErrorMessage("");
        const imageUrl = URL.createObjectURL(selectedFile);
        setCardData((prevData) => ({
          ...prevData,
          photoURL: imageUrl,
        }));
      } else {
        setErrorMessage(
          "Por favor, selecione uma imagem válida (JPEG, PNG ou GIF)."
        );
      }
    }
  }, [selectedFile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", cardData.nickname);
    formData.append("email", cardData.email);
    formData.append("campus", cardData.campus);
    formData.append("content", cardData.content || "");
    formData.append(
      "references",
      cardData.references ? cardData.references : ""
    );
    formData.append("avatar", userData?.avatar ? userData.avatar : "");
    formData.append("isAnonymous", isAnonymous.toString());

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_PUBLISH
        }${localStorage.getItem("token")}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.posted) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <Card className="hidden md:flex flex-col w-5/6 max-w-sm">
        <CardHeader>
          <div className={`${step === 1 ? null : "hidden"}`}>
            <CardTitle className="uppercase tracking-widest">
              Anônimo/Usuário
            </CardTitle>
            <CardDescription className="tracking-wide">
              Selecione o tipo de publicação, se será uma publicação anônima, ou
              se será uma publicação feita pelo usuário.
            </CardDescription>
          </div>

          <div className={`${step === 2 ? null : "hidden"}`}>
            <CardTitle className="uppercase tracking-widest">
              Descrição
            </CardTitle>
            <CardDescription className="tracking-wide">
              Introduza um texto para a publicação, faça uma breve descrição
              sobre sua publicação.
            </CardDescription>
          </div>

          <div className={`${step === 3 ? null : "hidden"}`}>
            <CardTitle className="uppercase tracking-widest">
              Marcações
            </CardTitle>
            <CardDescription className="tracking-wide">
              Informe uma #hashtag ou um @usuário, marque alguem na publicação,
              ou puxe uma corrente na sua postagem.
            </CardDescription>
          </div>

          <div className={`${step === 4 ? null : "hidden"}`}>
            <CardTitle className="uppercase tracking-widest">
              Upload
            </CardTitle>
            <CardDescription className="tracking-wide">
              Faça o upload de uma foto, escolha uma foto para ilustrar sua
              publicação, poste fotos de locais, pessoas, viagens...
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col relative space-y-2"
          >
            <div
              className={`${
                step === 1 ? null : "hidden"
              } flex flex-row items-center space-x-2`}
            >
              <Label htmlFor="type">Tipo:</Label>
              <div className="flex items-center space-x-2">
                <Switch id="type" onClick={handleIsAnonymous} />
                {!isAnonymous ? (
                  <CardDescription>Público</CardDescription>
                ) : (
                  <CardDescription>Anônimo</CardDescription>
                )}
              </div>
            </div>

            <div
              className={`${
                step === 2 ? null : "hidden"
              } grid items-center gap-1.5 w-full max-w-sm`}
            >
              <Label htmlFor="content">Descrição</Label>
              <Input
                type="text"
                key="content"
                placeholder="ex: Descrição da publicação"
                name="content"
                id="content"
                onChange={handleChangeData}
              />
            </div>

            <div
              className={`${
                step === 3 ? null : "hidden"
              } grid items-center gap-1.5 w-full max-w-sm`}
            >
              <Label htmlFor="references">Marcações</Label>
              <Input
                type="text"
                key="references"
                placeholder="ex: #Hashtag, #HashTag, #hashtag"
                name="references"
                id="references"
                onChange={handleChangeData}
              />
            </div>

            <div
              className={`${
                step === 4 ? null : "hidden"
              } grid items-center gap-1.5 w-full max-w-sm`}
            >
              <Label htmlFor="inputFoto">Upload</Label>
              <Input
                type="file"
                key="foto"
                name="foto"
                id="inputFoto"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-row justify-center items-center">
              <div className="my-3">
                {errorMessage && (
                  <div
                    className="p-4 mb-4 text-sm text-danger rounded-lg bg-red-50 dark:bg-black dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">Atenção!</span> {errorMessage}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row items-center w-full">
              <Progress
                value={
                  step === 1
                    ? 10
                    : step === 2
                    ? 33
                    : step === 3
                    ? 66
                    : step === 4
                    ? 100
                    : null
                }
                className="w-full"
              />
            </div>

            <div
              className={`${
                step === 4 ? null : "hidden"
              } flex flex-row justify-center items-center my-2`}
            >
              <Button
                type="submit"
                className="w-full"
              >
                <SendHorizontal className="mr-2 h-4 w-4" />
                Enviar
              </Button>
            </div>
          </form>

          <div
            className={`${
              step === 1 ? "hidden" : null
            } flex flex-row justify-center items-center my-2`}
          >
            <Button
              className="w-full"
              variant={"outline"}
              onClick={handlePreviousStep}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>

          <div
            className={`${
              step === 4 ? "hidden" : null
            } flex flex-row justify-center items-center my-2`}
          >
            <Button
              className="w-full"
              onClick={handleNextStep}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Proximo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col md:hidden w-5/6 max-w-sm">
        <CardHeader>
          <CardTitle className="tracking-widest">
            Publique
          </CardTitle>
          <CardDescription className="tracking-wide">
            Faça uma publicação anônima ou feita pelo usuário.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Drawer>
            <DrawerTrigger className="w-full" asChild>
              <Button className="w-full">Publicar</Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <div className={`${step === 1 ? null : "hidden"}`}>
                  <DrawerTitle className="tracking-widest">
                    Anônimo/Usuário
                  </DrawerTitle>
                  <DrawerDescription className="tracking-wide">
                    Selecione o tipo de publicação, se será uma publicação
                    anônima, ou se será uma publicação feita pelo usuário.
                  </DrawerDescription>
                </div>

                <div className={`${step === 2 ? null : "hidden"}`}>
                  <DrawerTitle className="tracking-widest">
                    Descrição
                  </DrawerTitle>
                  <DrawerDescription className="tracking-wide">
                    Introduza um texto para a publicação, faça uma breve
                    descrição sobre sua publicação.
                  </DrawerDescription>
                </div>

                <div className={`${step === 3 ? null : "hidden"}`}>
                  <DrawerTitle className="tracking-widest">
                    Marcações
                  </DrawerTitle>
                  <DrawerDescription className="tracking-wide">
                    Informe uma #hashtag ou um @usuário, marque alguem na
                    publicação, ou puxe uma corrente na sua postagem.
                  </DrawerDescription>
                </div>

                <div className={`${step === 4 ? null : "hidden"}`}>
                  <DrawerTitle className="tracking-widest">
                    Upload
                  </DrawerTitle>
                  <DrawerDescription className="tracking-wide">
                    Faça o upload de uma foto, escolha uma foto para ilustrar
                    sua publicação, poste fotos de locais, pessoas, viagens...
                  </DrawerDescription>
                </div>
              </DrawerHeader>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col relative space-y-2"
              >
                <div
                  className={`${
                    step === 1 ? null : "hidden"
                  } flex flex-row items-center m-2 space-x-2`}
                >
                  <Label htmlFor="type">Tipo:</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="type" onClick={handleIsAnonymous} />
                    {!isAnonymous ? (
                      <CardDescription>Público</CardDescription>
                    ) : (
                      <CardDescription>Anônimo</CardDescription>
                    )}
                  </div>
                </div>

                <div
                  className={`${
                    step === 2 ? null : "hidden"
                  } grid items-center gap-1.5 m-2 w-full max-w-sm`}
                >
                  <Label htmlFor="content">Descrição</Label>
                  <Input
                    type="text"
                    key="content"
                    placeholder="ex: Descrição da publicação"
                    name="content"
                    id="content"
                    onChange={handleChangeData}
                  />
                </div>

                <div
                  className={`${
                    step === 3 ? null : "hidden"
                  } grid items-center gap-1.5 m-2 w-full max-w-sm`}
                >
                  <Label htmlFor="references">Marcações</Label>
                  <Input
                    type="text"
                    key="references"
                    placeholder="ex: #Hashtag, #HashTag, #hashtag"
                    name="references"
                    id="references"
                    onChange={handleChangeData}
                  />
                </div>

                <div className={`${step === 4 ? null : "hidden"} m-2`}>
                  <Label htmlFor="inputFoto">Upload</Label>
                  <Input
                    type="file"
                    key="foto"
                    name="foto"
                    id="inputFoto"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex flex-row items-center w-full">
                  <Progress
                    value={
                      step === 1
                        ? 10
                        : step === 2
                        ? 33
                        : step === 3
                        ? 66
                        : step === 4
                        ? 100
                        : null
                    }
                    className="w-full"
                  />
                </div>

                <div
                  className={`${
                    step === 4 ? null : "hidden"
                  } flex flex-row justify-center items-center m-2`}
                >
                  <Button
                    type="submit"
                    className="w-full"
                  >
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Enviar
                  </Button>
                </div>
              </form>

              <div
                className={`${
                  step === 1 ? "hidden" : null
                } flex flex-row justify-center items-center m-2`}
              >
                <Button
                  className="w-full"
                  variant={"outline"}
                  onClick={handlePreviousStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </div>

              <div
                className={`${
                  step === 4 ? "hidden" : null
                } flex flex-row justify-center items-center m-2`}
              >
                <Button
                  className="w-full"
                  onClick={handleNextStep}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Proximo
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    </>
  );
};

const PublishPage = () => {
  return (
    <>
      <NavBarReturn title="Publique" />

      <main className="select-none flex flex-col md:flex-row justify-around items-center h-svh w-full">
        <LogoLayout />
        <PublishLayout />
      </main>
    </>
  );
};

export default PublishPage;
