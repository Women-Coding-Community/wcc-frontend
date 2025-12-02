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
    url: 'https://www.instagram.com/women_coding_community/',
  },
  {
    id: 'NAV-017',
    name: 'Slack',
    url: 'https://womencodingcommunity.slack.com/signup#/domain-signup',
  },
  // {
  //   id: 'NAV-018',
  //   name: 'Email',
  //   url: 'mailto:london@womencodingcommunity.com',
  // },
  {
    id: 'NAV-019',
    name: 'Send us a report',
    url: 'https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FWomen-Coding-Community%2FWomenCodingCommunity.github.io%2Fissues%2Fnew%3Ftemplate%3Dbug_report.md%26title%3Dbug%2520title',
    opensInNewTab: true,
  },
];
