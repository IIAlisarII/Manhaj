// =====================================================================
// planning.js  -  the "rules" of Eureka, as plain JavaScript functions.
//
// None of these functions use React. They take values in and give values
// back ("pure functions"), so they are easy to read and easy to test.
// =====================================================================

// Total hours of a list of blocks.
export function sumHours(blocks) {
  return blocks.reduce((sum, b) => sum + b.hours, 0);
}

// Turn a skill into 1-hour sessions and choose a day for each one.
// Each session goes on the day that currently has the FEWEST hours,
// so the study time is spread over the week instead of piling up.
export function makeSessions(skill, blocks) {
  // load[0] = hours already planned on Sunday ... load[6] = Saturday
  const load = [0, 0, 0, 0, 0, 0, 0];
  blocks.forEach((b) => {
    load[b.day] = load[b.day] + b.hours;
  });

  const sessions = [];
  for (let i = 0; i < skill.hoursPerWeek; i++) {
    // find the day with the smallest load (ties go to the earliest day)
    let lightest = 0;
    for (let d = 1; d < 7; d++) {
      if (load[d] < load[lightest]) lightest = d;
    }
    load[lightest] = load[lightest] + 1;

    sessions.push({
      id: Date.now() + i, // + i keeps ids different within one click
      skillId: skill.id,  // lets us find these blocks again to remove them
      title: skill.title,
      day: lightest,
      hours: 1,
    });
  }
  return sessions;
}

// Is this skill a good fit for this student right now? Simple, honest rules,
// and we keep the REASONS so the card can show them.
export function getFit(skill, interests, hoursLeft, inWeek) {
  const matchesInterest = interests.includes(skill.tag);
  const fitsTime = inWeek || skill.hoursPerWeek <= hoursLeft;
  const free = Math.max(0, hoursLeft); // never show "-1 free"

  const reasons = [];
  reasons.push(
    matchesInterest
      ? "Matches your interest in " + skill.tag
      : skill.tag + " is not one of your interests"
  );
  if (inWeek) {
    reasons.push("Already in your week");
  } else if (fitsTime) {
    reasons.push("Fits: needs " + skill.hoursPerWeek + " hrs, you have " + free + " free");
  } else {
    reasons.push("Too much: needs " + skill.hoursPerWeek + " hrs, only " + free + " free");
  }

  return { good: matchesInterest && fitsTime, matchesInterest, fitsTime, reasons };
}
