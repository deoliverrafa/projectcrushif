import * as React from "react";

import { CardPost } from "../components/post.component";

import {
  Card,
  CardContent,
  CardHeader,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

import { Switch } from "@nextui-org/react";

import { getUserData } from "../utils/getUserData";

import { Earth, Drama, SendHorizontal, CloudUpload } from "lucide-react";

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

export const PublishLayout = () => {
  const userData = getUserData();

  const [isAnonymous, setAnonymous] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState("");

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
    <div className="flex flex-row justify-between items-center space-x-2 h-screen w-full">
    <CardPost
            className="my-0.5"
            campus={cardData.campus}
            content={cardData.content}
            email={cardData.email}
            isAnonymous={cardData.isAnonymous}
            nickname={cardData.nickname}
            references={cardData.references}
            photoURL={cardData.photoURL}
            userAvatar={userData?.avatar}
            userId={userData?._id}
            hiddenProps={true}
          />
    <Card className="w-5/6 max-w-sm">
      <CardHeader className="flex flex-col justify-center items-center space-y-2">
        <div className="flex flex-row justify-start items-start w-full">
          <CardTitle className="font-poppins uppercase">
            Nova Publicação
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col relative gap-5">
          <div className="grid items-center gap-1.5 w-full max-w-sm">
            <Label htmlFor="content">Descrição</Label>
            <Input
              type="text"
              key="content"
              placeholder="ex: Descrição da publicação"
              className="font-inter font-medium"
              name="content"
              id="content"
              onChange={handleChangeData}
            />
          </div>

          {!isAnonymous && (
            <div className="grid items-center gap-1.5 w-full max-w-sm">
              <Label htmlFor="references">Marcações</Label>
              <Input
                type="text"
                key="references"
                placeholder="ex: #Hashtag, #HashTag, #hashtag"
                className="font-inter font-medium"
                name="references"
                id="references"
                onChange={handleChangeData}
              />
            </div>
          )}

          <div className="grid items-center gap-1.5 w-full max-w-sm">
            <Label htmlFor="inputFoto">Upload</Label>
            <Input
              type="file"
              key="foto"
              className="font-inter font-medium"
              name="foto"
              id="inputFoto"
              onChange={handleFileChange}
            />
          </div>

          <Switch
            color="primary"
            size="lg"
            onClick={handleIsAnonymous}
            thumbIcon={() =>
              !isAnonymous ? (
                <Earth className="text-primary size-5" />
              ) : (
                <Drama className="text-default-300 size-5" />
              )
            }
          >
            {!isAnonymous ? (
              <CardDescription>Público</CardDescription>
            ) : (
              <CardDescription>Anônimo</CardDescription>
            )}
          </Switch>

          <div className="flex flex-row justify-center items-center">
            <label htmlFor="inputFoto" className="w-full h-fit cursor-pointer">
              <Button className="font-poppins font-bold uppercase tracking-widest">
                <CloudUpload />
                Upload de imagem
              </Button>
            </label>
            <input
              className="hidden"
              type="file"
              name="foto"
              id="inputFoto"
              onChange={handleFileChange}
            />

            <div className="my-3">
              {errorMessage && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-black dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Atenção!</span> {errorMessage}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center items-center">
            <Button
              type="submit"
              className="font-poppins font-bold uppercase tracking-widest"
            >
              <SendHorizontal />
              Enviar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};
