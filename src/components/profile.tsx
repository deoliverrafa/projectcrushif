// IMPORT - COMPONENTS //
import {
  Avatar,
  Button,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
  ChevronDown,
  BellRing,
  PencilRuler,
  Share2,
  Zap,
  LogOut,
  BadgeCheck
} from 'lucide-react';

interface profile {
  name: string,
  email: string,
  avatar: string,
}

// COMPONENT - PROFILE WITH DROPDOWN //
export const Profile = ({ name, email, avatar }: profile) => {
  // FUNCTION - HANDLE //
  function logOutHandle() {
    localStorage.setItem('token', "null");
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          radius="full"
          size="sm"
          variant="flat"
          startContent={
            <Avatar
              className="h-6 w-6"
              src={avatar}
            />
          }
          endContent={<ChevronDown />}
        >
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          href="/profile"
          showDivider={true}
        >
          <div className="flex flex-row items-center space-x-2">
            <div className="flex relative">
              <div class="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                <span class="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span class="bg-success rounded-full inline-flex relative h-2 w-2"></span>
              </div>
              <Avatar
                size="sm"
                name={name}
                src={avatar}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-1">
                <p className="font-inter font-semibold">
                  {name}
                </p>
                <BadgeCheck className="text-success size-3" />
              </div>
              <p className="text-default text-tiny font-inter tracking-tight">{email}</p>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem
          href="/profile/edit"
          startContent={<PencilRuler className="size-4" />}
        >
          <p className="font-inter font-medium">Editar</p>
        </DropdownItem>
        <DropdownItem
          className="font-inter"
          startContent={<Share2 className="size-4" />}
        >
          <p className="font-inter font-medium">Compartilhar</p>
        </DropdownItem>
        <DropdownItem
          className="font-inter"
          showDivider={true}
          startContent={<Zap className="size-4" />}
        >
          <p className="font-inter font-medium">Upgrade</p>
        </DropdownItem>
        <DropdownItem
          className="text-danger font-inter"
          href="/auth/login"
          onClick={logOutHandle}
          startContent={<LogOut className="size-4" />}
        >
          <p className="font-inter font-medium">Deslogar</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};