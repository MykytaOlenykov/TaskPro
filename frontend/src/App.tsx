import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { getCurrentUser } from "store/auth/operations";
import { selectRefreshing } from "store/auth/selectors";
import { useAppSelector, useAppDispatch } from "hooks";

import { RegisterForm } from "components/RegisterForm";
import { LoginForm } from "components/LoginForm";
import { PageFallback } from "ui/PageFallback";
import { RestrictedRoute } from "components/RestrictedRoute";

const WelcomePage = lazy(() => import("pages/WelcomePage"));
const AuthPage = lazy(() => import("pages/AuthPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));

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

        <Route path="/home" element={<p>/home</p>}>
          <Route index element={<p>index</p>} />
          <Route path=":boardId" element={<p>boardId</p>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
