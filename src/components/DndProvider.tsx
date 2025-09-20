import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/task/tasksSlice";

type DndProviderProps = {
  children: ReactNode;
};

const DndProvider = ({ children }: DndProviderProps) => {
  const dispatch = useDispatch();

  //takes an event parameter from dnd kit
  function handleDragEnd(event: DragEndEvent) {
    //active - the item being dragged
    //over - the drop target
    const { active, over } = event;

    //checks that both active and over objects exists, that they have existing ids and that those ids are not the same (to avoid unnecessary updates)
    if (active && over && active.id && over.id && active.id !== over.id) {
      dispatch(moveTask({ movedItemId: active.id, movedToId: over.id }));
    }
  }

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};

export default DndProvider;
