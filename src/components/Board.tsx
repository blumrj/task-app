import { Box, Container } from "@mui/material";
import type { Task } from "../types/task";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import BoardHeader from "./BoardHeader";
import BoardBody from "./BoardBody";
import DndProvider from "./DndProvider";

const Board = () => {
  const tasks: Task[] = useSelector(
    (store: RootState) => store.tasksSlice.tasks
  );

  return (
    <Box sx={{ bgcolor: "background.default" }} className="min-h-screen">
      <Container className="pt-8">
        <DndProvider>
          <BoardHeader />
          <BoardBody tasks={tasks} />
        </DndProvider>
      </Container>
    </Box>
  );
};

export default Board;
