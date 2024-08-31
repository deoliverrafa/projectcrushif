import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Loading } from "./components/loading.component.tsx";

import "./styles/main.css";

const HomePage = React.lazy(() => import("./views/public/home.page.tsx"));
const SearchPage = React.lazy(() => import("./views/public/search.page.tsx"));
const EventsPage = React.lazy(() => import("./views/public/events.page.tsx"));
const MatchPage = React.lazy(() => import("./views/public/match.page.tsx"));
const SettingsPage = React.lazy(() => import("./views/user/settings.page.tsx"));
const SupportPage = React.lazy(() => import("./views/public/support.page.tsx"));
const NotificationsPage = React.lazy(
  () => import("./views/user/notifications.page.tsx")
);
const PublishPage = React.lazy(() => import("./views/user/publish.page.tsx"));
const ProfilePage = React.lazy(() => import("./views/user/profile.page.tsx"));
const EditProfilePage = React.lazy(
  () => import("./views/user/editProfile.page.tsx")
);

const LoginPage = React.lazy(() => import("./views/auth/login.page.tsx"));
const RegisterPage = React.lazy(() => import("./views/auth/register.page.tsx"));
const TermsPage = React.lazy(() => import("./views/auth/terms.page.tsx"));

const App = () => {
  return (
    <>
      <NextUIProvider className="">
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <React.Suspense fallback={<Loading />}>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/publish" element={<PublishPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />

                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/terms" element={<TermsPage />} />
              </Routes>
            </Router>
          </React.Suspense>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
};

export default App;