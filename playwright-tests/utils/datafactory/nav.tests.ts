import { LandingPage } from '@pages/landing.page';

export const navTests = [
  {
    id: 'NAV-001',
    linkName: 'Home',
    pathToStart: '/mentorship',
    linkLocator: (landingPage: LandingPage) => landingPage.homeLink,
    expectedURL: '',
    expectedText: 'Women Coding Community',
  },
  {
    id: 'NAV-002',
    linkName: 'Events',
    pathToStart: '/',
    linkLocator: (landingPage: LandingPage) => landingPage.eventsLink,
    expectedURL: '/events',
    expectedText: 'Welcome to the EventsPage',
  },
  {
    id: 'NAV-003',
    linkName: 'Blog',
    pathToStart: '/',
    linkLocator: (landingPage: LandingPage) => landingPage.blogLink,
    expectedURL: '/blog',
    expectedText: 'Welcome to the Blog Page',
  },
];
