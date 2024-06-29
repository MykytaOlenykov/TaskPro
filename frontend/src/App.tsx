import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<p>/welcome</p>} />
      <Route path="/auth/:id" element={<p>/auth/:id</p>} />

      <Route path="/home" element={<p>/home</p>}>
        <Route index element={<p>index</p>} />
        <Route path=":boardId" element={<p>boardId</p>} />
      </Route>
    </Routes>
  );
}

export default App;
