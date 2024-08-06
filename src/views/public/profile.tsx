// IMPORT - LIBRARYS //
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// IMPORT - COMPONENTS //
import { NavBarReturn } from "../../components/navbar";
import { BaseUserShow } from "../../components/baseUserShow";
import { Loading } from './../../components/loading.tsx';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Button
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
  AtSign,
  PencilRuler,
  Share2,
  PenTool,
  Image,
  Film,
  SearchX,
  BadgeCheck
} from "lucide-react";

// IMPORT - SCRIPTS //
import { getUserDataById } from './../../utils/getUserDataById.tsx';

interface User {
  _id: string
  nickname: string
  email: string
  campus: string
  avatar: string
  birthdaydata: string
  Nfollowers: number
  Nfollowing: number
  curso: string
  type: string
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [selected, setSelected] = useState('text');
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
    const fetchData = async () => {
      const data = await getUserDataById(id);
      setUserData(data);
      if (data && data.birthdaydata) {
        const calculatedAge = calculateAge(data.birthdaydata);
        setAge(calculatedAge);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-full h-svh flex flex-col">
      <NavBarReturn title="Perfil" />
      {userData ? (
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
                  name={userData.nickname}
                  src={userData.avatar}
                />
              </div>
              <div className="flex flex-row justify-around items-center space-x-2 w-full">
                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                  <p className="text-default font-inter font-bold text-tiny">0</p>
                  <p className="text-default font-inter font-medium uppercase tracking-wide leading-none text-tiny">Posts</p>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                  <p className="text-default font-inter font-bold text-tiny">{userData.Nfollowers}</p>
                  <p className="text-default font-inter font-medium uppercase tracking-wide leading-none text-tiny">Seguidores</p>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer space-y-1">
                  <p className="text-default font-inter font-bold text-tiny">{userData.Nfollowing}</p>
                  <p className="text-default font-inter font-medium uppercase tracking-wide leading-none text-tiny">Seguindo</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0 space-y-1.5">
              <p className="font-poppins font-medium uppercase tracking-wider text-tiny">{userData.name ? userData.name : 'Nome indisponível'}</p>
              <Chip
                color="default"
                variant="flat"
                size="sm"
                startContent={<AtSign className="size-3"/>}
                endContent={<BadgeCheck className={`${userData.type === 'Plus' ? 'text-info' : userData.type === 'Admin' ? 'text-danger' : 'text-success'} size-3`} />}
              >
                {userData.nickname ? userData.nickname : 'indisponível'}
              </Chip>
              <p className="font-inter font-medium tracking-wider text-tiny">{age ? `Idade: ${age} anos` : 'Idade: indisponível'}</p>
              <p className="font-inter font-medium tracking-wider text-tiny">{userData.curso ? `Curso: ${userData.curso}` : 'Curso: indisponível'}</p>
              <p className="font-inter font-medium tracking-wider text-tiny">{userData.campus ? `Campus: ${userData.campus}` : 'Campus: indisponível'}</p>
              <div className="flex flex-row justify-between items-center py-1 space-x-1">
                <Link to="/profile/edit">
                  <Button 
                    className="font-poppins font-bold uppercase tracking-widest"
                    color="primary"
                    variant="flat"
                    size="sm"
                    startContent={<PencilRuler className="size-3" />}
                  >
                    Editar Perfil
                  </Button>
                </Link>
                <Button 
                  className="font-poppins font-bold uppercase tracking-widest"
                  color="primary"
                  variant="flat"
                  size="sm"
                  startContent={<Share2 className="size-3" />}
                >
                  Compartilhar
                </Button>
              </div>
            </CardBody>
            <CardFooter className="flex flex-col pt-0">
              <div className="flex flex-row space-x-10">
                <Button
                  variant="light"
                  radius="lg"
                  className={`flex flex-col justify-center items-center ${selected === 'text' ? 'text-primary border-b-2 border-primary p' : ''}`}
                  isIconOnly={true}
                  onClick={() => handleSelect('text')}>
                  <PenTool />
                </Button>
                <Button
                  variant="light"
                  radius="lg"
                  className={`flex flex-col justify-center items-center ${selected === 'image' ? 'text-primary border-b-2 border-primary p' : ''}`}
                  isIconOnly={true}
                  onClick={() => handleSelect('image')}>
                  <Image />
                </Button>
                <Button
                  variant="light"
                  radius="lg"
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
