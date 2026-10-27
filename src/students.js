
// students.js  -  helpers about WHO the student is

import { mockStudents } from "./Data";

// Find a student by id.
// If the id is missing or wrong, use the FIRST student instead of crashing,
// and print a warning in the browser console (F12) so you can find the cause.
export function getStudent(id) {
  const found = mockStudents.find((s) => s.id === id);
  if (!found) {
    console.warn(
      'No student with id "' + id + '". Showing ' + mockStudents[0].name +
      " instead. Check that App.jsx passes studentId to this page."
    );
    return mockStudents[0];
  }
  return found;
}

// Identity details and achievements for each mock student, matched by id.
// SAMPLE data for the demo: edit it to anything you like.
export const profiles = {
  alisar: {
    university: "Qatar University",
    major: "Computer Science",
    year: 2,
    goal: "Software internship",
    achievements: [
      { id: 1, title: "Eureka student planner (hackathon)", type: "Competition", year: 2026 },
      { id: 2, title: "Orientation week volunteer", type: "Volunteering", year: 2025 },
    ],
  },
  maryam: {
    university: "Qatar University",
    major: "Information Systems",
    year: 3,
    goal: "Web developer",
    achievements: [{ id: 1, title: "Figma design sprint", type: "Course", year: 2026 }],
  },
  khalid: {
    university: "Qatar University",
    major: "Computer Engineering",
    year: 2,
    goal: "Cloud engineer",
    achievements: [],
  },
};

// Choices in the "Career goal" dropdown.
export const goalOptions = [
  "Software internship",
  "Cloud engineer",
  "Web developer",
  "Data / AI",
  "Research",
  "Not sure yet",
];

// Choices in the "Type" dropdown of the achievements form.
export const achievementTypes = ["Competition", "Volunteering", "Course", "Project", "Other"];
