import * as React from "react";

interface HexaLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const HexaLink: React.FC<HexaLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`font-poppins ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

interface HexaNavLinkProps extends HexaLinkProps {
  activeClassName?: string;
  hoverClassName?: string;
}

export const HexaNavLink: React.FC<HexaNavLinkProps> = ({
  href,
  activeClassName = "active",
  hoverClassName = "hover",
  className = "",
  children,
  ...props
}) => {
  const { currentPath } = useRouter();
  const isActive = currentPath === href;

  return (
    <HexaLink
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
      onMouseEnter={(e) => {
        if (hoverClassName) {
          e.currentTarget.classList.add(hoverClassName);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverClassName) {
          e.currentTarget.classList.remove(hoverClassName);
        }
      }}
      {...props}
    >
      {children}
    </HexaLink>
  );
};

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = React.createContext<RouterContextType | undefined>(
  undefined
);

interface HexaRouterProps {
  children: React.ReactNode;
}

export const HexaRouter: React.FC<HexaRouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = React.useState<string>(
    window.location.pathname
  );

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a HexaRouter");
  }
  return context;
};

interface HexaRoutesProps {
  children: React.ReactNode;
}

export const HexaRoutes: React.FC<HexaRoutesProps> = ({ children }) => {
  return <>{children}</>;
};

interface HexaRouteProps {
  path: string;
  element: React.ReactNode;
}

export const HexaRoute: React.FC<HexaRouteProps> = ({ path, element }) => {
  const { currentPath } = useRouter();
  return currentPath === path ? <>{element}</> : null;
};

export const HexaReturn = () => {
  const navigate = (path: string | any) => {
    if (path === -1) {
      window.history.back();
    } else {
      window.location.href = path;
    }
  };

  return navigate;
};