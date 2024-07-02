import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const WelcomePage = lazy(() => import("pages/WelcomePage"));

export function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/auth/:id" element={<p>/auth/:id</p>} />

      <Route path="/home" element={<p>/home</p>}>
        <Route index element={<p>index</p>} />
        <Route path=":boardId" element={<p>boardId</p>} />
      </Route>
    </Routes>
  );
}
