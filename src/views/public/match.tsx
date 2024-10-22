import * as React from "react";

import ErrorPage from "../error/error";

import { NavBar } from "../../components/navbar";
import { BottomBar } from "../../components/bottombar";

import { getUserData } from "../../utils/getUserData";

const MatchPage = () => {
  const userData = getUserData();

  return (
    <React.Fragment>
      <NavBar
        user={userData}
        avatarPath={userData?.avatar ? userData.avatar : ""}
      />

      <ErrorPage />

      <BottomBar />
    </React.Fragment>
  );
};

export default MatchPage;
