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
  {
    id: 'NAV-007',
    linkName: 'Home',
    pathToStart: '/programmes',
    linkLocator: (homePage: HomePage) => homePage.homeLink,
    expectedURL: '',
    expectedText: 'Women Coding Community',
  },
   
];

// about us dropdown data
const items = [
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

export const aboutUsMenuItems = items.map(([name, url, text]) => ({
  name,
  expectedURL: url,
  expectedText: text,
}));

const Pitems =[
  ['Interview Preperation',
  'Machine Learning',
  'Book Club',
  'Writing Club',
  'Coding Club',
  'Speaking Club'
  ] 
]; 

  export const programmeMenuItems = Pitems.map(([name, url, text]) => ({
  name,
  expectedURL: url,
  expectedText: text,
}));


