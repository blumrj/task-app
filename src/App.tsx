import { ThemeProvider } from "@emotion/react";
import Board from "./components/Board";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { darkTheme, lightTheme } from "./theme";
import TaskDialog from "./components/TaskDialog";
function App() {
  const themeToggle = useSelector(
    (store: RootState) => store.themeSlice.isThemeToggled
  );

  return (
    <>
      <ThemeProvider theme={themeToggle ? darkTheme : lightTheme}>
        <Board />
        <TaskDialog />
      </ThemeProvider>
    </>
  );
}

export default App;
