export type Task = {
  id: string;
  title: string;
  description: string;
  status: "new-task" | "in-process" | "completed";
};
