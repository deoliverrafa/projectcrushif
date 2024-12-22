import * as React from "react";

import { NavBarReturn } from "../../components/navbar";

import { Card, CardContent } from "../../components/ui/card.tsx"

const NotificationLayout = () => {
  const NavbarMenu = () => {
    return (
    <React.Fragment>
    </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <NavBarReturn title={"Notificações"} menu={<NavbarMenu />} />
      
      <Card className="select-none mt-1 w-full md:w-6/12">
        <CardContent>
          
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

const NotificationsPage = () => {
  return (
    <React.Fragment>
      <NotificationLayout />
    </React.Fragment>
  );
};

export default NotificationsPage;
