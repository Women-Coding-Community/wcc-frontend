type ItemTuple = [string, string, string] | [string, string, string, boolean];

const items: ItemTuple[] = [
  ['Overview', '/mentorship', 'Become a mentor'],
  ['Mentors', '/mentorship/mentors', 'Apply for this mentor', true],
  [
    'Study Groups',
    '/mentorship/study-groups',
    'Welcome to the MentorShipStudyGroupsPage',
  ],
  [
    'Mentor Registration',
    '/mentorship/mentor-registration',
    'Welcome to the MentorRegistrationPage',
  ],
  [
    'Mentee Registration',
    '/mentorship/mentee-registration',
    'Welcome to the MenteeRegistrationPage',
  ],
  [
    'Resources',
    '/mentorship/resources',
    'Welcome to the MentorshipResourcesPage',
  ],
  [
    'Code of Conduct',
    '/mentorship/code-of-conduct',
    'Welcome to the MentorshipCodeOfConductPage',
  ],
  ['FAQs', '/mentorship/faqs', 'Welcome to the MentorshipFaqsPage'],
  [
    'Long-Term Timeline',
    '/mentorship/long-term-timeline',
    'Welcome to the Long Term Timeline Page',
  ],
  [
    'Ad-Hoc Timeline',
    '/mentorship/ad-hoc-timeline',
    'Welcome to the Ad-Hoc Timeline Page',
  ],
];

export const mentorshipMenuItems = items.map(
  ([name, expectedURL, expectedText, useLocator]) => ({
    name,
    expectedURL,
    expectedText,
    ...(useLocator ? { useLocator } : {}),
  }),
);
