import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

interface CardProps {
    CardData: {
        _id: string;
        nickname: string;
        email: string;
        campus: string;
        references?: string[];
        content?: string;
    } | null;
}

const Card = (props: CardProps) => {
    return (
        <div className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg flex flex-col my-2 p-4 w-4/6 min-w-60 relative">
            <div className="flex flex-row justify-between items-center gap-3">
                <div className="flex flex-row gap-3 justify-center items-center">
                    <div>
                        <Avatar className="ring-purple-500 ring-2" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold mx-2">{props.CardData?.nickname ? props.CardData.nickname : "Anônimo"}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mx-2">@deoliverrafa</p>
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
                        {props.CardData?.content || ""}
                    </p>
                </div>
                <div className="my-1 px-2 flex flex-row gap-1">
                    {props.CardData?.references?.map((reference, index) => (
                        <a key={index} className="text-blue-500 dark:text-blue-600" id={reference}>
                            {reference}
                        </a>
                    ))}
                </div>
                <div className="flex flex-row gap-2">
                    <p className="text-gray-500 dark:text-gray-400 mx-1">
                        <span className="font-semibold">4 </span>Seguindo
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mx-1">
                        <span className="font-semibold">10 </span>Seguidores
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
