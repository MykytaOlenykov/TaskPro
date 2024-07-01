import { Route, Routes } from "react-router-dom";
import { Button, ButtonGroup, styled } from "@mui/material";
import { useThemeContext } from "./theme";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "50px",
  height: "50px",
}));

export function App() {
  const { switchTheme } = useThemeContext();

  return (
    <>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={() => switchTheme("light")}>Light</Button>
        <Button onClick={() => switchTheme("dark")}>Dark</Button>
        <Button onClick={() => switchTheme("violet")}>Violet</Button>
      </ButtonGroup>

      <Div></Div>

      <Routes>
        <Route path="/welcome" element={<p>/welcome</p>} />
        <Route path="/auth/:id" element={<p>/auth/:id</p>} />

        <Route path="/home" element={<p>/home</p>}>
          <Route index element={<p>index</p>} />
          <Route path=":boardId" element={<p>boardId</p>} />
        </Route>
      </Routes>
    </>
  );
}
