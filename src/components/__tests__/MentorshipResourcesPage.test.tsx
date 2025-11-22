import { render, screen } from '@testing-library/react';

import pageData from 'lib/responses/mentorshipResources.json';
import MentorshipResourcesPage from 'pages/mentorship/resources';

jest.mock('@components/ResourcesCard', () => {
  const ResourcesCard = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div>
      {' '}
      <span>{title}</span> <span>{description}</span>{' '}
    </div>
  );
  return { ResourcesCard };
});

jest.mock('@components/Footer', () => {
  const Footer = () => <div>Footer</div>;
  return { Footer };
});

jest.mock('@components/Title', () => {
  const Title = ({ title }: { title: string }) => <h1>{title}</h1>;
  return { Title };
});

test('renders hero title and description', () => {
  render(<MentorshipResourcesPage />);

  expect(screen.getByText(pageData.heroTitle)).toBeInTheDocument();
  expect(
    screen.getByText(
      /Whether you’re a mentee looking to navigate your journey/i,
    ),
  ).toBeInTheDocument();
});

test('renders resource cards', () => {
  render(<MentorshipResourcesPage />);

  pageData.resources.forEach((res) => {
    expect(screen.getByText(res.title)).toBeInTheDocument();
    expect(screen.getByText(res.description)).toBeInTheDocument();
  });
});

test('renders footer', () => {
  render(<MentorshipResourcesPage />);
  expect(screen.getByText('Footer')).toBeInTheDocument();
});
