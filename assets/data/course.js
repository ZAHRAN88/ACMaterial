const fs = require('fs');

const databasePath = 'weeks.json';

// Load the existing data from the JSON file
const loadDatabase = () => {
  try {
    const data = fs.readFileSync(databasePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error.message);
    return [];
  }
};

// Save data to the JSON file
const saveDatabase = (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(databasePath, jsonData, 'utf8');
    console.log('Data saved to the database.');
  } catch (error) {
    console.error('Error saving data to the database:', error.message);
  }
};

// Add a new course to the database
const addCourse = (course) => {
  const database = loadDatabase();
  database.push(course);
  saveDatabase(database);
};

// Add weeks to an existing course
const addWeeksToCourse = (courseName, newWeeks) => {
  const database = loadDatabase();
  const existingCourseIndex = database.findIndex((course) => course.courseName === courseName);

  if (existingCourseIndex !== -1) {
    // Course found, add weeks
    database[existingCourseIndex].weeks.push(...newWeeks);
    saveDatabase(database);
    console.log(`Weeks added to the course '${courseName}'.`);
  } else {
    console.error(`Course '${courseName}' not found.`);
  }
};

// Example: Add weeks to an existing course
const existingCourseName = 'System analysis';
const newWeeksToAdd = [
  {
    weekName: 'Week 3',
    resources: [
      { icon: 'fas fa-play-circle', text: 'Lecture 3 (Video)', link: 'https://example.com/week3/lecture3' },
      { icon: 'fas fa-file-download', text: 'Lecture 3 (PDF)', link: 'https://example.com/week3/lecture3.pdf' },
    ],
  },
];

// Add weeks to the existing course
addWeeksToCourse(existingCourseName, newWeeksToAdd);
