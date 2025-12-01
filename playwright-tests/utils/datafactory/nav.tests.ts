import { HomePage } from '@pages/home.page';

export const navTests = [
  {
    id: 'NAV-001',
    linkName: 'Home',
    pathToStart: '/mentorship',
    linkLocator: (homePage: HomePage) => homePage.homeLink,
    expectedURL: '',
    expectedText: 'Women Coding Community',
  },
  {
    id: 'NAV-002',
    linkName: 'Events',
    pathToStart: '/',
    linkLocator: (homePage: HomePage) => homePage.eventsLink,
    expectedURL: '/events',
    expectedText: 'Welcome to the EventsPage',
  },
  {
    id: 'NAV-003',
    linkName: 'Blog',
    pathToStart: '/',
    linkLocator: (homePage: HomePage) => homePage.blogLink,
    expectedURL: '/blog',
    expectedText: 'Welcome to the Blog Page',
  },
  {
    id: 'NAV-004',
    linkName: 'Jobs',
    pathToStart: '/',
    linkLocator: (homePage: HomePage) => homePage.jobsLink,
    expectedURL: '/jobs',
    expectedText: 'Welcome to the JobsPage',
  },
];

// about us dropdown data
const aboutUsItems = [
  ['Overview', '/about-us', 'Welcome to the AboutUsPage'],
  ['Team', '/about-us/team', 'Welcome to the TeamPage'],
  [
    'Code of Conduct',
    '/about-us/code-of-conduct',
    'Welcome to the AboutUsCodeOfConductPage',
  ],
  ['Donate', '/about-us/donate', 'Welcome to the DonatePage'],
  ['Volunteer', '/about-us/volunteer', 'Welcome to the VolunteerPage'],
  ['Partners', '/about-us/partners', 'Welcome to the PartnersPage'],
  [
    'Become a Partner',
    '/about-us/partners/become-a-partner',
    'Welcome to the BecomeAPartnerPage',
  ],
  ['Celebrate Her', '/about-us/celebrate-her', '#celebrate_her'],
];

export const aboutUsMenuItems = aboutUsItems.map(([name, url, text]) => ({
  name,
  expectedURL: url,
  expectedText: text,
}));
const mentorshipItems = [
  ['Overview', '/'],
  ['Mentors', '/mentorship/mentors'],
  ['Study Groups', '/mentorship/study-groups'],
  ['Resources', '/mentorship/resources'],
  ['Code of Conduct', '/mentorship/code-of-conduct'],
  ['FAQs', '/mentorship/faqs'],
  ['Long-Term Timeline', '/mentorship/long-term-timeline'],
  ['Ad-Hoc Timeline', '/mentorship/ad-hoc-timeline'],
];

export const mentorshipMenuItems = mentorshipItems.map(([name, url]) => ({
  name,
  expectedURL: url,
}));
