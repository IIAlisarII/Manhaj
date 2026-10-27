export const skills = [
  { id: 1, title: "GitHub basics", hoursPerWeek: 2, tag: "Tools", type: "Video course" },
  { id: 2, title: "Intro to Python", hoursPerWeek: 3, tag: "Programming", type: "Video course" },
  { id: 3, title: "Figma crash course", hoursPerWeek: 2, tag: "Design", type: "Video course" },
  { id: 4, title: "Linux command line", hoursPerWeek: 2, tag: "Cloud", type: "Video course" },
  { id: 5, title: "Cloud fundamentals", hoursPerWeek: 3, tag: "Cloud", type: "Video course" },
  { id: 6, title: "Intro to React", hoursPerWeek: 3, tag: "Web", type: "Video course" },
];
 
 
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
//   interests - topics the student cares about (NEW)
//   roadmap   - the uni plan, one entry per semester (NEW):
//                 done    - has the student finished it?
//                 courses - what the uni plan covers (SAMPLE names, replace with real ones)
//                 gaps    - topics the uni plan does NOT cover; each one is a skill `tag`
//   tasks     - deadline cards
//   blocks    - things placed in the week grid (day: 0 = Sunday ... 6 = Saturday)
export const mockStudents = [
  {
    id: "alisar",
    name: "Alisar",
    freeHours: 8,
    interests: ["Cloud", "Tools", "Programming"],
    roadmap: [
      { id: 1, label: "Semester 1", done: true, courses: ["Intro to Programming", "Calculus 1", "Physics 1"], gaps: [] },
      { id: 2, label: "Semester 2", done: false, courses: ["Data Structures", "Calculus 2", "Discrete Math"], gaps: ["Tools"] },
      { id: 3, label: "Semester 3", done: false, courses: ["Algorithms", "Computer Organization", "Databases"], gaps: ["Tools", "Cloud"] },
      { id: 4, label: "Semester 4", done: false, courses: ["Operating Systems", "Networks", "Software Engineering"], gaps: ["Cloud", "Web"] },
    ],
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
    interests: ["Design", "Web"],
    roadmap: [
      { id: 1, label: "Semester 1", done: true, courses: ["Intro to IS", "Statistics", "Accounting"], gaps: [] },
      { id: 2, label: "Semester 2", done: true, courses: ["Databases", "Systems Analysis", "Marketing"], gaps: ["Design"] },
      { id: 3, label: "Semester 3", done: false, courses: ["Web Systems", "Project Management", "Networks"], gaps: ["Design", "Web"] },
      { id: 4, label: "Semester 4", done: false, courses: ["Enterprise Systems", "IS Security", "Capstone"], gaps: ["Web", "Cloud"] },
    ],
    tasks: [
      { id: 1, title: "Database project", note: "Submit ER diagram", due: "2026-10-28", done: false },
    ],
    blocks: [
      { id: 101, skillId: 3, title: "Figma crash course", day: 1, hours: 1 },
      { id: 102, skillId: 3, title: "Figma crash course", day: 3, hours: 1 },
    ],
  },
  {
    id: "khalid",
    name: "Khalid",
    freeHours: 3,
    interests: ["Programming", "Web", "Cloud"],
    roadmap: [
      { id: 1, label: "Semester 1", done: true, courses: ["Circuits 1", "Calculus 1", "Intro to Programming"], gaps: [] },
      { id: 2, label: "Semester 2", done: false, courses: ["Digital Logic", "Physics 2", "Calculus 2"], gaps: ["Programming"] },
      { id: 3, label: "Semester 3", done: false, courses: ["Microprocessors", "Signals", "Data Structures"], gaps: ["Programming", "Tools"] },
      { id: 4, label: "Semester 4", done: false, courses: ["Embedded Systems", "Networks", "Control"], gaps: ["Cloud", "Web"] },
    ],
    tasks: [
      { id: 1, title: "Circuits lab report", note: "", due: "2026-10-26", done: false },
      { id: 2, title: "Physics midterm", note: "Bring calculator", due: "2026-11-02", done: false },
    ],
    blocks: [{ id: 201, skillId: 2, title: "Intro to Python", day: 2, hours: 1 }],
  },
];
