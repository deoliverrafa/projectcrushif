import * as React from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogClose
} from "./ui/dialog.tsx";
import {
  Button
} from "./ui/button.tsx"

import {
  CheckCircleSolid
} from "@mynaui/icons-react";

interface DialogSuccessProps {
  title: string;
  content: string;
  children: React.ReactNode;
}

export const DialogSuccess: React.FC < DialogSuccessProps > = ({
  title, content, children
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-0.5">
          <CheckCircleSolid className="swirl-in-left-fwd text-success h-40 w-40" />

          <DialogDescription>
            {content}
          </DialogDescription>
        </div>


        <DialogFooter className="w-full">
          <DialogClose>
            <Button className="w-full" variant={"success"}>Confirmar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};