// IMPORT - LIBRARYS //
import * as React from 'react';
import { 
  Spinner,
  Card,
  Modal,
  ModalContent
} from '@nextui-org/react';

// COMPONENT - LOADING //
export const Loading = () => {
  return (
    <Modal isOpen={true} placement="center" backdrop="blur">
      <ModalContent>
        <Card className="py-10" shadow="lg" radius="lg">
          <Spinner color="primary" label="Carregando..." />
        </Card>
      </ModalContent>
    </Modal>
  );
};