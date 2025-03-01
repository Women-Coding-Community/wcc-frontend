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
