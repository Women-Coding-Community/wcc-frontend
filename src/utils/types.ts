type Image = {
  path: string;
  alt: string;
  type?: string;
};

type Programme = {
  name: string;
  link: string;
  icon: string;
};

type WCCEvent = {
  title: string;
  type: string;
  host: string;
  speaker: string;
  date: string;
  endDate: number;
  description: string;
  link: string;
  images: Image[];
};

export type LandingPageResponse = {
  heroSection: {
    title: string;
    description: string;
    images: Image[];
  };
  programmesSection: {
    title: string;
    description: string;
    programmes: Programme[];
  };
  eventsSection: {
    title: string;
    events: WCCEvent[];
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
};
