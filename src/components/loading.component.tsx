import { Card } from "./ui/card";
import { Modal, ModalContent, Spinner } from "@nextui-org/react";

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
          <Spinner color="primary" size="lg" />
          <p className="font-poppins font-semibold uppercase text-tiny">
            Carregando...
          </p>
        </Card>
      </ModalContent>
    </Modal>
  );
};
