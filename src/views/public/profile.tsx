// IMPORT - LIBRARYS //
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// IMPORT - COMPONENTS //
import { NavBarReturn } from "../../components/navbar";
import { Loading } from "./../../components/loading.component.tsx";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Button,
} from "@nextui-org/react";

// IMPORT - ICONS //
import {
  PencilRuler,
  Share2,
  PenTool,
  Image,
  Film,
  SearchX,
  BadgeCheck,
  UserRoundPlus
} from "lucide-react";

// IMPORT - SCRIPTS //
import { getUserData } from "./../../utils/getUserData";
import { getUserDataById } from "./../../utils/getUserDataById";
import { handleShare } from './../../controllers/shareProfile.ts';

interface User {
  _id: string;
  nickname: string;
  email: string;
  campus: string;
  avatar: string;
  birthdaydata: string;
  Nfollowers: number;
  Nfollowing: number;
  curso: string;
  type: string;
}

const ProfilePage = () => {
  const currentUser = getUserData();
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [selected, setSelected] = useState("text");
  const { id } = useParams();

  const handleSelect = (item: string) => {
    setSelected(item);
  };

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const fetchViewingUserData = async () => {
      try {
        const data = await getUserDataById(id);
        setViewingUser(data);
        if (data && data.birthdaydata) {
          const calculatedAge = calculateAge(data.birthdaydata);
          setAge(calculatedAge);
        }
      } catch (error) {
        console.error("Error fetching viewing user data:", error);
      }
    };

    if (id) {
      fetchViewingUserData();
    }
  }, [id]);

  if (!currentUser || !viewingUser) {
    return <Loading />;
  }

  const isOwnProfile = currentUser._id === viewingUser._id;

  return (
    <div className="w-full h-svh flex flex-col">
      <NavBarReturn title="Perfil" />
      {viewingUser ? (
        <main className="flex flex-col justify-center items-center select-none h-full w-full">
          <Card className="w-11/12 max-w-[768px]">
            <CardHeader className="items-center space-x-4">
              <div className="flex relative">
                <div className="flex absolute right-0.5 bottom-0.5 h-3 w-3 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-3 w-3"></span>
                </div>
                <Avatar
                  size="lg"
                  radius="full"
                  name={viewingUser.nickname}
                  src={viewingUser.avatar}
                />
              </div>
              <div className="flex flex-row justify-around items-center space-x-2 w-full">
                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                  <p className="text-default font-inter font-bold text-tiny">0</p>
                  <p className="text-default font-inter font-medium uppercase tracking-wide leading-none text-tiny">Posts</p>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                  <p className="text-default font-inter font-bold text-tiny">{viewingUser.Nfollowers}</p>
                  <p className="text-default font-inter font-medium uppercase tracking-wide leading-none text-tiny">Seguidores</p>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                  <p className="text-default font-inter font-bold text-tiny">{viewingUser.Nfollowing}</p>
                  <p className="text-default font-inter font-medium uppercase tracking-wide leading-none text-tiny">Seguindo</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0 space-y-1.5">
              <p className="font-poppins font-medium uppercase tracking-wider text-tiny">{viewingUser.name ? viewingUser.name : 'Nome indisponível'}</p>
              <Chip
                className="space-x-0.5"
                color="default"
                variant="flat"
                size="sm"
                endContent={<BadgeCheck className={`${viewingUser.type === 'Plus' ? 'text-info' : viewingUser.type === 'Admin' ? 'text-danger' : 'text-success'} size-3`} />}
              >
                {viewingUser.nickname ? `@${viewingUser.nickname}` : 'indisponível'}
              </Chip>
              <p className="font-inter font-medium tracking-wider text-tiny">{age ? `Idade: ${age} anos` : 'Idade: indisponível'}</p>
              <p className="font-inter font-medium tracking-wider text-tiny">{viewingUser.curso ? `Curso: ${viewingUser.curso}` : 'Curso: indisponível'}</p>
              <p className="font-inter font-medium tracking-wider text-tiny">{viewingUser.campus ? `Campus: ${viewingUser.campus}` : 'Campus: indisponível'}</p>
              <div className="flex flex-row justify-between items-center space-x-1">
                {isOwnProfile && (
                  <Link
                    className="flex justify-center items-center w-full"
                    to="/profile/edit"
                  >
                    <Button 
                      className="font-poppins font-bold uppercase tracking-widest"
                      color="primary"
                      variant="flat"
                      size="md"
                      fullWidth={true}
                      startContent={<PencilRuler className="size-4" />}
                    >
                      Editar
                    </Button>
                  </Link>
                )}
                {!isOwnProfile && (
                  <Button 
                    className="font-poppins font-bold uppercase tracking-widest"
                    color="primary"
                    variant="flat"
                    size="md"
                    fullWidth={true}
                    startContent={<UserRoundPlus className="size-4" />}
                  >
                    Seguir
                  </Button>
                )}
                <Button 
                  className="font-poppins font-bold uppercase tracking-widest"
                  color="primary"
                  variant="flat"
                  size="md"
                  fullWidth={true}
                  isIconOnly={true}
                  onClick={() => handleShare(viewingUser.nickname, id)}
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
            </CardBody>
            <CardFooter className="flex flex-col pt-0">
              <div className="flex flex-row space-x-10">
                <Button
                  variant="light"
                  radius="none"
                  className={`flex flex-col justify-center items-center ${selected === 'text' ? 'text-primary border-b-2 border-primary p' : ''}`}
                  isIconOnly={true}
                  onClick={() => handleSelect('text')}>
                  <PenTool />
                </Button>
                <Button
                  variant="light"
                  radius="none"
                  className={`flex flex-col justify-center items-center ${selected === 'image' ? 'text-primary border-b-2 border-primary p' : ''}`}
                  isIconOnly={true}
                  onClick={() => handleSelect('image')}>
                  <Image />
                </Button>
                <Button
                  variant="light"
                  radius="none"
                  className={`flex flex-col justify-center items-center ${selected === 'video' ? 'text-primary border-b-2 border-primary p' : ''}`}
                  isIconOnly={true}
                  onClick={() => handleSelect('video')}>
                  <Film />
                </Button>
              </div>
              <Card className="mt-6">
                <CardBody className="flex flex-col justify-center items-center space-y-2 w-full">
                  <SearchX className="text-default size-14" />
                  <p className="text-default font-inter font-medium text-tiny text-center w-full">Usuário não possui nenhuma publicação de {selected === 'text' ? 'texto' : selected === 'image' ? 'imagem' : 'video'}.</p>
                </CardBody>
              </Card>
            </CardFooter>
          </Card>
        </main>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfilePage;
