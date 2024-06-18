// IMPORT - LIBRARYS //
import { 
  Avatar,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "@nextui-org/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// IMPORT - ICONS //
import { 
  HeartIcon,
  CommentIcon,
  ShareIcon
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
      className={`flex flex-col w-11/12 ${props.className}`}>
      <CardHeader className="justify-between items-center">
        <div className="flex gap-5">
          <Avatar
            isBordered
            as="button"
            color="primary"
            className="font-Poppins uppercase"
            size="sm"
            name={!props.isAnonymous ? props.nickname : ""}
            src={!props.isAnonymous ? props.userAvatar : ""}/>
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
          shadow="lg"
          size="sm"
          className="font-Poppins font-bold uppercase"
          color="primary">
          Seguir
        </Button>
      </CardHeader>
     
      {props.photoURL ? (
        <CardBody>
          <Image
            width={500}
            height={500}
            radius="lg"
            shadow="lg"
            src={props.photoURL}
            alt="Imagem Post"/>
        </CardBody>
      ) :
        null
      }
      
      <CardFooter className="flex-col justify-start items-start">
        {formattedData ?
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="light"
              isIconOnly>
              <HeartIcon className="text-primary size-6"/>
            </Button>
          
            <Button
              variant="light"
              isIconOnly>
              <CommentIcon className="text-primary size-6"/>
            </Button>
          </div>
          
          <div>
            <Button
              variant="light"
              isIconOnly>
              <ShareIcon className="text-primary size-6"/>
            </Button>
          </div>
        </div>
      :
        null
      }
      
        <div className="flex flex-row justify-between items-center my-0.5 w-full">
          <h4 className="font-Poppins text-default text-xs leading-none"><span className="font-semibold">{0}</span> curtidas</h4>
        </div>
        
        <div className="flex flex-row items-center my-0.5 w-full">
          <h4 className="font-Poppins text-xs leading-none w-full"><span className="font-semibold">{!props.isAnonymous ? props.nickname : "Anônimo"}:</span> {props.content || ""}</h4>
        </div>
        
        {!props.isAnonymous ?
        (
        <div className="flex flex-row items-center my-0.5 w-full">
          <div className="flex flex-row justify-center items-center">
            <a key={props._id} className="font-Poppins text-primary text-xs tracking-tight break-words" id={props._id}>
              {props.references}
            </a>
          </div>
        </div>
        )
        :
          null
        }
        
        <div className="flex flex-row justify-between items-center my-0.5 w-full">
          <h4 className="font-Poppins text-default text-xs leading-none">Ver todos os <span className="font-semibold">{0}</span> comentários.</h4>
        </div>
      </CardFooter>
    </Card>
  );
};
