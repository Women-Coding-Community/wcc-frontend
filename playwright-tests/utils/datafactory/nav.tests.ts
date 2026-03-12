import { HomePage } from '@pages/home.page';

export const navTests = [
  {
    linkName: 'Home',
    pathToStart: '/mentorship',
    linkLocator: (homePage: HomePage) => homePage.homeLink,
    expectedURL: '',
    expectedText: 'Women Coding Community',
  },
  {
    linkName: 'Events',
    pathToStart: '/',
    linkLocator: (homePage: HomePage) => homePage.eventsLink,
    expectedURL: '/events',
    expectedText: 'Welcome to the EventsPage',
  },
  {
    linkName: 'Blog',
    pathToStart: '/',
    linkLocator: (homePage: HomePage) => homePage.blogLink,
    expectedURL: '/blog',
    expectedText: 'Welcome to the Blog Page',
  },
  {
    linkName: 'Jobs',
    pathToStart: '/',
    linkLocator: (homePage: HomePage) => homePage.jobsLink,
    expectedURL: '/jobs',
    expectedText: 'Welcome to the JobsPage',
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
const programmeItems = [
  ['Our Programmes', '/programmes', 'Welcome to the ProgrammesPage'],
  ['Book Club', '/programmes/book-club', 'Welcome to the BookClubPage'],
  [
    'Study Groups',
    '/programmes/study-groups',
    'Data Analytics and Generative AI concepts',
  ],
  [
    'Interview Preparation',
    '/programmes/interview-preparation',
    'Welcome to the InterviewPreparationPage',
  ],
];
export const programmeMenuItems = programmeItems.map(([name, url, text]) => ({
  name,
  expectedURL: url,
  expectedText: text,
}));

export const footerSocialLinks = [
  {
    id: 'NAV-014',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/womencodingcommunity',
  },
  {
    id: 'NAV-015',
    name: 'GitHub',
    url: 'https://github.com/WomenCodingCommunity',
  },
  {
    id: 'NAV-016',
    name: 'Instagram',
    url: /instagram\.com.*women_coding_community/,
  },
  {
    id: 'NAV-017',
    name: 'Slack',
    url: 'https://join.slack.com/t/womencodingcommunity/shared_invite/zt-2hpjwpx7l-rgceYBIWp6pCiwc0hVsX8A',
  },
  {
    id: 'NAV-018',
    name: 'Email',
    url: 'mailto:london@womencodingcommunity.com',
  },
  {
    id: 'NAV-019',
    name: 'Send us a report',
    url: 'https://github.com/WomenCodingCommunity/WomenCodingCommunity.github.io/issues/new?template=bug_report.md&title=bug%20title',
    opensInNewTab: true,
  },
];
