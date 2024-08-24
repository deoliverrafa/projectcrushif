import { Card } from "./ui/card";
import { Modal, ModalContent } from "@nextui-org/react";

export const Loading = () => {
  return (
    <Modal
      className="w-fit"
      placement="center"
      backdrop="blur"
      isOpen={true}
      hideCloseButton
    >
      <ModalContent>
        <Card className="flex flex-row justify-center items-center p-4 space-x-2 space-y-2">
          <div className="animate-spin rounded-full border-4 border-pink-600 border-t-gray-900 h-8 w-8" />
          <p className="font-poppins font-semibold uppercase text-tiny">
            Carregando...
          </p>
        </Card>
      </ModalContent>
    </Modal>
  );
};
