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
