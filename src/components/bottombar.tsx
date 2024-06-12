import { Badge, Button } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

interface bottomProps {
    className?: string;
}

export function Bottombar({className}: bottomProps) {

    return (
        <>
            <nav className={`bg-gray-200/70 dark:bg-zinc-900/70 backdrop-blur-sm fixed bottom-0 flex flex-row justify-around items-center w-full animate-appearance-in z-10 ${className}`}>
                <NavLink to='/' >
                    {({ isActive }) => isActive ?
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center p-2">
                                    <i className="fi fi-sr-home text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-purple-400 via-purple-600 to-purple-800 dark:from-purple-400 dark:via-purple-500 dark:to-purple-600"></i>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center p-2">
                                    <i className="fi fi-rr-home text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-gray-500 via-gray-600 to-gray-900 dark:from-gray-200 dark:via-gray-400 dark:to-gray-500"></i>
                                </div>
                            </>
                        )
                    }
                </NavLink>
                <NavLink to='/events' >
                    {({ isActive }) => isActive ?
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center">
                                    <i className="fi fi-sr-home text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-purple-400 via-purple-600 to-purple-800 dark:from-purple-400 dark:via-purple-500 dark:to-purple-600"></i>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center p-2">
                                    <i className="fi fi-rr-blog-text text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-gray-500 via-gray-600 to-gray-900 dark:from-gray-200 dark:via-gray-400 dark:to-gray-500"></i>
                                </div>
                            </>
                        )
                    }
                </NavLink>
                <NavLink to='/publish'>
                    <Button className='bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800 shadow-md' radius='full' isIconOnly size='md'>
                        <i className='fi fi-rr-plus text-white dark:text-white'></i>
                    </Button>
                </NavLink>
                <NavLink to='/search' >
                    {({ isActive }) => isActive ?
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center p-2">
                                    <i className="fi fi-sr-home text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-purple-400 via-purple-600 to-purple-800 dark:from-purple-400 dark:via-purple-500 dark:to-purple-600"></i>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center">
                                    <i className="fi fi-rr-search text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-gray-500 via-gray-600 to-gray-900 dark:from-gray-200 dark:via-gray-400 dark:to-gray-500"></i>
                                </div>
                            </>
                        )
                    }
                </NavLink>
                <NavLink to='/notification' >
                    {({ isActive }) => isActive ?

                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center">
                                    <Badge className='font-Poppins' content="10" shape="circle" color="secondary" showOutline={false}>
                                        <i className="fi fi-sr-home text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-purple-400 via-purple-600 to-purple-800 dark:from-purple-400 dark:via-purple-500 dark:to-purple-600"></i>
                                    </Badge>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="cursor-pointer flex flex-col justify-center items-center">
                                    <Badge className='font-Poppins' content='2' shape='circle' color='secondary' size='sm' showOutline={false}>
                                        <i className="fi fi-rr-bell text-[18px] mt-1 bg-gradient-to-br text-transparent bg-clip-text from-gray-500 via-gray-600 to-gray-900 dark:from-gray-200 dark:via-gray-400 dark:to-gray-500"></i>
                                    </Badge>
                                </div>
                            </>
                        )
                    }
                </NavLink>
            </nav>
        </>
    );
};