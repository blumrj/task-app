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

  return (
    <>
      <Card
        variant="outlined"
        ref={setNodeRef}
        style={style}
        className="rounded-2xl"
      >
        <CardContent {...listeners} {...attributes} className="cursor-grab">
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {priority} | {status} |{" "}
            {dueDate && new Date(dueDate).toLocaleDateString()}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
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
