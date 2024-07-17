// IMPORT - LIBRARYS //
import * as React from 'react';

// IMPORT - COMPONENTS //
import { 
  CircularProgress,
  Card,
  Modal,
  ModalContent
} from '@nextui-org/react';

// COMPONENT - LOADING //
export const Loading = () => {
  // FUNCTION - LIBRARYS//
  const [value, setValue] = React.useState(0);
  
  // FUNCTION - USE EFFECT //
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <Modal 
      className="w-fit"
      placement="center" 
      backdrop="blur"
      isOpen={true} 
    >
      <ModalContent>
        <Card 
          className="p-4 w-fit" 
          radius="lg"
        >
          <CircularProgress 
            color="primary" 
            label="Carregando..."
            value={value}
            showValueLabel={true}
          />
        </Card>
      </ModalContent>
    </Modal>
  );
};