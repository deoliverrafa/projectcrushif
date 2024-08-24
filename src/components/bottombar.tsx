import { NavLink } from 'react-router-dom';

import {
  Button
} from './../components/ui/button';
import { 
  Navbar,
} from '@nextui-org/react';

import {
  Home,
  Search,
  HeartHandshake,
  CalendarDays
} from 'lucide-react';

interface bottomProps {
    className?: string;
}

export const BottomBar = (props: bottomProps) => {
  return (
    <Navbar
      isBordered={false}
      isBlurred={false}
      className={`border-t-1 border-default-100 flex md:hidden justify-around bottom-0 left-0 ${props.className}`}
    >
      <NavLink to="/">
        {({ isActive }) => isActive ? (
          <Button>
            <Home className="mr-2 size-4"/>
            <p className="font-poppins font-semibold">Inicio</p>
          </Button>
        ) : (
          <Button 
            size="icon"
          >
            <Home className="size-4" />
          </Button>
        )}
      </NavLink>
      <NavLink to="/search">
        {({ isActive }) => isActive ? (
          <Button>
            <Search className="fill-pink-500 mr-2 size-4"/>
            <p className="font-poppins font-semibold">Procurar</p>
          </Button>
        ) : (
          <Button
            size="icon"
          >
            <Search className="size-4" />
          </Button>
        )}
      </NavLink>
      <NavLink to="/match">
        {({ isActive }) => isActive ? (
          <Button>
            <HeartHandshake className="mr-2 size-4"/>
            <p className="font-poppins font-semibold">Crush</p>
          </Button>
        ) : (
          <Button
            size="icon"
          >
            <HeartHandshake className="size-4" />
          </Button>
        )}
      </NavLink>
      <NavLink to="/events">
        {({ isActive }) => isActive ? (
          <Button>
            <CalendarDays className="mr-2 size-4"/>
            <p className="font-poppins font-semibold">Evêntos</p>
          </Button>
        ) : (
          <Button
            size="icon"
          >
            <CalendarDays className="size-4" />
          </Button>
        )}
      </NavLink>
    </Navbar>
  );
};