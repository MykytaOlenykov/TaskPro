import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { getCurrentUser } from "store/auth/operations";
import { selectRefreshing } from "store/auth/selectors";
import { useAppSelector, useAppDispatch } from "hooks";

import { RegisterForm } from "components/RegisterForm";
import { LoginForm } from "components/LoginForm";
import { RestrictedRoute } from "components/RestrictedRoute";
import { PrivateRoute } from "components/PrivateRoute";
import { PageFallback } from "ui/PageFallback";
import { NotFound } from "ui/NotFound";

const WelcomePage = lazy(() => import("pages/WelcomePage"));
const AuthPage = lazy(() => import("pages/AuthPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const IndexSubPage = lazy(() => import("pages/IndexSubPage"));
const ScreensPage = lazy(() => import("pages/ScreensPage"));

const NotFoundFallback = () => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 500,
          flexGrow: 1,
          transform: "translateY(-60px)",
        }}
      >
        <NotFound />
      </div>
    </div>
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
          <Route path="*" element={<NotFoundFallback />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
