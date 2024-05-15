export default function CardExample() {
    return (
        <div className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-800 rounded-xl shadow flex flex-col my-2 p-2">
            <div className="flex flex-row justify-between items-center my-1">
                <div className="flex flex-row items-center">
                    <div className="relative">
                        <img className="ring-2 ring-purple-500 dark:ring-purple-600 rounded-full mx-1 h-10 w-10" src="./images/user_man.png" alt="user" />
                        <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-green-500 dark:bg-green-600 border-2 border-white rounded-full -top-1 end-0 dark:border-gray-900"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-semibold mx-2">deoliverrafa</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mx-2">@deoliverrafa</p>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <button className="bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800 text-white rounded-3xl font-medium mx-1 p-1.5">SEGUIR</button>
                    <i id="dropdownPostButton" className="fi fi-rr-menu-dots-vertical bg-gradient-to-br text-transparent bg-clip-text from-gray-500 via-gray-700 to-gray-900 dark:from-gray-400 dark:via-gray-500 dark:to-gray-600 mx-1 mt-1" data-dropdown-toggle="dropdownPost"></i>
                    <div id="dropdownPost" className="hidden bg-gray-100 divide-y divide-gray-300 shadow rounded-lg dark:bg-zent-900 dark:divide-gray-600 w-44 z-10">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownPostButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i className="fi fi-rr-user-check text-xs mx-1"></i>
                                    Seguir
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i className="fi fi-rr-heart text-xs mx-1"></i>
                                    Curtir
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i className="fi fi-rr-share text-xs mx-1"></i>
                                    Compartilhar
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i className="fi fi-rr-bookmark text-xs mx-1"></i>
                                    Favoritar
                                </a>
                            </li>
                        </ul>
                        <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-red-500 dark:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-600">
                                <i className="fi fi-rr-ban text-xs mx-1"></i>
                                Bloquear
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-300 dark:hover:bg-gray-600">
                                <i className="fi fi-rr-light-emergency-on mx-1"></i>
                                Reportar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center my-1 px-2">
                <p className="truncate">Alguém sabe onde eu compro açafrão de forma totalmente ILEGAL no campus?</p>
                <p className="text-purple-500 dark:text-purple-600 text-sm underline">MAIS</p>
            </div>
            <div className="my-1 px-2">
                <p className="text-blue-500 dark:text-blue-600">#IFTO #SISTEMAS</p>
            </div>
            <div className="flex flex-row justify-between items-center my-1 px-1">
                <div className="flex flex-row">
                    <p className="text-gray-500 dark:text-gray-400 mx-1"><span className="font-semibold">4 </span>Seguindo</p>
                    <p className="text-gray-500 dark:text-gray-400 mx-1"><span className="font-semibold">10 </span>Seguidores</p>
                </div>
                <i className="fi fi-sr-heart bg-gradient-to-br text-transparent bg-clip-text from-red-400 via-red-600 to-red-800 mx-1"></i>
            </div>
        </div>
    )
}