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
    subtitle: string;
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
    link: {
      title: string;
      uri: string;
    };
    images: Image[];
  };
  fullBannerSection: {
    title: string;
    description: string;
    images: Image[];
    link: Link;
  };
  events: EventData;
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

export type celebrateHerData = {
  lists: {
    title: string;
    description: string;
    uri: string;
    link: string;
    bgColor: string;
    tagText: string;
  }[];
};

export type StudyGroupSectionData = {
  groups: {
    title: string;
    description: string;
    mentor: string;
    participants: number;
    uri: string;
    bgColor: string;
  }[];
};

export type OurProgrammesData = {
  studyGroupSection: StudyGroupSectionData;
};

export type AboutUsPageData = {
  celebrateHer: celebrateHerData;
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

export type CodeOfConductSectionType = {
  title: string;
  items: string[];
};

export interface MentorshipCodeOfConductData {
  id: string;
  heroSection: {
    title: string;
  };
  menteeCodeSection: CodeOfConductSectionType;
  mentorCodeSection: CodeOfConductSectionType;
  wccCodeSection: {
    link: Link;
  };
}

export interface EventData {
  title: string;
  link: Link;
  items: Item[];
}

export interface Item {
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  topics: string;
  images: Image[];
  speakerProfile: SpeakerProfile;
  hostProfile: HostProfile;
  eventLink: EventLink;
}

export interface Image {
  path: string;
  alt: string;
  type: string;
}

export interface SpeakerProfile {
  label: string;
  uri: string;
}

export interface HostProfile {
  label: string;
  uri: string;
}

export interface EventLink {
  label: string;
  uri: string;
}

export type Mentor = {
  fullName: string;
  position: string;
  companyName: string;
  city: string;
  country: {
    countryCode: string;
    countryName: string;
  };
  images: Image[];
  network: Network[];
  profileStatus: string;
  bio: string;
  spokenLanguages: string[];
  skills: {
    yearsExperience: number;
    experienceRange: string;
    areas: string[];
    languages: string[];
  };
  menteeSection: {
    mentorshipType: string[];
    availability: {
      months: string[];
      hours: number;
    };
    idealMentee: string;
    focus: string[];
    additional: string;
  };
  feedbackSection: {
    feedbacks: {
      rating: string;
      date: string;
      feedback: string;
      name: string;
      type: string;
    }[];
  };
  resources: {
    id: string;
    name: string;
    description: string;
    rawContent?: string;
    type: string;
    link?: Link;
  }[];
};

export interface FaqHeroSection {
  title: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContentSection {
  title: string;
  items: FAQItem[];
}

export interface MentorshipPageData {
  id: string;
  heroSection: FaqHeroSection;
  commonFaqSection: FAQContentSection;
  mentorsFaqSection: FAQContentSection;
  menteesFaqSection: FAQContentSection;
}

export interface FaqSectionProps {
  title: string;
  items: FAQItem[];
}

export interface StudyGroupItem {
  title: string;
  description: string;
  coordinators: string;
  participants: number;
  link: Link;
}

export interface ContactLink {
  type: string;
  link: string;
}

export interface StudyGroupSection {
  items: StudyGroupItem[];
}

export interface OverviewSection {
  description: string;
}

export interface ContactSection {
  title: string;
  links: ContactLink[];
}

export interface StudyGroupsPageData {
  id: string;
  heroSection: {
    title: string;
    images: Image[];
  };
  section: OverviewSection;
  contact: ContactSection;
  studyGroupSection: StudyGroupSection;
}

export type AdHocTimeLineEvent = {
  title: string;
  description: string;
};

export type AdHocTimeLineResponse = {
  id: string;
  heroSection: {
    title: string;
  };
  events: {
    items: AdHocTimeLineEvent[];
  };
};

export type LongTermTimeLineEvent = {
  duration?: string;
  title: string;
  description: string;
};

export type LongTermTimeLineResponse = {
  id: string;
  heroSection: {
    title: string;
  };
  events: {
    items: LongTermTimeLineEvent[];
  };
};
