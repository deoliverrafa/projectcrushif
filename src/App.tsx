import * as React from "react";

import { HexaThemeProvider } from "./components/ui/theme.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";

import LoadingPage from "./views/public/loading.tsx";

const HomePage = React.lazy(() => import("./views/public/home.tsx"));
const SearchPage = React.lazy(() => import("./views/public/search.tsx"));
const EventsPage = React.lazy(() => import("./views/public/events.tsx"));
const MatchPage = React.lazy(() => import("./views/public/match.tsx"));
const SettingsPage = React.lazy(() => import("./views/public/settings.tsx"));
const SupportPage = React.lazy(() => import("./views/public/support.tsx"));
const NotificationsPage = React.lazy(
  () => import("./views/public/notifications.page.tsx")
);
const PublishPage = React.lazy(() => import("./views/public/publish.tsx"));
const EditProfilePage = React.lazy(
  () => import("./views/public/edit-profile.tsx")
);

const ProfilePage = React.lazy(() => import("./views/public/profile.tsx"));

const LoginPage = React.lazy(() => import("./views/auth/login.tsx"));
const RegisterPage = React.lazy(() => import("./views/auth/register.tsx"));
const TermsPage = React.lazy(() => import("./views/auth/terms.tsx"));

const App = () => {
  React.useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    return () => {
      document.removeEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  return (
    <>
      <HexaThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <React.Suspense fallback={<LoadingPage />}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/match" element={<MatchPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route
                path="/notifications"
                element={<NotificationsPage />}
              />
              <Route path="/publish" element={<PublishPage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />

              <Route path="/profile/:id" element={<ProfilePage />} />

              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/terms" element={<TermsPage />} />
            </Routes>
          </Router>
        </React.Suspense>
      </HexaThemeProvider>
    </>
  );
};

export default App;
