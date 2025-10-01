export const programmesTestData = [
  {
    name: 'Our Programmes',
    path: '/programmes',
    expectedText: 'Welcome to the ProgrammesPage',
  },
  {
    name: 'Book Club',
    path: '/programmes/book-club',
    expectedText: 'Welcome to the BookClubPage',
  },
  {
    name: 'Study Groups',
    path: '/programmes/study-groups',
    expectedText: null,
  },
  {
    name: 'Interview Preparation',
    path: '/programmes/interview-preparation',
    expectedText: 'Welcome to the InterviewPreparationPage',
  },
];

export const programmesExpectedItems = [
  'Our Programmes',
  'Book Club',
  'Study Groups',
  'Interview Preparation',
];
