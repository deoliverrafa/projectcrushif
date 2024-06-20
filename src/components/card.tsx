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

export const CardPost = (props: CardProps) => {
  let formattedData
  if (props.insertAt) {
    const parseDated = parseISO(props.insertAt ?? "")
    formattedData = formatDistanceToNow(parseDated, { locale: ptBR })
  }

  return (
    <Card
      shadow="lg"
      radius="lg"
      className={`flex flex-col w-11/12 max-w-[768px] mt-5 ${props.className}`}>
      <CardHeader className="justify-between items-center">
        <div className="flex gap-5">
          <Avatar
            isBordered
            as="button"
            color="primary"
            className="font-Poppins uppercase"
            size="sm"
            name={!props.isAnonymous ? props.nickname : ""}
            src={!props.isAnonymous ? props.userAvatar : ""} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="font-Poppins text-xs font-semibold leading-none">{!props.isAnonymous ? props.nickname : "Anônimo"}</h4>
            {formattedData ? (
              <h5 className="font-Poppins text-xs tracking-tight text-default">há {formattedData} atrás.</h5>
            ) : (
              null
            )}
          </div>
        </div>

        <Button
          radius="full"
          size="sm"
          className="font-Poppins font-bold uppercase"
          color="primary">
          Seguir
        </Button>
      </CardHeader>

      <CardBody>
        <div className="flex flex-row items-center my-0.5 w-full h-full ">
          <h4 className="font-Poppins text-xs leading-none w-full h-full items-center"><span className="font-semibold">{!props.isAnonymous ? props.nickname : "Anônimo"}:</span> {props.content || ""}</h4>
        </div>

        {!props.isAnonymous ?
          (
            <div className="flex flex-row items-center my-0.5 w-full">
              <a key={props._id} className="font-Poppins text-primary text-xs tracking-tight break-words" id={props._id}>
                {props.references}
              </a>
            </div>
          )
          :
          null
        }

      </CardBody>

      <div className="w-full flex flex-row justify-center">
        {props.photoURL ? (
          <Image
            width={500}
            height={500}
            radius="lg"
            shadow="lg"
            src={props.photoURL}
            alt="Imagem Post" />
        ) :
          null
        }
      </div>

      <CardFooter className="flex-col justify-start items-start">
        <Divider />
        {/* <div className="flex flex-row justify-between items-center w-full">
          <Button
            className="font-Poppins text-default text-xs tracking-tight"
            size="sm"
            variant="light">
            <span className="font-semibold">{0}</span>
            curtidas
          </Button>

          <Button
            className="font-Poppins text-default text-xs tracking-tight"
            size="sm"
            variant="light">
            <span className="font-semibold">{0}</span>
            comentários
          </Button>
        </div> */}

        <Divider />
        {formattedData ?
          <div className="flex flex-row justify-between items-center w-full">
            <Button
              className="font-Poppins text-default text-xs uppercase tracking-tight"
              variant="light">
              <HeartIcon className="text-primary size-4" />
              Curtir
            </Button>

            <Button
              className="font-Poppins text-default text-xs uppercase tracking-tight"
              variant="light">
              <CommentIcon className="text-primary size-4" />
              Comentar
            </Button>

            <Button
              className="font-Poppins text-default text-xs uppercase tracking-tight"
              variant="light">
              <SendIcon className="text-primary size-4" />
              Enviar
            </Button>
          </div>
          :
          null
        }
      </CardFooter>
    </Card>
  );
};
