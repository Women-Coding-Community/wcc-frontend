type Image = {
  path: string;
  alt: string;
  type?: string;
};

export type Programme = {
  name: string;
  link: Link;
  icon: string;
};

export type Link = {
  title?: string;
  uri: string;
  label: string;
};

export type Event = {
  title: string;
  type: string;
  host: string;
  speaker: string;
  date: string;
  endDate: number;
  description: string;
  link: Link;
  images: Image[];
};

export type LandingPageResponse = {
  heroSection: {
    title: string;
    description: string;
    images: Image[];
  };
  programmes: {
    title: string;
    description: string;
    items: Programme[];
  };
  eventsSection: {
    title: string;
    events: Event[];
  };
  announcementSection: {
    title: string;
    events: Event[];
  };
  volunteerSection: {
    title: string;
    description: string;
    link: string;
    images: Image[];
  };

  fullBannerSection: {
    title: string;
    description: string;
    images: Image[];
    link: Link;
  };
};

export type Network = {
  type: string;
  link: string;
};

export type FooterResponse = {
  title: string;
  subtitle: string;
  description: string;
  network: Network[];
  link: Link;
};

export type MentorshipProgrammeData = {
  page: {
    title: string;
    description: string;
  };
  mentorSection: MentorOrMenteeSectionData;
  menteeSection: MentorOrMenteeSectionData;
  feedbackSection: FeedbackSectionData;
};

export type MentorOrMenteeSectionData = {
  title: string;
  description: string;
  link: {
    label: string;
    url: string;
  };
  topics: string[];
};

export type FeedbackSectionData = {
  title: string;
  feedbacks: [
    {
      name: string;
      feedback: string;
      mentee: boolean;
      year: number;
    },
  ];
};

export type TeamApiResponse = {
  page: TeamCoreData;
  contact: TeamContactData;
  membersByType: TeamMembersData;
};

export type TeamCoreData = {
  title: string;
  subtitle: string;
  description: string;
  link: {
    title: string;
    label: string;
    uri: string;
  };
  images: { path: string; alt: string; type: string }[];
};

export type TeamContactData = {
  title: string;
  links: {
    type: string;
    link: string;
  }[];
};

type PersonalData = {
  fullName: string;
  position: string;
  email: string;
  country: {
    countryCode: string;
    countryName: string;
  };
  city: string;
  jobTitle: string;
  companyName: string;
  images: { path: string; alt: string; type: string }[];
  network: {
    type: string;
    link: string;
  }[];
};

export type TeamMembersData = {
  directors: PersonalData[];
  leads: PersonalData[];
  evangelists: PersonalData[];
};
