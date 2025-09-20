import { Divider, Paper, Stack } from "@mui/material";
import type { ColumnType } from "../types/column";
import type { Task } from "../types/task";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { useTheme } from "@mui/material/styles";

type ColumnProps = {
  label: ColumnType;
  items: Task[];
};

const BoardColumn = ({
  label: columnType,
  items,
}: ColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: columnType,
  });

  const theme = useTheme()
  const style = {
    color: isOver ? theme.palette.primary.main: undefined,
  };

  const columnItems = items.filter((item) => item.status === columnType);

  return (
    <>
      <Paper
        sx={{ bgcolor: "background.paper" }}
        ref={setNodeRef}
        style={style}
      >
        <Stack spacing={2} className="min-h-[70vh] p-6">
          <h3 className="capitalize font-light ">
            {columnType} {columnItems.length}/{items.length}
          </h3>
          <Divider />
          {columnItems
            .map((item, index) => {
              return <TaskCard key={index} item={item} />;
            })}
        </Stack>
      </Paper>
    </>
  );
};

export default BoardColumn;
