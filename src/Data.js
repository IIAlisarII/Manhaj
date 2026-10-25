export const skills = [
  { id: 1, title: "GitHub basics", hoursPerWeek: 2, fit: "good" },
  { id: 2, title: "Intro to Python", hoursPerWeek: 3, fit: "good" },
  { id: 3, title: "Figma crash course", hoursPerWeek: 2, fit: "bad" },
];
 
// ---- NEW: added below your existing skills ----
 
// Week starts on Sunday. days[0] = "Sunday" ... days[6] = "Saturday".
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
 
// Mock students for the demo.
//   tasks  - deadline cards
//   blocks - things placed in the week grid (day: 0 = Sunday ... 6 = Saturday)
export const mockStudents = [
  {
    id: "alisar",
    name: "Alisar",
    freeHours: 8,
    tasks: [
      { id: 1, title: "Calculus HW", note: "Ask Sara for paper, use pen", due: "2026-10-29", done: false },
      { id: 2, title: "Discrete math quiz", note: "Chapters 3 and 4", due: "2026-10-27", done: false },
    ],
    blocks: [],
  },
  {
    id: "maryam",
    name: "Maryam",
    freeHours: 6,
    tasks: [
      { id: 1, title: "Database project", note: "Submit ER diagram", due: "2026-10-28", done: false },
    ],
    blocks: [
      { id: 101, title: "Figma course", day: 1, hours: 2 },
      { id: 102, title: "Figma course", day: 3, hours: 2 },
    ],
  },
  {
    id: "khalid",
    name: "Khalid",
    freeHours: 3,
    tasks: [
      { id: 1, title: "Circuits lab report", note: "", due: "2026-10-26", done: false },
      { id: 2, title: "Physics midterm", note: "Bring calculator", due: "2026-11-02", done: false },
    ],
    blocks: [{ id: 201, title: "Python basics", day: 2, hours: 2 }],
  },
];