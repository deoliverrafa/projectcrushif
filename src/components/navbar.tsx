import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Link } from "@nextui-org/react";
import logo from "../../public/images/CrushIf_Logo-removebg-preview.png";
import { ThemeSwitcher } from "./themeSwitcher";

interface User {
    _id: string;
    nickname: string;
    email: string;
    campus: string;
    className?: string;
}

interface userData {
    user: User | null;
    className?: string;
    avatarPath?: string;
}

export function NavBar(props: userData) {
    function logOutHandle() {
        localStorage.setItem('userId', "null");
    }

    return (
        <>
            <Navbar className={`bg-gray-100 dark:bg-zinc-800 shadow-sm border-b-1 border-b-zinc-300 dark:border-b-zinc-600 ${props.className}`}>
                <NavbarBrand>
                    <ThemeSwitcher className="flex justify-center items-center" />
                </NavbarBrand>
                <NavbarContent justify="center">
                    <Link href="/">
                        <img src={logo} alt="" className="w-10" />
                    </Link>
                </NavbarContent>
                <NavbarContent as="div" justify="end">
                    <Dropdown className="bg-gray-300 dark:bg-zinc-800" placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform cursor-pointer"
                                color="secondary"
                                name={props.user?.nickname}
                                size="sm"
                                src={props.avatarPath}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{props.user?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="user" className="font-Poppins" href="/user">Configurações</DropdownItem>
                            <DropdownItem key="share" className="font-Poppins" color="secondary">Compartilhar</DropdownItem>
                            <DropdownItem key="logout" className="text-red-500 font-Poppins" color="danger" href="/auth/login" onClick={logOutHandle}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </>
    );
}