import * as tasksService from "../services/tasks.service.js";

export const getAll = async (req, res) => {
  const allTasks = await tasksService.getTasks();
  console.log(allTasks);

  res.status(200).send(allTasks);
};

export const create = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    res.status(400).send("Bad request");
    return;
  }

  const newTask = {
    title,
    description,
    status,
  };

  const createdTask = await tasksService.createTask(newTask);

  res.status(201).json(createdTask);
};

export const update = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const { title, description, status } = req.body;

  const taskToUpdate = await tasksService.getTaskById(id);

  if (!taskToUpdate) {
    res.status(404).send("Not found");
    return;
  }

  const updatedTask = await tasksService.updateTask(
    title,
    description,
    status,
    id,
  );

  res.status(200).json(updatedTask);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const taskToDelete = await tasksService.getTaskById(id);

  if (!taskToDelete) {
    res.status(404).send("Not found");
    return;
  }

  const deletedTask = await tasksService.deleteTask(id);
  res.status(200).json(deletedTask);
};
