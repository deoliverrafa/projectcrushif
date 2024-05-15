// IMPORT - LIBRARYS // 
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORt - ROUTES //
import HomePage from './views/public/home.tsx';



// IMPORT - STYLES //
import './styles/main.css'
import UserBasePage from "./views/public/userBasePage.tsx";
import LoginPage from "./views/auth/login.tsx";
import RegisterPage from "./views/auth/register.tsx";

// FUNCTION - APP //
function App() {
  
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/user' element={<UserBasePage />} />
              <Route path='/auth/login' element={<LoginPage />} />
              <Route path='/auth/register' element={<RegisterPage />} />
            </Routes>
          </Router>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}

// EXPORT - APP //
export default App