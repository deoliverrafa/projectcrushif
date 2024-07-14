// IMPORT - LIBRARYS //
import {
  Avatar,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider
} from "@nextui-org/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// IMPORT - ICONS //
import {
  HeartIcon,
  CommentIcon,
  SendIcon
} from "./../icons/icons.tsx";
import axios from "axios";
import { useEffect, useState } from "react";

// CREATE - INTERFACES //
interface CardProps {
  className?: string;
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

  console.log('Id usuário', props.userId);
  console.log("Dados usuário", userData);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4040/user/id/${props.userId}`);

        setUserData(response.data.userFinded);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setUserData({
          nickname: 'Deletado',
          avatar: 'path/to/deleted-user-avatar.png',
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
    <Card shadow="lg" radius="lg" className={`flex flex-col w-11/12 max-w-[768px] mt-5 ${props.className}`}>
      <CardHeader className="justify-between items-center">
        <div className="flex gap-5">
          <Avatar
            isBordered
            as="button"
            color="primary"
            className="font-Poppins uppercase"
            size="sm"
            name={!props.isAnonymous ? userData?.nickname : (props.nickname ? props.nickname : '')}
            src={!props.isAnonymous ? userData?.avatar : (props.userAvatar ? props.userAvatar : '')}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="font-Poppins text-xs font-semibold leading-none">
              {!props.isAnonymous ? userData?.nickname : (props.nickname ? props.nickname : 'Anônimo')}
            </h4>
            {formattedData && (
              <h5 className="font-Poppins text-xs tracking-tight text-default">há {formattedData} atrás.</h5>
            )}
          </div>
        </div>
        <Button radius="full" size="sm" className="font-Poppins font-bold uppercase" color="primary">
          Seguir
        </Button>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col">
          {props.photoURL && (
            <Image
              className="mb-3"
              width={500}
              height={500}
              radius="lg"
              shadow="lg"
              src={props.photoURL}
              alt="Imagem Post"
            />
          )}
          <div className="flex flex-row items-center my-0.5 w-full h-full">
            <h4 className="font-Poppins text-xs leading-none w-full h-full items-center">
              <span className="font-semibold">
                {!props.isAnonymous ? userData?.nickname : (props.nickname ? props.nickname : 'Anônimo')}:
              </span>{' '}
              {props.content || ''}
            </h4>
          </div>
          {props.references !== '' && !props.isAnonymous && (
            <div className="flex flex-row items-center my-0.5 w-full">
              <a key={props._id} className="font-Poppins text-primary text-xs tracking-tight break-words" id={props._id}>
                {props.references}
              </a>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex-col justify-start items-start">
        <Divider />
        {formattedData && (
          <div className="flex flex-row justify-between items-center w-full">
            <div className="font-Poppins text-default text-xs uppercase tracking-tight flex flex-row items-center">
              <Button className="font-Poppins text-default text-xs uppercase tracking-tight" variant="light">
                <HeartIcon className="text-primary " />
                <p className="max-[340px]:hidden">Curtir</p>
              </Button>
            </div>
            <div className="font-Poppins text-default text-xs uppercase tracking-tight flex flex-row items-center">
              <Button className="font-Poppins text-default text-xs uppercase tracking-tight" variant="light">
                <CommentIcon className="text-primary " />
                <p className="max-[340px]:hidden">Comentarios</p>
              </Button>
            </div>
            <div className="font-Poppins text-default text-xs uppercase tracking-tight flex flex-row items-center">
              <Button className="font-Poppins text-default text-xs uppercase tracking-tight" variant="light">
                <SendIcon className="text-primary " />
                <p className="max-[340px]:hidden">Enviar</p>
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};