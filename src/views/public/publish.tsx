// IMPORT - LIBRARYS //
import { ChangeEvent, useEffect, useState } from "react";

// IMPORT - COMPONENTS //
import { CardPost } from "../../components/card";
import { NavBarReturn } from "../../components/navbar";
import {
  Button,
  Input,
  Switch,
  Card,
  CardHeader,
  CardBody,
  Divider
} from "@nextui-org/react";

// IMPORT - SCRIPTS //
import { getUserData } from "../../utils/getUserData";

// IMPORT - ICONS //
import {
  Earth,
  Drama,
  SendHorizontal,
  CloudUpload
} from 'lucide-react';

// CREATE - INTERFACES //
interface CardData {
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL?: string;
  userPhotoUrl?: string
}


const PublishPage = () => {
  
  const userData = getUserData();

  const [isAnonymous, setAnonymous] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [cardData, setCardData] = useState<CardData>({
    nickname: "",
    email: "",
    campus: "",
    references: "",
    content: "",
    isAnonymous: false
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleIsAnonymous() {
    setAnonymous(!isAnonymous);
  }

  function handleChangeData(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (userData) {
      setCardData((prevData) => ({
        ...prevData,
        nickname: userData.nickname,
        email: userData.email,
        campus: userData.campus,
        isAnonymous: isAnonymous
      }));
    }
  }, [userData]);

  useEffect(() => {
    setCardData((prevData) => ({
      ...prevData,
      isAnonymous: isAnonymous
    }));
  }, [isAnonymous]);

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png" || selectedFile.type === "image/gif") {
        setErrorMessage('');
        const imageUrl = URL.createObjectURL(selectedFile);
        setCardData((prevData) => ({
          ...prevData,
          photoURL: imageUrl
        }));
      } else {
        setErrorMessage("Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).");
      }
    }
  }, [selectedFile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', cardData.nickname);
    formData.append('email', cardData.email);
    formData.append('campus', cardData.campus);
    formData.append('content', cardData.content || "");
    formData.append('references', cardData.references ? cardData.references : "");
    formData.append('avatar', userData?.avatar ? userData.avatar : "")
    formData.append('isAnonymous', isAnonymous.toString());

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    try {
      const response = await fetch(`https://crush-api.vercel.app/post/publish/${localStorage.getItem('token')}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.posted) {
        window.location.href = "/"
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (

    <>
      <NavBarReturn title="Publique" />
      
      <main>
        <div className="flex flex-col justify-center items-center">
          <Card
            radius="lg"
            className="flex flex-col w-11/12 max-w-[512px] mt-12">
            <CardHeader className="flex-col">
              <Switch
                color="primary"
                size="lg"
                onClick={handleIsAnonymous}
                thumbIcon={() => (!isAnonymous ? <Earth className="text-primary size-5" /> : <Drama className="text-default-300 size-5" />)}>
                {!isAnonymous ? (<p className="font-inter font-semibold">Público</p>) : (<p className="font-inter font-semibold">Anônimo</p>)}
              </Switch>

              <div className="flex flex-col justify-center items-center my-1 w-full">
                <h1 className="font-inter text-default text-xs tracking-tight my-0.5">(Acompanhe seu post)</h1>
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
                {isAnonymous && (
                  <div>
                    <h1 className="font-inter text-default text-xs tracking-tight my-0.5">(Seu nome não aparecerá no seu post)</h1>
                  </div>
                )}
              </div>
            </CardHeader>
            <Divider />

            <CardBody>
              <form onSubmit={handleSubmit} className="flex flex-col relative gap-5">
                {/* Wrap inputs */}
                <div className="flex flex-row justify-center items-center">
                  <Input
                    key="content"
                    type="text"
                    radius="lg"
                    size="sm"
                    name="content"
                    label="Descrição"
                    placeholder="Descrição da sua publicação"
                    className="font-inyer font-medium w-full"
                    onChange={handleChangeData} />
                </div>

                {!isAnonymous &&
                  <div className="flex flex-row justify-center items-center">
                    <Input
                      key="references"
                      type="text"
                      radius="lg"
                      size="sm"
                      name="references"
                      label="Marcações"
                      placeholder="Levante uma corrente"
                      className="font-Poppins font-medium w-full"
                      onChange={handleChangeData}
                    />
                  </div>
                }

                <div className="flex flex-row justify-center items-center">
                  <label
                    htmlFor="inputFoto"
                    className="w-full h-fit cursor-pointer">
                    <Button
                      radius="full"
                      size="md"
                      color="primary"
                      variant="bordered"
                      fullWidth={true}
                      className="font-poppins font-bold uppercase tracking-widest"
                      as="span"
                      startContent={
                        <CloudUpload />
                      }
                    >
                      Upload de imagem
                    </Button>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="foto"
                    id="inputFoto"
                    onChange={handleFileChange} />

                  <div className="my-3">
                    {errorMessage && (
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-black dark:text-red-400" role="alert">
                        <span className="font-medium">Atenção!</span> {errorMessage}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center">
                  <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    size="md"
                    fullWidth={true}
                    className="font-poppins font-bold uppercase tracking-widest"
                    startContent={<SendHorizontal />}
                  >
                    Enviar
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </main>
    </>
  );
};

export default PublishPage;