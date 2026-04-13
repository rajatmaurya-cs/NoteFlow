
export const result = [
  {
    id: 1,
    subject: "Chemistry",
    title: "Organic Chemistry Basics",
    date: "2026-04-10",
    description: "Introduction to hydrocarbons, functional groups, and reaction mechanisms.",
    published: true,
  },
  {
    id: 2,
    subject: "Physics",
    title: "Laws of Motion",
    date: "2026-04-9",
    description: "Detailed explanation of Newton’s three laws with real-world examples.",
    published: true,
  },
  {
    id: 3,
    subject: "Mathematics",
    title: "Linear Algebra - Matrices",
    date: "2026-04-8",
    description: "Covers matrix operations, determinants, and inverse matrices.",
    published: false,
  },
  {
    id: 4,
    subject: "Computer Science",
    title: "Data Structures - Arrays",
    date: "2026-04-7",
    description: "Basics of arrays, operations, and time complexity analysis.",
    published: true,
  },
  {
    id: 5,
    subject: "Biology",
    title: "Cell Structure",
    date: "2026-04-6",
    description: "Overview of cell organelles and their functions.",
    published: false,
  },
  {
    id: 6,
    subject: "English",
    title: "Grammar - Tenses",
    date: "2026-04-5",
    description: "Complete guide to present, past, and future tenses with examples.",
    published: true,
  },

   {
    id: 7,
    subject: "Politics",
    title: "Parliament",
    date: "2026-04-4",
    description: "Complete guide to present, past, and future tenses with examples.",
    published: true,
  },

   {
    id: 7,
    subject: "Politics",
    title: "Parliament",
    date: "2026-04-3",
    description: "Complete guide to present, past, and future tenses with examples.",
    published: true,
  },



];
const freqObj = {};

for (let item of result) {
    
  const subject = item.subject;

  freqObj[subject] = (freqObj[subject] || 0) + 1;
}

console.log(freqObj)

