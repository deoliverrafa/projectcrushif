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
const EventsPage = React.lazy(() => import('./views/public/events.tsx'));
const MatchPage = React.lazy(() => import('./views/public/match.tsx'));
const NotificationsPage = React.lazy(() => import('./views/public/notifications.tsx'));
const PublishPage = React.lazy(() => import('./views/public/publish.tsx'));
const ProfilePage = React.lazy(() => import('./views/public/profile.tsx'));
const EditProfilePage = React.lazy(() => import('./views/public/editProfile.tsx'));

// AUTH - ROUTES //
const LoginPage = React.lazy(() => import('./views/auth/login.tsx'));
const RegisterPage = React.lazy(() => import('./views/auth/register.tsx'));

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
                <Route path='/events' element={<EventsPage />} />
                <Route path='/match' element={<MatchPage />} />
                <Route path='/notifications' element={<NotificationsPage />} />
                <Route path='/publish' element={<PublishPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/profile/edit' element={<EditProfilePage />} />
                
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/auth/register' element={<RegisterPage />} />
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