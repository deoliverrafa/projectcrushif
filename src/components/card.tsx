// IMPORT - LIBRARYS //
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// IMPORT - COMPONENTS //
import {
  Avatar,
  Badge,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider
} from "@nextui-org/react";

// IMPORT - ICONS //
import {
  BadgeCheck,
  Heart,
  MessageCircleHeart,
  HandHeart
} from 'lucide-react';

// CREATE - INTERFACES //
interface CardProps {
  className?: string;
  hiddenProps?: boolean;
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
        
        const response = await axios.get(`https://crush-api.vercel.app/user/id/${props.userId}`);
        
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
    <Card
      radius="lg" 
      className={`flex flex-col w-11/12 max-w-[768px] mt-5 ${props.className}`}
    >
      <CardHeader className="justify-between items-center">
        <div className="flex gap-5">
          <Badge
            content=""
            color="success"
            size="sm"
            placement="bottom-right"
            shape="circle"
          >
            <Avatar
              as="button"
              color="primary"
              className="font-poppins uppercase"
              size="sm"
              isBordered={true}
              name={!props.isAnonymous ? userData?.nickname : ''}
              src={!props.isAnonymous ? userData?.avatar : ''}
            />
          </Badge>
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex flex-row items-center space-x-1">
              <h4 className="font-inter text-xs font-semibold leading-none">
                {!props.isAnonymous ? userData?.nickname : "Anônimo"}
              </h4>
              <BadgeCheck className="text-success size-3" />
            </div>
            {formattedData && (
              <h5 className="font-inter text-xs tracking-tight text-default">há {formattedData} atrás.</h5>
            )}
          </div>
        </div>
        <Button 
          radius="full" 
          size="sm" 
          className={`${props.hiddenProps === true ? 'hidden' : ''} font-poppins tracking-widest font-bold uppercase`} 
          color="primary"
          variant="bordered"
        >
          Seguir
        </Button>
      </CardHeader>
      <CardBody className="pb-0">
        <div className="flex flex-col">
          {props.photoURL && (
            <div className="flex justify-center items-center">
              <Image
                className="object-contain mb-3 max-h-[500px] max-w-[500px]"
                radius="lg"
                src={props.photoURL}
                alt="Imagem Post"
              />
            </div>
          )}
          <div className="flex flex-row items-center mb-0.5 w-full h-full">
            <h4 className="font-inter text-xs leading-none w-full h-full items-center">
              <span className="font-semibold">
                {!props.isAnonymous ? userData?.nickname : "Anônimo"}:
              </span>{' '}
              {props.content || ''}
            </h4>
          </div>
          {props.references !== '' && !props.isAnonymous && (
            <div className="flex flex-row items-center my-0.5 space-x-1 w-full">
              <p className="text-primary font-inter tracking-tight text-xs">Marcações:</p>
              <a key={props._id} className="font-inter text-primary text-xs tracking-tight break-words" id={props._id}>
                {props.references}
              </a>
            </div>
          )}
        </div>
        <div className={`${props.hiddenProps === true ? 'hidden' : ''} flex flex-row justify-between items-center mt-0.5 w-full`}>
          <p className="text-default font-inter tracking-tight text-xs">Ver as <span className="font-bold">{0}</span> curtidas.</p>
          <p className="text-default font-inter tracking-tight text-xs">Ver os <span className="font-bold">{0}</span> comentários.</p>
        </div>
      </CardBody>
      <CardFooter className="flex-col justify-start items-start">
        <Divider />
        {formattedData && (
          <div className="flex flex-row justify-between items-center py-2 w-full">
            <Button 
              color="primary"
              variant="flat"
              radius="full"
              size="sm"
              startContent={<Heart />}
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