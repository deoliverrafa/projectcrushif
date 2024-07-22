// IMPORT - LIBRARYS //
import { NavLink } from 'react-router-dom';

// IMPORT - COMPONENTS //
import { 
  Navbar,
  Button
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
  Home,
  Search,
  HeartHandshake,
  CalendarDays
} from 'lucide-react';

// CREATE - INTERFACE //
interface bottomProps {
    className?: string;
}

// COMPONENT - BOTTOM BAR //
export const BottomBar = (props: bottomProps) => {
  // FUNCTION - LIBRARYS //
  
  // FUNCTION - USE STATES //

  // FUNCTION - HANDLES //
  
  return (
    <Navbar
      isBordered={false}
      isBlurred={true}
      className={`border-t-1 border-default-100 flex md:hidden justify-around bottom-0 left-0 ${props.className}`}
    >
      {/* MENU - NAV LINKS */}
      <NavLink to="/">
        {({ isActive }) => isActive ? (
          <Button 
            color="primary"
            variant="flat"
            radius="full"
            startContent={<Home />}
          >
            <p className="font-poppins font-semibold">Inicio</p>
          </Button>
        ) : (
          <Button
            color="primary"
            variant="flat"
            radius="lg"
            isIconOnly={true}
          >
            <Home />
          </Button>
        )}
      </NavLink>
      <NavLink to="/search">
        {({ isActive }) => isActive ? (
          <Button 
            color="primary"
            variant="flat"
            radius="full"
            startContent={<Search />}
          >
            <p className="font-poppins font-semibold">Pesquisar</p>
          </Button>
        ) : (
          <Button
            color="primary"
            variant="flat"
            radius="lg"
            isIconOnly={true}
          >
            <Search />
          </Button>
        )}
      </NavLink>
      <NavLink to="/match">
        {({ isActive }) => isActive ? (
          <Button 
            color="primary"
            variant="flat"
            radius="full"
            startContent={<HeartHandshake />}
          >
            <p className="font-poppins font-semibold">Crush</p>
          </Button>
        ) : (
          <Button
            color="primary"
            variant="flat"
            radius="lg"
            isIconOnly={true}
          >
            <HeartHandshake />
          </Button>
        )}
      </NavLink>
      <NavLink to="/events">
        {({ isActive }) => isActive ? (
          <Button 
            color="primary"
            variant="flat"
            radius="full"
            startContent={<CalendarDays />}
          >
            <p className="font-poppins font-semibold">Evêntos</p>
          </Button>
        ) : (
          <Button
            color="primary"
            variant="flat"
            radius="lg"
            isIconOnly={true}
          >
            <CalendarDays />
          </Button>
        )}
      </NavLink>
    </Navbar>
  );
};