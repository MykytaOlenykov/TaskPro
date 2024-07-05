import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { getCurrentUser } from "store/auth/operations";
import { useAppDispatch } from "hooks/useAppDispatch";

import { RegisterForm } from "components/RegisterForm";
import { LoginForm } from "components/LoginForm";
import { PageFallback } from "ui/PageFallback";

const WelcomePage = lazy(() => import("pages/WelcomePage"));
const AuthPage = lazy(() => import("pages/AuthPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />}>
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
