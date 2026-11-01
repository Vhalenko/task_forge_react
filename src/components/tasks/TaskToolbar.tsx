import Select from "../ui/Select";
import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from "../../utils/taskMeta";
import { SORT_LABELS, type SortOption, type TaskFilters } from "../../utils/taskFilters";

interface TaskToolbarProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

export default function TaskToolbar({ filters, onChange }: TaskToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        aria-label="Search tasks"
        placeholder="Search tasks"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-hidden transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 sm:flex-1"
      />

      <div className="grid grid-cols-2 gap-3 sm:flex">
        <Select
          label="Filter by status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as TaskFilters["status"] })}
        >
          <option value="ALL">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </Select>

        <Select
          label="Filter by priority"
          value={filters.priority}
          onChange={(e) =>
            onChange({ ...filters, priority: e.target.value as TaskFilters["priority"] })
          }
        >
          <option value="ALL">All priorities</option>
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </Select>

        <Select
          label="Sort tasks"
          className="col-span-2 sm:col-span-1"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOption })}
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <option key={option} value={option}>
              Sort: {SORT_LABELS[option]}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
