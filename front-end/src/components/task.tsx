import type React from "react";
import type { Task } from "../types";
import { useEffect, useRef, useState } from "react";
import { DropDownIcon } from "./icons/dropdown";
import cn from "classnames";
import { useAppDispatch } from "../hooks/hooks";
import { tasksActions } from "../features/tasks";

const statusColorMap = {
  "new-task": "red",
  "in-process": "yellow",
  completed: "green",
};

export const TaskComponent: React.FC<Task> = ({
  title,
  description,
  status,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const taskUpdateForm = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();

  const [titleToUpdate, setTitleToUpdate] = useState<string>(title);
  const [descriptionToUpdate, setDescriptionToUpdate] =
    useState<string>(description);

  const handleUpdateFormSubmit = (
    titleToUpdate: string,
    descriptionToUpdate: string,
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const taskToUpdate = {
      id,
      title: titleToUpdate,
      description: descriptionToUpdate,
      status,
    };
    dispatch(tasksActions.updateTask(taskToUpdate));

    setIsSelected(false);
  };

  const handleSetSelected = (
    e: React.MouseEvent | PointerEvent | MouseEvent,
  ) => {
    e.preventDefault();
    setIsSelected((prev) => !prev);
  };
  const handleChangeExpended = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const statusColor = statusColorMap[status];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (taskUpdateForm.current) {
        const isClickableTargetInForm = taskUpdateForm.current.contains(
          e.target as Node,
        );

        if (!isClickableTargetInForm) {
          handleSetSelected(e);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return isSelected ? (
    <form
      className="task-form selected-task"
      ref={taskUpdateForm}
      onSubmit={(e) =>
        handleUpdateFormSubmit(titleToUpdate, descriptionToUpdate, e)
      }
    >
      <input
        name="title"
        className="title-input input"
        type="text"
        value={titleToUpdate}
        onChange={(e) => setTitleToUpdate(e.target.value)}
      />
      <textarea
        className="description-input input description"
        name="description"
        value={descriptionToUpdate}
        onChange={(e) => setDescriptionToUpdate(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  ) : (
    <div
      className={cn("task", {
        task__expanded: isExpanded,
      })}
      style={{ "--taskindicatorcolor": statusColor } as React.CSSProperties}
      onClick={handleChangeExpended}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, id)}
      onDoubleClick={(e) => handleSetSelected(e)}
    >
      <h4 className="task__title">{title}</h4>
      <div className="task__indicator"></div>
      <DropDownIcon size={24} color={"white"} isRotate={isExpanded} />

      <p>{description}</p>
    </div>
  );
};
