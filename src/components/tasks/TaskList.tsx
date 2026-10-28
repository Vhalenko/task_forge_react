import type { Task } from "../../types/task";
import TaskRow from "./TaskRow";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  );
}
