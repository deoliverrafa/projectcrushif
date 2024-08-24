// IMPORT - LIBRARYS //
import { Button } from './../../components/ui/button.jsx';

// IMPORT - COMPONENTS //
import { NavBar } from './../../components/navbar.tsx';
import { BottomBar } from './../../components/bottombar.tsx';
import {
  Navbar,
  NavbarContent,
  Input,
  
  Avatar,
  Card
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
  Search,
  BadgeCheck,
  UserRoundPlus
} from 'lucide-react';

const SearchPage = () => {
  
  return (
    <>
      <Navbar
        position="static"
        shouldHideOnScroll
        isBordered={true}
      >
        <Input
          isClearable
          radius="lg"
          size="sm"
          type="search"
          label="Pesquisar"
          placeholder="ex: @nickname, #hashtag..."
          className="font-inter font-medium w-5/6"
          name="search" 
        />
        <Button 
        >
          <Search />
        </Button>
      </Navbar>
      
      <main className="flex flex-col items-center h-screen w-full">
        {/* CARD AO SER RENDERIZADO QUANDO PESQUISAR UM USUARIO */}
        <Card 
          className="flex flex-row justify-around items-center my-2 py-3 px-1.5 w-11/12 max-w-[768px]"
          radius="lg"
        >
          <Button>teste</Button>
          <div className="flex space-x-2">
            <div className="flex relative">
              <div className="flex absolute  right-0 bottom-0 h-2 w-2 z-10">
                <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
              </div>
              <Avatar
                as="button"
                className="font-poppins uppercase"
                size="sm"
                name={'Anônimo'}
                src={''}
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <div className="flex flex-row items-center space-x-1">
                <h4 className="font-inter text-xs font-bold leading-none">
                  {"Anônimo"}
                </h4>
                <BadgeCheck className="text-success size-3" />
              </div>
            
              <h5 className="font-inter text-tiny tracking-tight text-default">@Anônimo</h5>
            </div>
          </div>
          <Button
          >
            Seguir
          </Button>
        </Card>
        
        {/* CARD AO SER RENDERIZADO QUANDO PESQUISAR UMA HASTAG */}
        <Card
          className="flex flex-row justify-center items-center my-2 py-3 px-1.5 space-x-1 w-11/12 max-w-[768px]"
          radius="lg"
        >
          <p className="text-primary font-inter tracking-tight text-xs">Marcação:</p>
          <p className="font-inter text-primary text-xs tracking-tight break-words">
            #hastag
          </p>
        </Card>
      </main>
      
      <BottomBar />
    </>
  );
};

export default SearchPage;