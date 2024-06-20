// IMPORT - LIBRARYS //
import { 
  Card,
  Button
} from '@nextui-org/react';

// CREATE - INTERFACES //
interface cookiesToastProps {
  onClick: string
}

// COMPONENT - TOAST COOKIES //
export const ToastCookies = (props: cookiesToastProps) => {
  return (
    <Card
      radius="lg"
      shadow="lg"
      fullWidth={true}
      className='fixed bottom-0 left-0 p-2 z-50'>
      <div className="flex flex-row items-center justify-around">
        <div className="mx-2">
          <span className="font-Poppins font-bold my-1">Uso de Cookies</span>
          <div className="font-Poppins text-default text-xs tracking-tight my-1">Utilizamos cookies para que você tenha a melhor experiência em nosso site. Para saber mais acesse nossa página de Política de Privacidade.</div>
        </div>
        <Button
          radius="full"
          color="primary"
          variant="flat"
          className="font-Poppins font-bold uppercase"
          onClick={onClick}>Aceitar</Button>
      </div>
    </Card>
  );
};