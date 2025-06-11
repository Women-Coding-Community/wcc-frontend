import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Mentor } from '@utils/types';

import { MentorProfileCard } from '../MentorProfileCard';

const mockMentor: Mentor = {
  fullName: 'Test Mentor',
  position: 'Senior Software Engineer',
  companyName: 'ABC Technology Company',
  city: 'London',
  country: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
  },
  images: [
    {
      path: 'assets/images/mentors/test_mentor.jpg',
      alt: 'mentor profile image',
      type: 'desktop',
    },
  ],
  network: [
    { type: 'linkedin', link: 'https://linkedin.com/in/test' },
    { type: 'github', link: 'https://github.com/test' },
  ],
  profileStatus: 'active',
  bio: 'Experienced engineer and mentor.',
  spokenLanguages: ['English', 'French'],
  skills: {
    yearsExperience: 10,
    experienceRange: '10+ years',
    areas: ['Backend', 'Cloud'],
    languages: ['C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
  },
  menteeSection: {
    mentorshipType: ['Career', 'Technical'],
    availability: {
      months: ['January', 'February'],
      hours: 5,
    },
    idealMentee: 'Motivated learners',
    focus: ['Cloud', 'Backend'],
    additional: 'Flexible with time zones.',
  },
  feedbackSection: {
    feedbacks: [
      {
        rating: '5',
        date: '2024-05-01',
        feedback: 'Great mentor!',
        name: 'Alice',
        type: 'mentee',
      },
    ],
  },
  resources: [],
};

describe('MentorProfileCard', () => {
  it('renders mentor basic info', () => {
    render(<MentorProfileCard mentor={mockMentor} />);
    expect(screen.getByText('Test Mentor')).toBeInTheDocument();
    expect(screen.getByText(/Senior Software Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/ABC Technology Company/)).toBeInTheDocument();
    expect(screen.getByText(/Programming languages:/)).toBeInTheDocument();
    expect(
      screen.getByText(/C\+\+, Java, JavaScript, TypeScript, Python/),
    ).toBeInTheDocument();
  });

  it('renders social network icons with correct links', () => {
    render(<MentorProfileCard mentor={mockMentor} />);
    expect(screen.getAllByRole('link')[1]).toHaveAttribute(
      'href',
      'https://linkedin.com/in/test',
    );
    expect(screen.getAllByRole('link')[2]).toHaveAttribute(
      'href',
      'https://github.com/test',
    );
  });

  it('shows the correct tab content when tabs are clicked', () => {
    render(<MentorProfileCard mentor={mockMentor} />);
    // Presentation tab is default
    expect(
      screen.getByText(/Based in: London, United Kingdom/),
    ).toBeInTheDocument();

    // Switch to Skills & Support Areas tab
    fireEvent.click(screen.getByText('Skills & Support Areas'));
    expect(screen.getByText(/Tech Experience in years:/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(screen.getByText(/January/)).toBeInTheDocument();
    expect(screen.getByText(/French/)).toBeInTheDocument();
    expect(screen.getByText(/Flexible with time zones/)).toBeInTheDocument();

    // Switch to Reviews tab
    fireEvent.click(screen.getByText('Reviews'));
    expect(screen.getByText('Great mentor!')).toBeInTheDocument();
    // Check for star icons (5 stars)
    expect(screen.getAllByTestId('StarIcon').length).toBe(5);

    // Switch to Resources tab
    fireEvent.click(screen.getByText('Resources'));
    expect(
      screen.getByText(/This mentor has not provided any resources yet/),
    ).toBeInTheDocument();
  });

  it('renders the Apply for this mentor button', () => {
    render(<MentorProfileCard mentor={mockMentor} />);
    expect(
      screen.getByRole('link', { name: /Apply for this mentor/i }),
    ).toBeInTheDocument();
  });
});
