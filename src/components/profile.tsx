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
            <Badge
              content=""
              color="success"
              shape="circle"
              size="sm"
              placement="bottom-right"
            >
              <Avatar
                size="sm"
                name={name}
                src={avatar}
              />
            </Badge>
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
          className="font-inter"
          href="/notifications"
          startContent={<BellRing className="size-4" />}
          endContent={
            <Badge
              children
              content={2}
              className="font-inter"
              color="primary"
              variant="faded"
              showOutline={false}
            />
          }
        >
          Notificações
        </DropdownItem>
        <DropdownItem
          className="font-inter"
          href="/profile/edit"
          startContent={<PencilRuler className="size-4" />}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          className="font-inter"
          startContent={<Share2 className="size-4" />}
        >
          Compartilhar
        </DropdownItem>
        <DropdownItem
          className="font-inter"
          showDivider={true}
          startContent={<Zap className="size-4" />}
        >
          Upgrade
        </DropdownItem>
        <DropdownItem
          className="font-inter"
          href="/auth/login"
          onClick={logOutHandle}
          startContent={<LogOut className="size-4" />}
        >
          Deslogar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};