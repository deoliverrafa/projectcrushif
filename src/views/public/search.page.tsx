// IMPORT - LIBRARYS //
import { useCallback, useState } from 'react';
import SearchUserCard from '../../components/searchUserCard.tsx';
import { Button } from '../../components/ui/button.js';
import { debounce } from 'lodash';

// IMPORT - COMPONENTS //
import { BottomBar } from '../../layout/bottombar.layout.tsx';
import {
  Navbar,
  Input,
  Card
} from '@nextui-org/react';

// IMPORT - ICONS //
import {
  Search
} from 'lucide-react';
import axios from 'axios';
import { getUserData } from '../../utils/getUserData.tsx';

// INTERFACES //
interface User {
  nickname: string,
  avatar: string,
  type: string,
  _id: string
  isFollowing: boolean
}

const SearchPage = () => {
  const userData = getUserData();

  const [formData, setFormData] = useState({
    nickname: "",
    token: localStorage.getItem('token')
  });

  const [queryResponse, setQueryResponse] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ nickname: value, token: localStorage.getItem('token') })
  }

  const fetchData = useCallback(() => {

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_SEARCH_PAGE_USER}
      `,
        formData
      ).then((response: any) => {
        setQueryResponse(response.data.usersFinded.map((user: any) => ({
          ...user,
          isFollowing: user.isFollowing || false, // Defina o valor padrão
        })));
      }).catch((error: any) => {
        console.log(error.message);
      })

  }, [formData]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debounceFetchData();
  }

  const debounceFetchData = useCallback(debounce(fetchData, 500), [formData]);

  console.log(userData.following);

  return (
    <>
      <Navbar
        position="static"
        shouldHideOnScroll
        isBordered={true}
      >
        <form action="searchUser" method="post" className='flex flex-row w-full justify-center items-center gap-10' onSubmit={handleFormSubmit}>
          <Input
            isClearable
            radius="lg"
            size="sm"
            type="search"
            label="Pesquisar"
            placeholder="ex: @nickname, #hashtag..."
            className="font-inter font-medium w-5/6"
            name="query"
            onChange={handleSearch}
          />
          <Button
          >
            <Search />
          </Button>
        </form>
      </Navbar>

      <main className="flex flex-col items-center h-screen w-full">


        {/* CARD AO SER RENDERIZADO QUANDO PESQUISAR UM USUARIO */}

        {/* COMPONENTE ENCAPSULADO PARA MELHOR MANIPULAÇÃO E LÓGICA/ */}

        {/* <Card 
          className="flex flex-row justify-around items-center my-2 py-3 px-1.5 w-11/12 max-w-[768px]"
          radius="lg"
        >
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
        </Card> */}


        {queryResponse ? (
          queryResponse.map((user: User) => {

            const isFollowing = userData.following.some((followingId) => {
              return followingId === user._id
            });

            return (<SearchUserCard avatar={user.avatar} nickname={user.nickname} type={user.type} _id={user._id} following={isFollowing} key={user._id} />)
          })
        ) : (
          null
        )}



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