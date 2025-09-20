import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../types/task";
import { useDraggable } from "@dnd-kit/core";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useDispatch } from "react-redux";
import { openDialog } from "../store/dialog/dialogSlice";

const priorityColors: Record<string, string> = {
  low: "#81c784", // greenish
  medium: "#ffb74d", // orange
  high: "#e57373", // red
};

const TaskCard = ({ item }: { item: Task }) => {
  const { priority, status, dueDate, title } = item;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const dispatch = useDispatch();

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const isOverdue =
    dueDate &&
    status !== "done" &&
    new Date(dueDate).getTime() < new Date().getTime();

  return (
    <>
      <Card
        variant="outlined"
        ref={setNodeRef}
        style={style}
        className="rounded-2xl"
        sx={{
          borderLeft: `6px solid ${priorityColors[priority]}`,
          mb: 2,
        }}
      >
        <CardContent {...listeners} {...attributes} className="cursor-grab">
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {priority} | {status}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textDecoration: status === "done" ? "line-through" : "none",
            }}
          >
            {title}
          </Typography>
          {item.description && (
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          )}
          {dueDate && (
            <Typography
              variant="body2"
              sx={{ color: isOverdue ? "error.main" : "text.secondary" }}
            >
              Due: {new Date(dueDate).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
        <div className="flex justify-between items-center">
          {/* Drag handle */}
          <div {...listeners} {...attributes} className="cursor-grab px-2">
            <DragHandleIcon />
          </div>

          {/* Actions */}
          <CardActions>
            <Box>
              <IconButton
                onClick={() =>
                  dispatch(openDialog({ type: "edit-form", taskId: item.id }))
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  dispatch(openDialog({ type: "delete-form", taskId: item.id }))
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default TaskCard;
