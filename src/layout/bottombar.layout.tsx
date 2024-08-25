import { NavLink } from "react-router-dom";

import { Navbar } from "@nextui-org/react";

import { LayoutGrid, Search, HeartHandshake, CalendarDays } from "lucide-react";

interface bottomProps {
  className?: string;
}

export const BottomBar = (props: bottomProps) => {
  return (
    <Navbar
      isBordered={false}
      isBlurred={false}
      className={`border-t-1 border-default-100 flex md:hidden justify-between bottom-0 left-0 ${props.className}`}
    >
      <NavLink to="/">
        {({ isActive }) =>
          isActive ? (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <LayoutGrid className="text-pink-500 dark:text-pink-600 size-6" />
              <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                Inicio
              </p>
            </div>
          ) : (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <LayoutGrid className="text-slate-700 dark:text-slate-400 size-6" />
              <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                Inicio
              </p>
            </div>
          )
        }
      </NavLink>
      <NavLink to="/search">
        {({ isActive }) =>
          isActive ? (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <Search className="text-pink-500 dark:text-pink-600 size-6" />
              <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                Procurar
              </p>
            </div>
          ) : (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <Search className="text-slate-700 dark:text-slate-400 size-6" />
              <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                Procurar
              </p>
            </div>
          )
        }
      </NavLink>
      <NavLink to="/match">
        {({ isActive }) =>
          isActive ? (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <HeartHandshake className="text-pink-500 dark:text-pink-600 size-6" />
              <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                Crush
              </p>
            </div>
          ) : (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <HeartHandshake className="text-slate-700 dark:text-slate-400 size-6" />
              <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                Crush
              </p>
            </div>
          )
        }
      </NavLink>
      <NavLink to="/events">
        {({ isActive }) =>
          isActive ? (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <CalendarDays className="text-pink-500 dark:text-pink-600 size-6" />
              <p className="text-pink-500 dark:text-pink-600 font-poppins font-semibold text-sm">
                Evêntos
              </p>
            </div>
          ) : (
            <div className="cursor-pointer flex flex-col justify-center items-center space-y-1">
              <CalendarDays className="text-slate-700 dark:text-slate-400 size-6" />
              <p className="text-slate-700 dark:text-slate-400 font-poppins font-semibold text-sm">
                Evêntos
              </p>
            </div>
          )
        }
      </NavLink>
    </Navbar>
  );
};
