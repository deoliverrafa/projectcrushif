import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";

interface CardProps {
    _id?: string;
    nickname: string;
    email: string;
    campus: string;
    references: string;
    content: string;
    isAnonymous: boolean;
    photoURL?: string;
    userPhotoUrl?: string
}

const Card = (props: CardProps) => {

    return (
        <div className="bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg flex flex-col my-2 p-4 w-4/6 min-w-52 max-w-[350px] ">
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
                            src={!props.isAnonymous ? props.userPhotoUrl : ""}
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
                <div className="my-1 px-2 flex flex-row gap-1">
                    <p className="text-sm font-Poppins text-black dark:text-white break-words">
                        {props.content || ""}
                    </p>
                </div>

                <div className="p-2">
                    {props.photoURL ? (
                        <Image
                            width={300}
                            height={200}
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
                            <div className="my-1 px-2 flex flex-row gap-1">
                                <a key={props._id} className="text-blue-500 dark:text-blue-600 break-words" id={props._id}>
                                    {props.references}
                                </a>
                            </div>
                        )
                        :
                        null
                }

                {
                    !props.isAnonymous ?

                        <div className="flex flex-row gap-2">
                            <p className="text-gray-500 dark:text-gray-400 mx-1">
                                <span className="font-semibold">4 </span>Seguindo
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mx-1">
                                <span className="font-semibold">10 </span>Seguidores
                            </p>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default Card;
