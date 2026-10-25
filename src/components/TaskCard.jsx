// Turn "2026-10-29" into "29 Oct".
function formatDue(due) {
  const date = new Date(due + "T00:00:00");
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Turn the due date into words: "today", "tomorrow", "3 days left", "overdue".
function daysLeftText(due) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(due + "T00:00:00");
  const diff = Math.round((dueDate - today) / 86400000); // 86,400,000 ms = 1 day

  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  if (diff === 1) return "tomorrow";
  return diff + " days left";
}

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={task.done ? "task done" : "task"}>
      <h2 className="task-title">{task.title}</h2>

      {task.note && <p className="task-text">{task.note}</p>}

      {task.due && (
        <p className="task-text">
          <span className="tag">
            {formatDue(task.due)}
            {!task.done && " · " + daysLeftText(task.due)}
          </span>
        </p>
      )}

      <div className="task-actions">
        <button onClick={onToggle}>{task.done ? "Undo" : "Done"}</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
