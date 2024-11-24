import * as React from "react";

import { NavBarReturn } from "../../components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

import {
  IncognitoSolid,
  EarthSolid,
  TrashOneSolid,
} from "@mynaui/icons-react";

import PostingArt from "../../../public/images/posting_art.png"

interface CardData {
  content: string;
  isAnonymous: boolean;
  photoURLs?: string;
  userPhotoUrls?: string;
  mentionedUsers: string[];
}

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={PostingArt} className="hidden md:flex md:h-[300px] md:w-[300px]" />
    </div>
  );
};

const PublishLayout = () => {
  const [isAnonymous, setAnonymous] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [cardData, setCardData] = React.useState<CardData>({
    content: "",
    isAnonymous: false,
    mentionedUsers: [],
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleIsAnonymous = () => {
    setAnonymous(!isAnonymous);
  };

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "content") {
      const mentionedUsers =
        value.match(/@(\w+)/g)?.map((user) => user.slice(1)) || [];
      setCardData((prevData) => ({
        ...prevData,
        [name]: value,
        mentionedUsers: mentionedUsers,
      }));
    } else {
      setCardData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

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
    formData.append("content", cardData.content || "");
    formData.append("isAnonymous", isAnonymous.toString());

    if (cardData.mentionedUsers.length > 0) {
      formData.append("mentionedUsers", JSON.stringify(cardData.mentionedUsers));
    }

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_POST_PUBLISH
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

  const MenuNavbar = () => {
    return (
      <div onClick={handleIsAnonymous}>
        {!isAnonymous ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <EarthSolid />
              </TooltipTrigger>

              <TooltipContent>
                <p>Público</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <IncognitoSolid />
              </TooltipTrigger>

              <TooltipContent>
                <p>Anônimo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    )
  }

  return (
    <>
      <NavBarReturn title="Publique" menu={<MenuNavbar />} />

      <main className="select-none flex flex-col md:flex-row justify-around items-center h-svh w-full">
        <LogoLayout />

        <div className="flex flex-col justify-center items-center space-y-2 h-screen md:h-full">
          <Card className="max-w-sm">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col relative space-y-2"
            >
              <CardHeader>
                <Label htmlFor="inputFoto">Upload</Label>
                <Input
                  type="file"
                  multiple
                  key="foto"
                  name="foto"
                  id="inputFoto"
                  onChange={handleFileChange}
                />

                <div className="grid grid-cols-3 gap-4">

                  <Card className="relative w-fit h-fit group">
                    <CardContent className="h-20 w-20 p-0">
                      <img
                        src={PostingArt}
                        alt={"posting"}
                        className="object-cover h-20 w-20"
                      />
                    </CardContent>

                    <div className="cursor-pointer bg-danger text-white rounded-full absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrashOneSolid />
                    </div>
                  </Card>
                </div>
              </CardHeader>

              <CardContent>
                <Label htmlFor="content">Descrição</Label>
                <Input
                  type="text"
                  key="content"
                  placeholder="Adicione uma descrição"
                  name="content"
                  id="content"
                  onChange={handleChangeData}
                />

                <div className="my-3">
                  {errorMessage && (
                    <div
                      className="p-4 mb-4 text-sm text-danger rounded-lg"
                      role="alert"
                    >
                      <span className="font-medium">Atenção!</span> {errorMessage}
                    </div>
                  )}
                </div>


                <Button type="submit" className="w-full">
                  Enviar
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
};

const PublishPage = () => {
  return (
    <>
      <PublishLayout />
    </>
  );
};

export default PublishPage;
