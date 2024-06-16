// IMPORT - LIBRARYS //
import { 
  Badge, 
  Button,
  Navbar
} from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

// IMPORT - ICONS //
import {
  HomeIcon,
  CalendarIcon,
  AddIcon,
  HeartArrowIcon,
  BellIcon
} from './../icons/icons.tsx';
import {
  HomeFilledIcon,
  CalendarFilledIcon,
  HeartArrowFilledIcon,
  BellFilledIcon
} from './../icons/iconsFilled.tsx';

// CREATE - INTERFACE //
interface bottomProps {
    className?: string;
}

// COMPONENT - BOTTOM BAR //
export const Bottombar = ({className}: bottomProps) => {
  return (
    <>
      <Navbar
        isBordered
        isBlurred={true}
        className={`justify-around bottom-0 left-0 ${className}`}
        >
        <NavLink to='/' >
        {({ isActive }) => isActive ?
          (
            <Button
              variant="light"
              isIconOnly>
              <HomeFilledIcon className="text-primary size-6"/>
            </Button>
          )
          :
          (
            <Button
              variant="light"
              isIconOnly>
              <HomeIcon className="size-6" />
            </Button>
          )}
        </NavLink>
          
        <NavLink to='/events' >
        {({ isActive }) => isActive ?
          (
            <Button
              variant="light"
              isIconOnly>
              <CalendarFilledIcon className="text-primary size-6"/>
            </Button>
          )
          :
          (
            <Button
              variant="light"
              isIconOnly>
              <CalendarIcon className="size-6" />
            </Button>
          )}
        </NavLink>
        
        <NavLink to="/publish">
          <Button
            isIconOnly
            color="primary"
            radius="full">
            <AddIcon className="size-6" />
          </Button>
        </NavLink>
        
        <NavLink to='/match' >
        {({ isActive }) => isActive ?
          (
            <Button
              variant="light"
              isIconOnly>
              <HeartArrowFilledIcon className="text-primary size-6"/>
            </Button>
          )
          :
          (
            <Button
              variant="light"
              isIconOnly>
              <HeartArrowIcon className="size-6" />
            </Button>
          )}
        </NavLink>
        
        <NavLink to='/notifications' >
        {({ isActive }) => isActive ?
          (
            <Button
              variant="light"
              isIconOnly>
              <Badge
                content="5"
                placement="top-right"
                shape="rectangle"
                color="primary">
                <BellFilledIcon className="text-primary size-6"/>
              </Badge>
            </Button>
          )
          :
          (
            <Button
              variant="light"
              isIconOnly>
              <Badge
                content="5"
                placement="top-right"
                shape="circle"
                color="primary">
                <BellIcon className="size-6"/>
              </Badge>
            </Button>
          )}
        </NavLink>
      </Navbar>
    </>
  );
};