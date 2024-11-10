import * as React from "react";
import { Link } from "react-router-dom";

import { NavBarReturn } from "../../components/navbar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  ChevronRight,
  FatCornerUpRightSolid,
  PlusSolid,
  UserSolid,
} from "@mynaui/icons-react";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { MessageReceived } from "../../components/message";

const MessageLayout = () => {
  return (
    <React.Fragment>
      <Card className="select-none mt-2 w-full md:w-6/12">
        <CardContent>
          <CardHeader className="flex flex-row justify-between items-center">
            <Link
              to={"/profile/id"}
              className="flex flex-row items-center gap-2"
            >
              <div className="relative">
                <Avatar className="shadow-lg border-2 border-border">
                  <AvatarFallback>{"oliver"}</AvatarFallback>
                  <AvatarImage
                    className="object-cover"
                    src={
                      "http://res.cloudinary.com/dt6gk5vtg/image/upload/v1717360121/avatar/dlvyzeecstit3hcodt86.jpg"
                    }
                  />
                </Avatar>

                <span
                  className={`border border-border h-2.5 w-2.5 bottom-0 right-1 rounded-full text-xs bg-success absolute`}
                ></span>
              </div>

              <div className="flex flex-col">
                <CardTitle className="font-semibold md:font-medium text-md md:text-sm tracking-tight truncate max-w-[120px]">
                  Chat com oliver
                </CardTitle>
                <CardDescription className="text-xs md:text-xs truncate max-w-[120px]">
                  Rafael de Oliveria
                </CardDescription>
              </div>

              <ChevronRight />
            </Link>

            <div className="flex flex-row items-center gap-2">
              <Link to={"/profile/id"}>
                <Button size={"icon"} variant={"outline"}>
                  <UserSolid />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <ScrollArea className="h-96 w-full rounded-md">
            <MessageReceived
              _id={"1"}
              key={"1"}
              content={"Eae man, bom?"}
              insertAt={"2024-06-13T14:20:32.091Z"}
              type={"sent"}
              status={"read"}
            />

            <MessageReceived
              _id={"2"}
              key={"2"}
              content={"Manda a boa!?"}
              insertAt={"2024-06-13T14:20:32.091Z"}
              type={"received"}
              status={"sent"}
            />

            <MessageReceived
              _id={"3"}
              key={"3"}
              content={"Manda o zap da sua mãe!"}
              insertAt={"2024-06-13T14:20:32.091Z"}
              type={"sent"}
              status={"read"}
            />

            <MessageReceived
              _id={"4"}
              key={"4"}
              content={"tmnc"}
              insertAt={"2024-06-13T14:20:32.091Z"}
              type={"received"}
              status={"sent"}
            />

            <MessageReceived
              _id={"5"}
              key={"5"}
              content={"Uai man, responde mais n?"}
              insertAt={"2024-06-13T14:20:32.091Z"}
              type={"sent"}
              status={"received"}
            />

            <MessageReceived
              _id={"6"}
              key={"6"}
              content={"Fih da peste!"}
              insertAt={"2024-06-13T14:20:32.091Z"}
              type={"sent"}
              status={"sent"}
            />
          </ScrollArea>

          <CardFooter className="flex flex-row justify-between gap-1 w-full">
            <Input type="text" placeholder="Adicione um coméntario" />

            <Button className="rounded" variant={"outline"} size={"icon"}>
              <FatCornerUpRightSolid className="h-5 w-5" />
            </Button>

            <Button className="rounded" variant={"outline"} size={"icon"}>
              <PlusSolid />
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const MessagePage = () => {
  return (
    <React.Fragment>
      <NavBarReturn title={"Mensagem"} />

      <main className="flex flex-col justify-center items-center h-full w-full">
        <MessageLayout />
      </main>
    </React.Fragment>
  );
};

export default MessagePage;
