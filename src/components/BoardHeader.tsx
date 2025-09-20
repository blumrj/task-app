import { Divider, Fab } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleTheme } from "../store/theme/themeSlice";
import { openDialog } from "../store/dialog/dialogSlice";

const BoardHeader = () => {

  const themeToggle = useSelector(
    (store: RootState) => store.themeSlice.isThemeToggled
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between items-end">
        <Fab color="primary" aria-label="add" onClick={() => dispatch(openDialog({type: "add-form"}))}>
          <AddIcon />
        </Fab>
        <ThemeToggle
          checked={themeToggle}
          onClick={() => dispatch(toggleTheme())}
        />
      </div>
      <Divider className="pt-8" />
    </>
  );
};

export default BoardHeader;
