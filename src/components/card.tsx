import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";

interface CardProps {
    CardData: {
        _id?: string;
        nickname: string;
        email: string;
        campus: string;
        references?: string;
        content?: string;
        title?: string;
        photo?: string;
        isAnonymous: boolean;
    }
}

const Card = (props: CardProps) => {
    return (
        <div className="bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-800 rounded-xl shadow-lg flex flex-col my-2 p-4 w-4/6 min-w-60 ">
            <div className="flex flex-row justify-between items-center relative top-0 right-0">
                <div className="flex flex-row gap-1 justify-center items-center">
                    <div>
                        <Avatar className="ring-purple-500 ring-2" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold mx-2">{!props.CardData.isAnonymous ? props.CardData.nickname : "Anônimo"}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mx-2">{!props.CardData.isAnonymous ? `@${props.CardData.nickname}` : null}</p>
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
                        {props.CardData.content || ""}
                    </p>
                </div>

                <div className="p-2">
                    {props.CardData.photo ? (
                        <Image
                            width={300}
                            height={200}
                            src={props.CardData.photo}
                            alt="Imagem Post"
                        />
                    ) :
                        null
                    }
                </div>

                <div className="my-1 px-2 flex flex-row gap-1">
                    <a key={props.CardData._id} className="text-blue-500 dark:text-blue-600 break-words" id={props.CardData._id}>
                        {props.CardData.references}
                    </a>
                </div>

                {
                    !props.CardData.isAnonymous ?

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
