import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';

import '@testing-library/jest-dom';
import { TimelineCard } from '@components';
import theme from 'theme';

const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

describe('TimelineCard Component', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  const renderComponent = (isMobile: boolean = false) => {
    window.matchMedia = createMatchMedia(isMobile ? 300 : 1200);
    return render(
      <ThemeProvider theme={theme}>
        <TimelineCard {...mockProps} data-testid="timeline-card" />
      </ThemeProvider>,
    );
  };

  it('renders all content correctly', () => {
    const testProps = { ...mockProps, date: '2025' };
    render(
      <ThemeProvider theme={theme}>
        <TimelineCard {...testProps} data-testid="timeline-card" />
      </ThemeProvider>,
    );

    expect(screen.getByText(testProps.date)).toBeInTheDocument();
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('renders correctly without date', () => {
    renderComponent();

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('applies mobile styles when on mobile viewport', () => {
    renderComponent(true);

    const card = screen.getByText(mockProps.title).closest('.MuiCard-root');
    const computedStyle = card ? window.getComputedStyle(card) : null;
    expect(computedStyle?.maxWidth).toBe('400px');
    expect(computedStyle?.minHeight).toBe('226px');
    expect(card).toHaveStyle({
      maxWidth: '400px',
      minHeight: '226px',
    });
  });

  it('applies desktop styles when on desktop viewport', () => {
    renderComponent(false);

    const card = screen.getByText(mockProps.title).closest('.MuiCard-root');
    const computedStyle = card ? window.getComputedStyle(card) : null;
    expect(computedStyle?.maxWidth).toBe('1050px');
    expect(computedStyle?.minHeight).toBe('275px');
    expect(card).toHaveStyle({
      maxWidth: '1050px',
      minHeight: '275px',
    });
  });
});
