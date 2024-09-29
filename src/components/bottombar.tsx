import { Bottombar, BottombarItem } from "./ui/bottombar";

import { LayoutGrid, Search, HeartHandshake, CalendarDays } from "lucide-react";

export const BottomBar = () => {
  return (
    <Bottombar className="flex md:hidden">
      <BottombarItem href="/" activeClassName="text-primary">
        <LayoutGrid />
        Inicio
      </BottombarItem>

      <BottombarItem href="/search" activeClassName="text-primary">
        <Search />
        Pesquisar
      </BottombarItem>

      <BottombarItem href="/match" activeClassName="text-primary">
        <HeartHandshake />
        Crush
      </BottombarItem>

      <BottombarItem href="/events" activeClassName="text-primary">
        <CalendarDays />
        Evêntos
      </BottombarItem>
    </Bottombar>
  );
};
