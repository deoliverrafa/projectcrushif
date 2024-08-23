import * as React from 'react';

import {
  Card,
} from './ui/card';
import { 
  CircularProgress,
  Modal,
  ModalContent
} from '@nextui-org/react';

export const Loading = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 100);

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
          className="flex flex-row items-center p-2 space-x-2"
        >
          <CircularProgress 
            color="primary" 
            value={value}
            showValueLabel={false}
          />
          <p className="font-inter font-medium">Carregando...</p>
        </Card>
      </ModalContent>
    </Modal>
  );
};