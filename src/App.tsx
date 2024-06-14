// IMPORT - LIBRARYS // 
import * as React from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import { 
  ThemeProvider as NextThemesProvider
} from "next-themes";

// IMPORT - COMPONENTS //
import { Loading } from './components/loading.tsx';

// IMPORT - STYLES //
import './styles/main.css'

// IMPORT - ROUTES //
const HomePage = React.lazy(() => import('./views/public/home.tsx'));
const UserBasePage = React.lazy(() => import('./views/public/userBasePage.tsx'));
const LoginPage = React.lazy(() => import('./views/auth/login.tsx'));
const RegisterPage = React.lazy(() => import('./views/auth/register.tsx'));
const Publish = React.lazy(() => import('./views/public/publish.tsx'));

// COMPONENT - APP //
const App = () => {
  return (
    <>
      <NextUIProvider className="">
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <React.Suspense fallback={<Loading />}>
            <Router>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/user' element={<UserBasePage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/auth/register' element={<RegisterPage />} />
                <Route path='/publish' element={<Publish />} />
              </Routes>
            </Router>
          </React.Suspense>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
};

// EXPORT - APP //
export default App