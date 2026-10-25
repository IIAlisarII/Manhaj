import { useState } from "react";
import TaskCard from "../components/TaskCard";
import useLocalStorage from "../useLocalStorage";
import { days, mockStudents } from "../Data";

function MyWeek({ studentId }) {
  // ----- which student, and where their data is saved -----
  const student = mockStudents.find((s) => s.id === studentId);
  const prefix = "eureka-" + studentId + "-"; // e.g. "eureka-alisar-"

  // ----- the data that gets saved -----
  const [tasks, setTasks] = useLocalStorage(prefix + "tasks", student.tasks);
  const [freeHours, setFreeHours] = useLocalStorage(prefix + "freeHours", student.freeHours);
  const [blocks, setBlocks] = useLocalStorage(prefix + "blocks", student.blocks);

  // ----- form state (temporary, not saved) -----
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [due, setDue] = useState("");

  const [blockTitle, setBlockTitle] = useState("");
  const [blockDay, setBlockDay] = useState(0);
  const [blockHours, setBlockHours] = useState(1);

  // ----- values worked out from the data -----
  const plannedHours = blocks.reduce((sum, b) => sum + b.hours, 0);
  const hoursLeft = freeHours - plannedHours;
  const todayIndex = new Date().getDay(); // 0 = Sunday ... 6 = Saturday

  const sortedTasks = [...tasks].sort((a, b) =>
    (a.due || "9999").localeCompare(b.due || "9999")
  );

  // ----- task cards -----
  function handleAddTask(event) {
    event.preventDefault();
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      note: note.trim(),
      due: due,
      done: false,
    };
    setTasks([...tasks, newTask]);

    setTitle("");
    setNote("");
    setDue("");
    setShowForm(false);
  }

  function toggleDone(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // ----- free hours -----
  function changeFreeHours(event) {
    const value = Number(event.target.value);
    setFreeHours(value < 0 ? 0 : value);
  }

  // ----- week grid -----
  function handleAddBlock(event) {
    event.preventDefault();
    if (blockTitle.trim() === "") return;

    const newBlock = {
      id: Date.now(),
      title: blockTitle.trim(),
      day: blockDay,
      hours: blockHours,
    };
    setBlocks([...blocks, newBlock]);
    setBlockTitle("");
  }

  function removeBlock(id) {
    setBlocks(blocks.filter((b) => b.id !== id));
  }

  return (
    <div className="my-week page">
      <h2 className="page-title">My week</h2>

      {/* ---------- deadlines / assignments ---------- */}
      <div className="section-head">
        <h2>Deadlines / Assignments</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add"}
        </button>
      </div>

      {showForm && (
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Title (e.g. Calculus HW)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          <button type="submit" className="add-btn">
            Save card
          </button>
        </form>
      )}

      <div className="task-row">
        {sortedTasks.length === 0 && <p className="empty">No deadlines yet. Press + Add.</p>}
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => toggleDone(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>

      <hr className="divider" />

      {/* ---------- free hours ---------- */}
      <div className="section-head">
        <h2>Schedule + Free hrs</h2>
        <label className="free-hours">
          Free hrs / week:
          <input
            type="number"
            min="0"
            max="56"
            value={freeHours}
            onChange={changeFreeHours}
          />
        </label>
      </div>

      <p className={hoursLeft < 0 ? "hours-summary warn" : "hours-summary"}>
        {plannedHours} of {freeHours} hrs planned ·{" "}
        {hoursLeft >= 0
          ? hoursLeft + " hrs left"
          : "over by " + -hoursLeft + " hrs, remove something"}
      </p>

      {/* ---------- add a block to the week ---------- */}
      <form className="task-form" onSubmit={handleAddBlock}>
        <input
          type="text"
          placeholder="What will you work on? (e.g. GitHub course)"
          value={blockTitle}
          onChange={(e) => setBlockTitle(e.target.value)}
        />
        <select value={blockDay} onChange={(e) => setBlockDay(Number(e.target.value))}>
          {days.map((d, i) => (
            <option key={d} value={i}>
              {d}
            </option>
          ))}
        </select>
        <select value={blockHours} onChange={(e) => setBlockHours(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((h) => (
            <option key={h} value={h}>
              {h} hr
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">
          Add to week
        </button>
      </form>

      {/* ---------- the 7-day grid ---------- */}
      <div className="week-grid">
        {days.map((dayName, dayIndex) => {
          const dayBlocks = blocks.filter((b) => b.day === dayIndex);
          const dayTotal = dayBlocks.reduce((sum, b) => sum + b.hours, 0);

          return (
            <div
              key={dayName}
              className={dayIndex === todayIndex ? "day-col today" : "day-col"}
            >
              <h3>{dayName.slice(0, 3)}</h3>
              <p className="day-hours">{dayTotal} hr</p>

              {dayBlocks.length === 0 && <p className="empty">Free</p>}

              {dayBlocks.map((b) => (
                <div className="block" key={b.id}>
                  <span className="block-title">{b.title}</span>
                  <span className="block-meta">{b.hours} hr</span>
                  <button onClick={() => removeBlock(b.id)} aria-label={"Remove " + b.title}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyWeek;
