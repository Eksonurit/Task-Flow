import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "../types";

const getTasks = createAsyncThunk("tasks/get", async () => {
  const response = await axios.get(`http://localhost:3000/tasks`);

  return response.data;
});

const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Omit<Task, "id">) => {
    const response = await axios.post(`http://localhost:3000/tasks`, task);

    return response.data;
  },
);

const updateTask = createAsyncThunk("/tasks/update", async (task: Task) => {
  const { id, ...taskData } = task;
  console.log(id);
  const response = await axios.put(
    `http://localhost:3000/tasks/${id}`,
    taskData,
  );

  return response.data;
});

const deleteTask = createAsyncThunk("/tasks/delete", async (id: string) => {
  const response = await axios.delete(`http://localhost:3000/tasks/${id}`);

  return response.data;
});

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: null | string;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,

  reducers: {
    clearData: (state) => {
      state.tasks = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;

      state.tasks = action.payload;
    });

    builder.addCase(getTasks.rejected, (state) => {
      state.isLoading = false;
      state.error = "Smth went wrong";
    });

    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(createTask.rejected, (state) => {
      state.isLoading = false;
      state.error = "Smth went wrong";
    });

    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.isLoading = false;
      state.error = "Smth went wrong";
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      console.log(state.tasks);
      state.isLoading = false;
      state.error = null;

      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);

      console.log(state.tasks);
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.isLoading = false;
      state.error = "Smth went wronging";
    });
  },
});

export const tasksActions = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export const { clearData } = tasksSlice.actions;
export default tasksSlice.reducer;
