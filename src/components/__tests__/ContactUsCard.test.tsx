import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import { ContactUsCard } from '../ContactUsCard';

const mockLinks = [
  { type: 'EMAIL', link: 'test@example.com' },
  { type: 'GITHUB', link: 'https://github.com/Women-Coding-Community' },
];

describe('ContactUsCard', () => {
  it('renders the title', () => {
    render(<ContactUsCard title="Contact Us" links={mockLinks} />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders email link correctly', () => {
    render(<ContactUsCard title="Contact Us" links={mockLinks} />);
    const emailLink = screen.getByText('test@example.com').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('renders GitHub link correctly', () => {
    render(<ContactUsCard title="Contact Us" links={mockLinks} />);
    const githubLink = screen
      .getByText('https://github.com/Women-Coding-Community')
      .closest('a');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Women-Coding-Community',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders GitHub contributor section on mobile', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === '(max-width: 750px)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });

    render(<ContactUsCard title="Contact Us" links={mockLinks} />);
    expect(
      screen.getByText('Join us as a GitHub contributor'),
    ).toBeInTheDocument();
  });

  it('does not render GitHub contributor section on desktop', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(max-width: 750px)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });

    render(<ContactUsCard title="Contact Us" links={mockLinks} />);
    expect(
      screen.queryByText('Join us as a GitHub contributor'),
    ).not.toBeInTheDocument();
  });
});
