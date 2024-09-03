import { Link } from 'react-router-dom';

import { NavBarReturn } from '../../layout/navbar.layout.tsx';
import { ThemeSwitcher } from '../../components/themeSwitcher.component.tsx';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from '@nextui-org/react';

import {
  BadgeCheck,
  LogOut,
  Trash
} from 'lucide-react';

import { getUserData } from "../../utils/getUserData.tsx";

const SettingsPage = () => {
  const userData = getUserData();

  function logOutHandle() {
    localStorage.setItem('token', "null");
  }

  return (
    <>
      <NavBarReturn title="Configurações" />

      <main className="flex flex-col justify-center items-center h-screen w-full">
        <Card
          className="my-2 w-11/12 max-w-[768px]"
          radius="lg"
        >
          <CardHeader>
            <h1 className="font-poppins font-semibold tracking-widest text-xl">Geral</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-row justify-between items-center">
              <p className="font-inter font-medium tracking-wider">Tema:</p>
              <ThemeSwitcher />
            </div>
          </CardBody>
        </Card>

        <Card
          className="my-2 w-11/12 max-w-[768px]"
          radius="lg"
        >
          <CardHeader>
            <h1 className="font-poppins font-semibold tracking-widest text-xl">Conta</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-row items-center space-x-2">
              <div className="flex relative">
                <div className="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                </div>
                <Avatar
                  size="sm"
                  name={userData.nickname}
                  src={userData.avatar}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center space-x-1">
                  <p className="font-inter font-semibold">
                    {userData.nickname}
                  </p>
                  <BadgeCheck className="text-success size-3" />
                </div>
                <p className="text-default text-tiny font-inter tracking-tight">{userData.email}</p>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex-col justify-start items-start space-y-2">
            <Link
              to={'/'}>
              <Button
                className="font-poppins font-bold uppercase tracking-widest"
                color="danger"
                variant="flat"
                size="md"
                radius="sm"
                startContent={<LogOut className="size-4" />}
                onClick={logOutHandle}
              >
                Deslogar
              </Button>
            </Link>
            <Button
              className="font-poppins font-bold uppercase tracking-widest"
              color="danger"
              variant="flat"
              size="md"
              radius="sm"
              startContent={<Trash className="size-4" />}
            >
              Deletar conta
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default SettingsPage;