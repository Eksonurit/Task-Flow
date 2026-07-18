import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { tasksActions } from "../features/tasks";
import type { Task } from "../types";
import { TaskComponent } from "./task";

interface Props {
  tableTitle: string;
  tableStatus: "new-task" | "in-process" | "completed";
}

const statusColors = {
  "new-task": "red",
  "in-process": "yellow",
  completed: "green",
};

export const TaskStatusTable: React.FC<Props> = ({
  tableStatus,
  tableTitle,
}) => {
  const currentColor = statusColors[tableStatus];

  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);

  const filteredTasks = useAppSelector((state) =>
    state.tasks.tasks.filter((task) => task.status === tableStatus),
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("text/plain");

    console.log(taskId);

    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
      return;
    }

    const taskToUpdateCopy = structuredClone(taskToUpdate);

    taskToUpdateCopy.status = tableStatus;

    dispatch(tasksActions.updateTask(taskToUpdateCopy));
  };

  const gettingTasks = async () => {
    await dispatch(tasksActions.getTasks());
  };

  useEffect(() => {
    gettingTasks();
  }, [dispatch]);
  return (
    <div
      className="table-status"
      style={{ "--status-color": currentColor } as React.CSSProperties}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleOnDrop(e)}
    >
      <div
        className="indicator"
        style={{ "--status-color": currentColor } as React.CSSProperties}
      ></div>
      <h3>{tableTitle}</h3>
      <ul className="tasks__list">
        {filteredTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskComponent
                title={task.title}
                description={task.description}
                status={task.status}
                id={task.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
