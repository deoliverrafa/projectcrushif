// IMPORT - LIBRARYS //
import { NavLink } from 'react-router-dom';

// IMPORT - COMPONENTS //
import { 
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
  Home,
  Search,
  HeartHandshake,
  CalendarDays,
  CircleUserRound,
  BellRing,
  Heart,
  Crown,
  Settings,
  BadgeHelp
} from 'lucide-react';

export const Drawer = () => {
  return (
    <NavbarMenu
      className="pb-32"
    >
      <NavLink to="/">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<Home />}
            >
              Inicio
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<Home />}
            >
              Inicio
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/search">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<Search />}
            >
              Pesquisar
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<Search />}
            >
              Pesquisar
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/match">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<HeartHandshake />}
              endContent={
                <div className="flex relative h-3 w-3">
                  <span className="animate-ping bg-primary rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-primary rounded-full inline-flex relative h-3 w-3"></span>
                </div>
              }
            >
              Crush
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<HeartHandshake />}
              endContent={
                <div className="flex relative h-3 w-3">
                  <span className="animate-ping bg-primary rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-primary rounded-full inline-flex relative h-3 w-3"></span>
                </div>
              }
            >
              Crush
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/events">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<CalendarDays />}
              endContent={
                <div className="flex relative h-3 w-3">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-3 w-3"></span>
                </div>
              }
            >
              Evêntos
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<CalendarDays />}
              endContent={
                <div className="flex relative h-3 w-3">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-3 w-3"></span>
                </div>
              }
            >
              Evêntos
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/profile">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<CircleUserRound />}
            >
              Perfil
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<CircleUserRound />}
            >
              Perfil
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/notifications">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<BellRing />}
              endContent={
                <div className="flex relative h-3 w-3">
                  <span className="animate-ping bg-info rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-info rounded-full inline-flex relative h-3 w-3"></span>
                </div>
              }
            >
              Notificações
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<BellRing />}
              endContent={
                <div className="flex relative h-3 w-3">
                  <span className="animate-ping bg-info rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-info rounded-full inline-flex relative h-3 w-3"></span>
                </div>
              }
            >
              Notificações
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/liked">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<Heart />}
            >
              Curtidas
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<Heart />}
            >
              Curtidas
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/saved">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<Crown />}
            >
              Salvas
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<Crown />}
            >
              Salvas
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/settings">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<Settings />}
            >
              Configurações
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<Settings />}
            >
              Configurações
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
      <NavLink to="/support">
        {({ isActive }) => isActive ? (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              color="primary"
              variant="flat"
              radius="full"
              size="lg"
              startContent={<BadgeHelp />}
            >
              Suporte
            </Button>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Button
              className="font-Poppins font-semibold uppercase tracking-widest"
              variant="light"
              radius="full"
              size="lg"
              startContent={<BadgeHelp />}
            >
              Suporte
            </Button>
          </NavbarMenuItem>
        )}
      </NavLink>
    </NavbarMenu>
  );
};