import { BottomBar } from "../../layout/bottombar.layout.tsx";
import { NavBar } from "../../layout/navbar.layout.tsx";
import { SearchLayout } from "../../layout/search.layout.tsx";

import { getUserData } from "../../utils/getUserData.tsx";

const SearchPage = () => {
  const userData = getUserData();
  return (
    <>
      <NavBar user={userData} avatarPath={userData.avatar} />

      <main className="select-none flex flex-col items-center h-svh w-full">
        <SearchLayout />
      </main>

      <BottomBar />
    </>
  );
};

export default SearchPage;
