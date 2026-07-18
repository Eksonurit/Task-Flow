import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/task.model.js";

export const getTasks = async () => {
  return await Task.find({});
};
export const getTaskById = async (id) => {
  return await Task.findById(id);
};

export const createTask = async ({ title, description, status }) => {
  const newTask = {
    title,
    description,
    status,
  };
  console.log(newTask);

  const createdTask = await Task.create(newTask);

  return newTask;
};

export const updateTask = async (title, description, status, id) => {
  const taskToUpdate = await getTaskById(id);
  console.log(`Айді таски в мастиві: ${id}`);

  Object.assign(taskToUpdate, { title, description, status });

  await taskToUpdate.save();

  return taskToUpdate;
};

export const deleteTask = async (id) => {
  const taskToDelete = await Task.findByIdAndDelete(id);

  return taskToDelete;
};
