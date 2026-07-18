import express from "express";
import * as tasksController from "../controllers/tasks.controller.js";

const taskRouter = express.Router();

taskRouter.get("/tasks", tasksController.getAll);
taskRouter.post("/tasks", tasksController.create);
taskRouter.put("/tasks/:id", tasksController.update);
taskRouter.delete("/tasks/:id", tasksController.remove);

export { taskRouter };
