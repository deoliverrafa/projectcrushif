import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChatCircle, HeartStraight } from "phosphor-react";

interface CardProps {
    clasName?: string;
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

const Card = (props: CardProps) => {
    let formattedData
    if (props.insertAt) {
        const parseDated = parseISO(props.insertAt ?? "")
        formattedData = formatDistanceToNow(parseDated, { locale: ptBR })
    }

    return (
        <div className={`bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg flex flex-col my-2 p-4 w-11/12 max-w-[400px] ${props.clasName}`}>
            <div className="flex flex-row justify-between items-center relative top-0 right-0">
                <div className="flex flex-row gap-1 justify-center items-center">
                    <div>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform cursor-pointer"
                            color="secondary"
                            name={!props.isAnonymous ? props.nickname : ""}
                            size="sm"
                            src={!props.isAnonymous ? props.userAvatar : ""}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold mx-2">{!props.isAnonymous ? props.nickname : "Anônimo"}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mx-2">{!props.isAnonymous ? `@${props.nickname}` : null}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <Dropdown className="bg-gray-300 dark:bg-zinc-800 w-auto h-auto" placement="bottom-end">
                        <DropdownTrigger>
                            <i className="fi fi-rr-menu-dots-vertical"></i>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="follow" className="font-Poppins" color="secondary">Seguir </DropdownItem>
                            <DropdownItem key="share" className="font-Poppins" color="secondary">Compartilhar</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="flex flex-col mt-4 justify-center items-start">
                <div className="my-1 flex flex-row gap-1 items-start justify-start">
                    <p className=" font-Poppins text-black dark:text-white break-words">
                        {props.content || ""}
                    </p>
                </div>

                <div className="p-2">
                    {props.photoURL ? (
                        <Image
                            width={500}
                            height={500}
                            src={props.photoURL}
                            alt="Imagem Post"
                        />
                    ) :
                        null
                    }
                </div>

                {
                    !props.isAnonymous ?
                        (
                            <div className="my-1 flex flex-row gap-1">
                                <a key={props._id} className="text-blue-500 dark:text-blue-600 break-words" id={props._id}>
                                    {props.references}
                                </a>
                            </div>
                        )
                        :
                        null
                }


                {formattedData ?
                    <div className="flex flex-row gap-4 w-full text-balance items-center">
                        <div className="flex flex-row items-center gap-2 justify-items-center">
                            <HeartStraight weight="bold" size={21} /><p>{0}</p>
                        </div>

                        <div className="flex flex-row items-center gap-2 justify-items-center">
                            <ChatCircle weight="bold" size={21} /><p>{0}</p>
                        </div>

                        <div className="flex flex-row items-center gap-2 justify-items-center">
                            {formattedData}
                        </div>

                    </div>
                    :
                    null
                }


            </div>
        </div>
    );
};

export default Card;
