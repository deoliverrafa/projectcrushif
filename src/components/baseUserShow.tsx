import { Avatar } from "@nextui-org/react";
import avatar from "../../public/images/RafaelImage.png"
import { Eye, Users } from "phosphor-react";

export default function BaseUserShow() {
    return (

        // cabeçalho da estrutura de settings

        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-5/6 h-fit rounded-lg bg-zinc-300 dark:bg-zinc-800 shadow-lg shadow-default-400">
                <div className="flex justify-center">
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform mt-4"
                        color="secondary"
                        name="Jason Hughes"
                        size="sm"
                        src={avatar}
                    />
                </div>

                {/* Nickname de usuário */}
                <div className="flex w-full justify-center mt-3">
                    <p className="text-bold font-Poppins text-black dark:text-white">Rafael Oliveira</p>
                </div>


                {/* Seção seguidores seguindo.. */}
                <div className="mt-4">
                    <div className="flex w-full h-auto justify-around">
                        <div className="flex flex-col">
                            <Users size={32} weight="bold" />
                            <p className="text-bold font-Poppins  text-black dark:text-white">1302</p>
                        </div>

                        <div className="flex flex-col">
                            <Eye size={32} weight="bold" />
                            <p className="text-bold font-Poppins  text-black dark:text-white">1302</p>
                        </div>

                        <div className="flex flex-col">
                            <Eye size={32} weight="bold" />
                            <p className="text-bold font-Poppins  text-black dark:text-white">1302</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}