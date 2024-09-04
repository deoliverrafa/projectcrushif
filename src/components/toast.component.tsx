import * as React from "react";

import * as Toast from "@radix-ui/react-toast";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

import { Avatar } from "@nextui-org/react";

import { X } from "lucide-react";

interface ToastProps {
  avatar?: string;
  title: string;
  description: string;
}

export const ToastInfo = (props: ToastProps) => {
  const [value, setValue] = React.useState(100);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevValue - 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Toast.Provider>
      <Toast.Root className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow flex flex-col w-full md:max-w-sm">
        <div className="flex flex-col p-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-2">
              <div className="flex relative">
                <div className="flex absolute right-0 bottom-0 h-2 w-2 z-10">
                  <span className="animate-ping bg-success rounded-full opacity-75 inline-flex absolute h-full w-full"></span>
                  <span className="bg-success rounded-full inline-flex relative h-2 w-2"></span>
                </div>
                <Avatar size="sm" src={props.avatar} />
              </div>
              <Toast.Title className="font-inter font-semibold leading-none tracking-tight">
                {props.title}
              </Toast.Title>
            </div>

            <Toast.Action className="" asChild altText="Undo action">
              <Button variant={"outline"} size={"icon"}>
                <X />
              </Button>
            </Toast.Action>
          </div>
          <Toast.Description className="text-sm text-slate-500 dark:text-slate-400">
            {props.description}
          </Toast.Description>
        </div>

        <Progress value={value} />
      </Toast.Root>

      <Toast.Viewport className="fixed top-0 right-0 p-4 flex flex-col space-y-2 w-full md:max-w-xs z-50 outline-none" />
    </Toast.Provider>
  );
};
