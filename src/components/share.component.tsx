import * as React from "react";

import { ToastSuccess } from "./toast.component";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";

import { Modal, ModalContent } from "@nextui-org/react";

import { X, Copy } from "lucide-react";

interface ShareProps {
  link: string;
  onClose: () => void;
}

export const ShareComponent = (props: ShareProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopied(true);
    }
  };

  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Modal
      className="w-fit"
      placement="center"
      backdrop="blur"
      isOpen={true}
      hideCloseButton
    >
      <ModalContent>
        {copied && (
          <ToastSuccess
            title={"Copiado"}
            description={"Link copiado com sucesso"}
          />
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <CardTitle>Compartilhar link</CardTitle>

              <Button variant={"ghost"} size={"icon"} onClick={props.onClose}>
                <X />
              </Button>
            </div>

            <CardDescription>
              Qualquer pessoa que tenha esse link poderá ver isso.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-row justify-between items-center space-x-2">
            <Input ref={inputRef} value={props.link} />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={handleCopy}
                  >
                    <Copy className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copiar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>

          <CardFooter>
            <Button
              className="font-poppins font-semibold uppercase "
              variant={"secondary"}
              onClick={props.onClose}
            >
              Fechar
            </Button>
          </CardFooter>
        </Card>
      </ModalContent>
    </Modal>
  );
};
