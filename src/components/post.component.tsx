import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

import {
  Avatar,
  Image,
  Modal,
  ModalContent,
  Button,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";

import {
  BadgeCheck,
  Heart,
  MessageCircleHeart,
  HandHeart,
  Share2,
  X,
  AlignRight,
  ShieldX,
  Flag,
  Crown,
  UserRoundPlus,
  CircleUserRound
} from 'lucide-react';

// import { getUserData } from './../utils/getUserData.tsx';

interface CardProps {
  className?: string;
  hiddenProps?: boolean;
  handlePost?: () => void;
  handlePostClose?: () => void;
  userId?: string;
  _id?: string;
  nickname: string;
  email: string;
  campus: string;
  references: string;
  content: string;
  isAnonymous: boolean;
  photoURL?: string;
  userAvatar?: string
  insertAt?: string;
  id?: string;
}

interface UserData {
  nickname: string
  avatar: string
  email: string
}

export const CardPost = (props: CardProps) => {
  const [userData, setUserData] = useState<UserData>();
  const [formattedData, setFormattedData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_ID}${props.userId}`);

        setUserData(response.data.userFinded);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setUserData({
          nickname: 'Deletado',
          avatar: '',
          email: 'Deletado'
        });
      }
    };

    fetchUserData();

    if (props.insertAt) {
      const parsedDate = parseISO(props.insertAt);
      setFormattedData(formatDistanceToNow(parsedDate, { locale: ptBR }));
    }
  }, [props.userId, props.insertAt]);


  return (
    <Card>
      <CardHeader className="justify-between items-center">
        <Link to={`/profile/${props.id}`} className="flex space-x-2">
          <div className="flex relative">
            <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
              <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
              <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
            </div>
            <Avatar
              as="button"
              className="font-poppins uppercase"
              size="sm"
              name={!props.isAnonymous ? userData?.nickname : ''}
              src={!props.isAnonymous ? userData?.avatar : ''}
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex flex-row items-center space-x-1">
              <h4 className="font-inter text-xs font-bold leading-none">
                {!props.isAnonymous ? userData?.nickname : "Anônimo"}
              </h4>
              <BadgeCheck className="text-success size-3" />
            </div>
            {formattedData && (
              <h5 className="font-poppins text-tiny tracking-tight text-default">há {formattedData} atrás.</h5>
            )}
          </div>
        </Link>
        <Button
          radius="full"
          size="sm"
          className={`${props.hiddenProps === true ? 'hidden' : ''} font-poppins tracking-widest font-bold uppercase`}
          color="primary"
          variant="flat"
          startContent={<UserRoundPlus className="size-4" />}
        >
          Seguir
        </Button>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="cursor-pointer flex flex-col" onClick={props.handlePost}>
          {props.photoURL && (
            <div className="flex justify-center items-center">
              <Image
                className="object-contain mb-3 max-h-[500px] w-[500px]"
                radius="lg"
                src={props.photoURL}
                alt="Imagem Post"
              />
            </div>
          )}
          <div className="flex flex-row items-center mb-0.5 w-full h-full">
            <h4 className="font-inter text-xs leading-none w-full h-full items-center">
              <span className="font-bold">
                {!props.isAnonymous ? userData?.nickname : "Anônimo"}:
              </span>{' '}
              {props.content || ''}
            </h4>
          </div>
          {props.references !== '' && !props.isAnonymous && (
            <div className="flex flex-row items-center my-0.5 space-x-1 w-full">
              <p className="text-primary font-inter uppercase tracking-tight text-tiny">Marcações:</p>
              <a key={props._id} className="font-inter text-primary text-tiny tracking-wide break-words" id={props._id}>
                {props.references}
              </a>
            </div>
          )}
        </div>
        <div className={`${props.hiddenProps === true ? 'hidden' : ''} flex flex-row justify-between items-center mt-0.5 w-full`}>
          <p className="text-default font-inter tracking-wider text-tiny">ver as <span className="text-foreground font-medium">{0}</span> curtidas.</p>
          <p className="text-default font-inter tracking-wider text-tiny">ver os <span className="text-foreground font-medium">{0}</span> comentários.</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col justify-start items-start">
        <Divider />
        {formattedData && (
          <div className="flex flex-row justify-between items-center py-2 w-full">
            <Button
              color="primary"
              variant="flat"
              radius="full"
              size="sm"
              startContent={<Heart className="fill-primary" />}
            >
              <p className="font-poppins font-semibold">Curtir</p>
            </Button>
            <Button
              color="primary"
              variant="flat"
              radius="full"
              size="sm"
              startContent={<MessageCircleHeart />}
            >
              <p className="font-poppins font-semibold">Comentar</p>
            </Button>
            <Button
              color="primary"
              variant="flat"
              radius="full"
              size="sm"
              startContent={<HandHeart />}
            >
              <p className="font-poppins font-semibold">Enviar</p>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export const ModalPost = (props: CardProps) => {
  // const userData = getUserData();

  return (
    <Modal
      className="sm:w-full md:min-w-[500px]"
      placement="bottom-center"
      backdrop="blur"
      scrollBehavior="inside"
      isOpen={true}
    >
      <ModalContent>
        <Card
          className="sm:w-full md:min-w-[500px]"
        >
          <CardHeader className="justify-between items-center">
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              onClick={props.handlePostClose}
            >
              <X />
            </Button>
            
            <Divider className="w-16"/>

            <Dropdown>
              <DropdownTrigger>
                <AlignRight className="cursor-pointer" />
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem
                  href="/profile"
                  showDivider={true}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <div className="flex relative">
                      <div className="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                        <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                        <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                      </div>
                      <Avatar
                        size="sm"
                        name={!props.isAnonymous ? props.nickname : 'Anônimo'}
                        src={!props.isAnonymous ? props.userAvatar : ''}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-1">
                      <p className="font-inter font-semibold">
                        {!props.isAnonymous ? props.nickname : 'Anônimo'}
                      </p>
                      <BadgeCheck className="text-success size-3" />
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem
                  className="font-inter"
                  startContent={<UserRoundPlus className="size-4" />}
                >
                  <p className="font-inter font-medium">Seguir</p>
                </DropdownItem>
                <DropdownItem
                  className="font-inter"
                  startContent={<CircleUserRound className="size-4" />}
                >
                  <p className="font-inter font-medium">Sobre está conta</p>
                </DropdownItem>
                <DropdownItem
                  className="font-inter"
                  startContent={<Share2 className="size-4" />}
                >
                  <p className="font-inter font-medium">Compartilhar</p>
                </DropdownItem>
                <DropdownItem
                  className="font-inter"
                  showDivider={true}
                  startContent={<Crown className="size-4" />}
                >
                  <p className="font-inter font-medium">Favoritar</p>
                </DropdownItem>
                <DropdownItem
                  className="text-danger font-inter"
                  startContent={<ShieldX className="size-4" />}
                >
                  <p className="font-inter font-medium">Bloquear</p>
                </DropdownItem>
                <DropdownItem
                  className="text-danger font-inter"
                  startContent={<Flag className="size-4" />}
                >
                  <p className="font-inter font-medium">Denúnciar</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
          <Divider />
          {props.photoURL && (
            <CardContent className="pb-0">
              <Image
                className="object-contain max-h-[500px] w-[500px]"
                radius="lg"
                src={props.photoURL}
                alt="Imagem Post"
              />
            </CardContent>
          )}
          <CardFooter className="flex-col justify-start items-start">
            <div className="flex flex-row items-center mb-0.5 w-full h-full">
              <h4 className="font-inter text-xs leading-none w-full h-full items-center"><span className="font-bold">{!props.isAnonymous ? props.nickname : 'Anônimo'}</span>: {props.content}</h4>
            </div>
            <div className="flex flex-row items-center my-0.5 space-x-1 w-full">
              <p className="text-primary font-inter uppercase tracking-tight text-tiny">{props.references && "Marcações:"}</p>
              <a className="font-inter text-primary text-xs tracking-tight break-words">
                {props.references}
              </a>
            </div>
            <div className="flex flex-row justify-between items-center mt-0.5 pb-4 w-full">
              <p className="text-default font-inter tracking-wider text-tiny">ver as <span className="text-foreground font-medium">{0}</span> curtidas.</p>
              <p className="text-default font-inter tracking-wider text-tiny">ver os <span className="text-foreground font-medium">{0}</span> comentários.</p>
            </div>
          </CardFooter>
        </Card>
      </ModalContent>
    </Modal>
  );
};