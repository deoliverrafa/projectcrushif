import * as React from "react";
import {
  Toaster
} from "../../components/ui/toaster.tsx"
import {
  useToast
} from "../../hooks/use-toast.ts"

import { NavBarReturn } from "../../components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

import {
  IncognitoSolid,
  EarthSolid,
  TrashOneSolid,
} from "@mynaui/icons-react";

import { getStatusUser } from "../../utils/getStatusUser.tsx";

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
  const {
    toast
  } = useToast()
  
  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} às ${currentDate.toLocaleTimeString()}`;
  
  const [isAnonymous, setAnonymous] = React.useState<boolean>(false);

  const [cardData, setCardData] = React.useState<CardData>({
    content: "",
    isAnonymous: false,
    mentionedUsers: [],
  });

  const [images, setImages] = React.useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const maxFiles = 5;
      if (uploadedImages.length + files.length > maxFiles) {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `Você pode fazer upload de até ${maxFiles} imagens no total, ${formattedDate}`,
        })
        return;
      }

      const newImages = files.map((file) => URL.createObjectURL(file));
      setUploadedImages((prev) => [...prev, ...files]);
      setImages((prev) => [...prev, ...newImages]);
    }
  };


  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    setCardData((prevData) => ({
      ...prevData,
      isAnonymous: isAnonymous,
    }));
  }, [isAnonymous]);

  React.useEffect(() => {
    if (images && images instanceof File) {
      if (
        images.type === "image/jpeg" ||
        images.type === "image/png" ||
        images.type === "image/gif"
      ) {
        const imageUrl = URL.createObjectURL(images);
        setCardData((prevData) => ({
          ...prevData,
          photoURLs: imageUrl,
        }));
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `Por favor, selecione uma imagem válida (JPEG, PNG ou GIF), ${formattedDate}`,
        })
      }
    }
  }, [images]);



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", cardData.content || "");
    formData.append("isAnonymous", isAnonymous.toString());

    if (cardData.mentionedUsers.length > 0) {
      formData.append("mentionedUsers", JSON.stringify(cardData.mentionedUsers));
    }

    // Adiciona cada arquivo ao FormData
    uploadedImages.forEach((file) => {
      formData.append("photos", file); // "photos" deve ser o campo aceito pelo backend
    });

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
        throw new Error("Erro na resposta do servidor.");
      }

      const result = await response.json();

      if (result.posted) {
        window.location.href = "/";
      } else {
        toast( {
          variant: "danger",
          title: "Notificação",
          description: `Falha ao postar. Tente novamente, ${formattedDate}`,
        })
      }
    } catch (error) {
      console.error("Erro:", error);
      toast( {
          variant: "danger",
          title: "Notificação",
          description: `Ocorreu um erro ao enviar sua postagem, ${formattedDate}`,
        })
    }
  }

  getStatusUser(userId)

  const MenuNavbar = () => {
    return (
      <div onClick={handleIsAnonymous}>
        {!isAnonymous ? (
          <EarthSolid />
        ) : (
          <IncognitoSolid />
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
                  {images.map((src, index) => (
                    <Card className="relative w-fit h-fit group">
                      <CardContent className="h-20 w-20 p-0">
                        <img
                          src={src}
                          alt={`Uploaded ${index}`}
                          className="rounded-lg object-cover h-20 w-20"
                        />
                      </CardContent>

                      <div onClick={() => handleDeleteImage(index)} className="cursor-pointer bg-danger text-white rounded-full absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TrashOneSolid />
                      </div>
                    </Card>
                  ))}
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
      <Toaster />
    </>
  );
};

export default PublishPage;
