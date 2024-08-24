import * as React from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Loading } from './components/loading.component.tsx';

import './styles/main.css'
  
const HomePage = React.lazy(() => import('./views/public/home.tsx'));
const SearchPage = React.lazy(() => import('./views/public/search.tsx'));
const EventsPage = React.lazy(() => import('./views/public/events.tsx'));
const MatchPage = React.lazy(() => import('./views/public/match.tsx'));
const SettingsPage = React.lazy(() => import('./views/public/settings.tsx'));
const SupportPage = React.lazy(() => import('./views/public/support.tsx'));
const NotificationsPage = React.lazy(() => import('./views/public/notifications.tsx'));
const PublishPage = React.lazy(() => import('./views/public/publish.tsx'));
const ProfilePage = React.lazy(() => import('./views/public/profile.tsx'));
const EditProfilePage = React.lazy(() => import('./views/public/editProfile.tsx'));

const LoginPage = React.lazy(() => import('./views/auth/login.page.tsx'));
const RegisterPage = React.lazy(() => import('./views/auth/register.page.tsx'));

const App = () => {
  return (
    <>
      <NextUIProvider className="">
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <React.Suspense fallback={<Loading />}>
            <Router>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/events' element={<EventsPage />} />
                <Route path='/match' element={<MatchPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/support' element={<SupportPage />} />
                <Route path='/notifications' element={<NotificationsPage />} />
                <Route path='/publish' element={<PublishPage />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
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