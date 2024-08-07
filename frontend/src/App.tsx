import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { getCurrentUser } from "store/auth/operations";
import { selectLoggedIn, selectRefreshing } from "store/auth/selectors";
import { useAppSelector, useAppDispatch } from "hooks";

import { RegisterForm } from "components/RegisterForm";
import { LoginForm } from "components/LoginForm";
import { RestrictedRoute } from "components/RestrictedRoute";
import { PrivateRoute } from "components/PrivateRoute";
import { PageFallback } from "ui/PageFallback";
import { NotFoundSubPage } from "ui/NotFoundSubPage";

const WelcomePage = lazy(() => import("pages/WelcomePage"));
const AuthPage = lazy(() => import("pages/AuthPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const IndexSubPage = lazy(() => import("pages/IndexSubPage"));
const ScreensPage = lazy(() => import("pages/ScreensPage"));

const RootRedirect = () => {
  const loggedIn = useAppSelector(selectLoggedIn);
  const refreshing = useAppSelector(selectRefreshing);

  return !refreshing && !loggedIn ? (
    <Navigate to="/welcome" />
  ) : (
    <Navigate to="/home" />
  );
};

export function App() {
  const dispatch = useAppDispatch();
  const refreshing = useAppSelector(selectRefreshing);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return refreshing ? (
    <PageFallback />
  ) : (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/welcome"
          element={
            <RestrictedRoute>
              <WelcomePage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <RestrictedRoute>
              <AuthPage />
            </RestrictedRoute>
          }
        >
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        >
          <Route index element={<IndexSubPage />} />
          <Route path=":boardId" element={<ScreensPage />} />
          <Route path="*" element={<NotFoundSubPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
