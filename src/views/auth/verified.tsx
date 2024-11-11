import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import { CheckCircleOneSolid } from "@mynaui/icons-react";
import LoginArt from "../../../public/images/login_art.png";

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <img src={LoginArt} className="h-52 md:h-[300px] w-52 md:w-[300px]" />
    </div>
  );
};

interface VerifiedLayoutProps {
  countdown: number;
}

const VerifiedLayout: React.FC<VerifiedLayoutProps> = ({ countdown }) => {
  return (
    <React.Fragment>
      <Card className="max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <CheckCircleOneSolid className="text-primary h-20 w-20" />
          <CardTitle className="text-primary">E-mail verificado</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>
            <span className="text-primary">E-mail verificado com sucesso!</span>{" "}
            🎉 Agora você tem{" "}
            <span className="text-primary">acesso completo</span> a todos os
            recursos. Aproveite e comece a{" "}
            <span className="text-primary">explorar</span> tudo o que temos a
            oferecer!
          </CardDescription>
        </CardContent>

        <CardFooter className="flex-col items-center gap-1">
          <Badge variant={"outline"} className="text-primary text-5xl">
            {countdown}
          </Badge>
          <CardDescription className="text-primary">Redirecionando</CardDescription>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

const VerifiedPage = () => {
  const [countdown, setCountdown] = React.useState(5);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <React.Fragment>
      <React.Fragment>
        <main className="select-none flex flex-col items-center md:flex-row md:justify-around md:items-center h-svh w-full">
          <LogoLayout />
          <VerifiedLayout countdown={countdown} />
        </main>
      </React.Fragment>
    </React.Fragment>
  );
};

export default VerifiedPage;
