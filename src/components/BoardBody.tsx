import { Grid } from "@mui/material";
import BoardColumn from "./BoardColumn";
import type { Task } from "../types/task";

type BoardBodyProps = {
    tasks: Task[]
}

const BoardBody = ({tasks}:BoardBodyProps) => {
  return (
    <Grid container spacing={4} className="mt-8">
      <Grid size={{ xs: 12, md: 4 }}>
        <BoardColumn label="to do" items={tasks} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <BoardColumn label="in progress" items={tasks} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <BoardColumn label="done" items={tasks} />
      </Grid>
    </Grid>
  );
};

export default BoardBody;
