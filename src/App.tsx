import * as React from "react";

import { HexaThemeProvider } from "./components/ui/theme.tsx";
import { HexaRouter, HexaRoutes, HexaRoute } from "./components/ui/router.tsx";

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
const ProfilePage = React.lazy(() => import("./views/public/profile.tsx"));
const EditProfilePage = React.lazy(
  () => import("./views/public/edit-profile.tsx")
);

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
          <HexaRouter>
            <HexaRoutes>
              <HexaRoute path="/" element={<HomePage />} />
              <HexaRoute path="/search" element={<SearchPage />} />
              <HexaRoute path="/events" element={<EventsPage />} />
              <HexaRoute path="/match" element={<MatchPage />} />
              <HexaRoute path="/settings" element={<SettingsPage />} />
              <HexaRoute path="/support" element={<SupportPage />} />
              <HexaRoute
                path="/notifications"
                element={<NotificationsPage />}
              />
              <HexaRoute path="/publish" element={<PublishPage />} />
              <HexaRoute path="/profile/:id" element={<ProfilePage />} />
              <HexaRoute path="/profile/edit" element={<EditProfilePage />} />

              <HexaRoute path="/auth/login" element={<LoginPage />} />
              <HexaRoute path="/auth/register" element={<RegisterPage />} />
              <HexaRoute path="/auth/terms" element={<TermsPage />} />
            </HexaRoutes>
          </HexaRouter>
        </React.Suspense>
      </HexaThemeProvider>
    </>
  );
};

export default App;
