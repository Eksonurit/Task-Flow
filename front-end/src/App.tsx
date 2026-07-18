import { useState } from "react";
import "./App.css";
import { TaskStatusTable } from "./components/taskStatusTable";
import { tasksActions } from "./features/tasks";
import { useAppDispatch } from "./hooks/hooks";
import type { Task } from "./types";
import { TrashIcon } from "./components/icons/trash";

function App() {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewTaskTitle(e.target.value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    setNewTaskDescription(e.target.value);
  };

  const dispatch = useAppDispatch();

  const handleCreateTask = (task: Omit<Task, "id">) => {
    dispatch(tasksActions.createTask(task));
  };

  const handleSubmitCreateTaskForm = (
    e: React.SubmitEvent<HTMLFormElement>,
    task: Omit<Task, "id">,
  ) => {
    e.preventDefault();
    handleCreateTask(task);

    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    <main className="main">
      <form
        action=""
        className="task-form"
        onSubmit={(e) =>
          newTaskTitle && newTaskDescription
            ? handleSubmitCreateTaskForm(e, {
                title: newTaskTitle,
                description: newTaskDescription,
                status: "new-task",
              })
            : null
        }
      >
        <h1>Create New Task</h1>
        <div className="input-container">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className="title-input input"
            type="text"
            name="title"
            placeholder="Task title"
            onChange={(e) => {
              handleChangeTitle(e);
            }}
            value={newTaskTitle}
            required={true}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="description-input input description"
            name="description"
            placeholder="Enter smth about the Task"
            onChange={(e) => {
              handleChangeDescription(e);
            }}
            value={newTaskDescription}
            required={true}
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>

      <div className="status-tables-container">
        <TaskStatusTable tableStatus="new-task" tableTitle="New Tasks:" />
        <TaskStatusTable
          tableStatus="in-process"
          tableTitle="In Process Tasks:"
        />
        <TaskStatusTable
          tableStatus="completed"
          tableTitle="Completed Tasks:"
        />
      </div>

      <TrashIcon size={100} color="white" />
    </main>
  );
}

export default App;
