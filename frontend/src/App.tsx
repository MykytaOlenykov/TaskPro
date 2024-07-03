import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { PageFallback } from "ui/PageFallback";

const WelcomePage = lazy(() => import("pages/WelcomePage"));
const AuthPage = lazy(() => import("pages/AuthPage"));

export function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />

        <Route path="/home" element={<p>/home</p>}>
          <Route index element={<p>index</p>} />
          <Route path=":boardId" element={<p>boardId</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
}
