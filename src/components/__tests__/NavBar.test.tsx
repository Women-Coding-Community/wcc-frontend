import { ThemeProvider, createTheme } from '@mui/material/styles';
import mediaQuery from 'css-mediaquery';
import { render, screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import React from 'react';

import { NavBar } from 'components/NavBar';

jest.mock('next/router', () => require('next-router-mock'));

const theme = createTheme();

export const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: () => jest.fn(),
    removeListener: () => jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

describe('NavBar', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('should render logo and menu items', () => {
    renderWithRouter(<NavBar />);
    const navItems = [
      'Find a mentor',
      'Programmes',
      'About Us',
      'Jobs',
      'Events',
      'Blog',
    ];
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('should navigate to the correct path on menu item click', () => {
    renderWithRouter(<NavBar />);

    fireEvent.click(screen.getByText('Programmes'));
    expect(
      screen.getByRole('menuitem', { name: /Book Club/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Book Club')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Book Club'));
    expect(mockRouter).toMatchObject({ pathname: '/programmes/book-club' });

    fireEvent.click(screen.getByText('Programmes'));
    expect(
      screen.getByRole('menuitem', { name: /Our Programmes/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Our Programmes')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Our Programmes'));
    expect(mockRouter).toMatchObject({ pathname: '/programmes' });

    fireEvent.click(screen.getByText('About Us'));
    expect(screen.getByRole('menuitem', { name: /Team/i })).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Team'));
    expect(mockRouter).toMatchObject({ pathname: '/about-us/team' });

    fireEvent.click(screen.getByText('Mentorship'));
    expect(
      screen.getByRole('menuitem', { name: /Mentors/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Mentors')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Mentors'));
    expect(mockRouter).toMatchObject({ pathname: '/mentorship/mentors' });

    fireEvent.click(screen.getByText('Events'));
    expect(mockRouter).toMatchObject({ pathname: '/events' });
    fireEvent.click(screen.getByText('Blog'));
    expect(mockRouter).toMatchObject({ pathname: '/blog' });
    fireEvent.click(screen.getByText('Jobs'));
    expect(mockRouter).toMatchObject({ pathname: '/jobs' });
  });

  it('should open and close the dropdown menu', () => {
    renderWithRouter(<NavBar />);
    fireEvent.click(screen.getByText('About Us'));
    expect(screen.getByTestId('subNav')).toBeInTheDocument();
    fireEvent.click(screen.getByText('About Us'));
    expect(screen.queryByRole('subNav')).not.toBeInTheDocument();
  });

  it('should display toggle on mobile', () => {
    window.matchMedia = createMatchMedia(800);
    renderWithRouter(<NavBar />);
    const menuButton = screen.getByRole('button', { name: 'menu' });
    expect(menuButton).toBeVisible();
  });

  it('should toggle the mobile drawer', () => {
    renderWithRouter(<NavBar />);
    fireEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('menu'));
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
