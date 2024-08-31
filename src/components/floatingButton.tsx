import { Link } from 'react-router-dom';

import {
  Button
} from '@nextui-org/react';

import {
  Plus
} from 'lucide-react';

export const PublishButton = () => {
  return (
    <Link to="publish">
      <Button
        className="fixed bottom-20 right-10 z-10"
        color="primary"
        variant="solid"
        size="lg"
        radius="lg"
        isIconOnly={true}
      >
        <Plus />
      </Button>
    </Link>
  );
};