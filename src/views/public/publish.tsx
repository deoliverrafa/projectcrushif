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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "../../components/ui/dialog";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";

import logo from "../../../public/images/logo/logo.png";

import { getUserData } from "../../utils/getUserData";

import {
  IncognitoSolid,
  LabelSolid,
  At,
  ImageSolid,
  EarthSolid,
} from "@mynaui/icons-react";

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

const LogoLayout = () => {
  return (
    <div className="hidden md:flex flex-col justify-center items-center">
      <img src={logo} className="h-32 md:h-[300px] w-32 md:w-[300px]" />
      <h1 className="text-primary font-cookie font-medium text-[3rem]">
        Crushif
      </h1>
    </div>
  );
};

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
            <Badge variant={"outline"}>
              <IncognitoSolid className="text-foreground" />
            </Badge>
            <CardTitle className="tracking-wider">Anônimo/Usuário</CardTitle>

            <CardDescription className="tracking-wide">
              Selecione o tipo de publicação: anônima ou pelo usuário.
            </CardDescription>
          </div>

          <div className={`${step === 2 ? null : "hidden"}`}>
            <Badge variant={"outline"}>
              <LabelSolid className="text-success" />
            </Badge>
            <CardTitle className="tracking-wider">Descrição</CardTitle>

            <CardDescription className="tracking-wide">
              Insira o texto e uma breve descrição da publicação.
            </CardDescription>
          </div>

          <div className={`${step === 3 ? null : "hidden"}`}>
            <Badge variant={"outline"}>
              <At className="text-warning" />
            </Badge>
            <CardTitle className="tracking-wider">Marcações</CardTitle>

            <CardDescription className="tracking-wide">
              Adicione uma #hashtag, @usuário, ou marque alguém na publicação.
            </CardDescription>
          </div>

          <div className={`${step === 4 ? null : "hidden"}`}>
            <Badge variant={"outline"}>
              <ImageSolid className="text-primary" />
            </Badge>
            <CardTitle className="tracking-wider">Upload</CardTitle>

            <CardDescription className="tracking-wide">
              Envie uma foto para ilustrar sua publicação, como de locais,
              pessoas ou viagens.
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
                placeholder="Adicione uma descrição"
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
                placeholder="Adicione uma marcação"
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
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </div>
          </form>

          <div
            className={`${
              step === 4 ? "hidden" : null
            } flex flex-row justify-center items-center my-2`}
          >
            <Button className="w-full" onClick={handleNextStep}>
              Proximo
            </Button>
          </div>

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
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col md:hidden w-5/6 max-w-sm">
        <CardHeader>
          <Badge className="w-fit" variant={"outline"}>
            <EarthSolid className="text-primary" />
          </Badge>
          <CardTitle className="tracking-wider">Publique</CardTitle>
          <CardDescription className="tracking-wide">
            Faça uma publicação anônima ou feita pelo usuário.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Dialog>
            <DialogTrigger className="w-full" asChild>
              <Button className="w-full">Publicar</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <div className={`${step === 1 ? null : "hidden"} space-y-1.5`}>
                  <Badge variant={"outline"}>
                    <IncognitoSolid className="text-foreground" />
                  </Badge>
                  <DialogTitle className="tracking-wider">
                    Anônimo/Usuário
                  </DialogTitle>

                  <DialogDescription className="tracking-wide">
                    Selecione o tipo de publicação: anônima ou pelo usuário.
                  </DialogDescription>
                </div>

                <div className={`${step === 2 ? null : "hidden"} space-y-1.5`}>
                  <Badge variant={"outline"}>
                    <LabelSolid className="text-success"/>
                  </Badge>
                  <DialogTitle className="tracking-wider">
                    Descrição
                  </DialogTitle>

                  <DialogDescription className="tracking-wide">
                    Insira o texto e uma breve descrição da publicação.
                  </DialogDescription>
                </div>

                <div className={`${step === 3 ? null : "hidden"} space-y-1.5`}>
                  <Badge variant={"outline"}>
                    <At className="text-warning" />
                  </Badge>
                  <DialogTitle className="tracking-wider">
                    Marcações
                  </DialogTitle>

                  <DialogDescription className="tracking-wide">
                    Adicione uma #hashtag, @usuário, ou marque alguém na
                    publicação.
                  </DialogDescription>
                </div>

                <div className={`${step === 4 ? null : "hidden"} space-y-1.5`}>
                  <Badge variant={"outline"}>
                    <ImageSolid className="text-primary" />
                  </Badge>
                  <DialogTitle className="tracking-wider">Upload</DialogTitle>

                  <DialogDescription className="tracking-wide">
                    Envie uma foto para ilustrar sua publicação, como de locais,
                    pessoas ou viagens.
                  </DialogDescription>
                </div>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col relative space-y-2 w-full"
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
                  } grid items-center gap-1.5 m-2 w-full`}
                >
                  <Label htmlFor="content">Descrição</Label>
                  <Input
                    type="text"
                    key="content"
                    placeholder="Adicione uma descrição"
                    className="w-11/12"
                    name="content"
                    id="content"
                    onChange={handleChangeData}
                  />
                </div>

                <div
                  className={`${
                    step === 3 ? null : "hidden"
                  } grid items-center gap-1.5 m-2 w-full`}
                >
                  <Label htmlFor="references">Marcações</Label>
                  <Input
                    type="text"
                    key="references"
                    placeholder="Adicione uma marcação"
                    className="w-11/12"
                    name="references"
                    id="references"
                    onChange={handleChangeData}
                  />
                </div>

                <div
                  className={`${
                    step === 4 ? null : "hidden"
                  } grid items-center gap-1.5 m-2 w-full`}
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
                  <Button type="submit" className="w-full">
                    Enviar
                  </Button>
                </div>
              </form>

              <div
                className={`${
                  step === 4 ? "hidden" : null
                } flex flex-row justify-center items-center m-2`}
              >
                <Button className="w-full" onClick={handleNextStep}>
                  Proximo
                </Button>
              </div>

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
                  Voltar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
