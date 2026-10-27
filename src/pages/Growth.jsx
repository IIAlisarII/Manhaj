import { useState } from "react";
import SkillCard from "../components/SkillCard";
import ProgressRing from "../components/ProgressRing";
import useLocalStorage from "../Uselocalstorage";
import { skills, mockStudents } from "../Data";
import { sumHours, makeSessions, getFit } from "../planning";

function Growth({ studentId }) {
  // ----- which student, and where their data is saved -----
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student) {
    return (
        <div className="growth page">
        <p className="error-message">Student not found for ID: {studentId}</p>
        </div>
    );
    }
  const prefix = "eureka-" + studentId + "-"; // same prefix as My Week

  // ----- saved data -----
  const [roadmap, setRoadmap] = useLocalStorage(prefix + "roadmap", student.roadmap);
  const [liked, setLiked] = useLocalStorage(prefix + "liked", []);
  // These two use the SAME keys as My Week, so both pages see the same data.
  const [blocks, setBlocks] = useLocalStorage(prefix + "blocks", student.blocks);
  const [freeHours] = useLocalStorage(prefix + "freeHours", student.freeHours);

  // ----- temporary state (not saved) -----
  const [openSemId, setOpenSemId] = useState(null); // which semester is expanded
  const [tagFilter, setTagFilter] = useState("All"); // which topic is selected

  // ----- values worked out from the data -----
  const hoursLeft = freeHours - sumHours(blocks);
  const doneCount = roadmap.filter((s) => s.done).length;
  const allTags = [...new Set(skills.map((s) => s.tag))]; // each topic once
  const shownSkills =
    tagFilter === "All" ? skills : skills.filter((s) => s.tag === tagFilter);

  // ----- roadmap -----
  function toggleSemesterDone(id) {
    setRoadmap(roadmap.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  }

  function toggleOpen(id) {
    setOpenSemId(openSemId === id ? null : id);
  }

  // ----- skills -----
  function toggleLike(skillId) {
    setLiked(
      liked.includes(skillId)
        ? liked.filter((id) => id !== skillId)
        : [...liked, skillId]
    );
  }

  function addToWeek(skill) {
    setBlocks([...blocks, ...makeSessions(skill, blocks)]);
  }

  function removeFromWeek(skillId) {
    setBlocks(blocks.filter((b) => b.skillId !== skillId));
  }

  return (
    <div className="growth page">
      <h2 className="page-title">Growth</h2>

      {/* ---------- Roadmap ---------- */}
      <div className="section-head">
        <h2>Roadmap</h2>
        <p className="hint">Keep Learning!</p>
      </div>

      <div className="roadmap">
        <div className="roadmap-list">
          {roadmap.map((sem, index) => {
            const open = openSemId === sem.id;
            return (
              <div className="sem" key={sem.id}>
                <div className="sem-row">
                  <button
                    className={sem.done ? "sem-check done" : "sem-check"}
                    onClick={() => toggleSemesterDone(sem.id)}
                    aria-label={"Mark " + sem.label + (sem.done ? " as not done" : " as done")}
                  >
                    {sem.done ? "✓" : index + 1}
                  </button>
                  <span className="sem-label">{sem.label}</span>
                  <button
                    className={open ? "sem-arrow open" : "sem-arrow"}
                    onClick={() => toggleOpen(sem.id)}
                    aria-label={"Show details of " + sem.label}
                  >
                    →
                  </button>
                </div>

                {open && (
                  <div className="sem-details">
                    <p className="sem-sub">Courses</p>
                    <ul className="plain-list">
                      {sem.courses.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>

                    <p className="sem-sub">Gaps (click one to see skills)</p>
                    {sem.gaps.length === 0 && <p className="empty">No gaps here.</p>}
                    <div className="chips">
                      {sem.gaps.map((gap) => (
                        <button
                          className="chip"
                          key={gap}
                          onClick={() => setTagFilter(gap)}
                        >
                          {gap}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <ProgressRing done={doneCount} total={roadmap.length} />
      </div>

      <hr className="divider" />

      {/* ---------- Skills ---------- */}
      <div className="section-head">
        <h2>Skills</h2>
        <p className={hoursLeft < 0 ? "hours-summary warn" : "hours-summary"}>
          {hoursLeft >= 0
            ? hoursLeft + " of " + freeHours + " free hrs left this week"
            : "over by " + -hoursLeft + " hrs this week"}
        </p>
      </div>

      <div className="chips filter-row">
        <button
          className={tagFilter === "All" ? "chip active" : "chip"}
          onClick={() => setTagFilter("All")}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={tagFilter === tag ? "chip active" : "chip"}
            onClick={() => setTagFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="skill-grid">
        {shownSkills.map((skill) => {
          const inWeek = blocks.some((b) => b.skillId === skill.id);
          const fit = getFit(skill, student.interests, hoursLeft, inWeek);
          return (
            <SkillCard
              key={skill.id}
              skill={skill}
              fit={fit}
              liked={liked.includes(skill.id)}
              inWeek={inWeek}
              onLike={() => toggleLike(skill.id)}
              onAdd={() => addToWeek(skill)}
              onRemove={() => removeFromWeek(skill.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Growth;
