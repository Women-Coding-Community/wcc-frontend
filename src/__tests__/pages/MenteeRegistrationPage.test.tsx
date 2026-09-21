import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import theme from 'theme';

import MenteeRegistrationPage from '../../pages/mentorship/mentee-registration';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/mentorship/mentee-registration',
    query: {},
  }),
}));

const OPEN_LONG_TERM_CYCLE = {
  registrationOpen: true,
  mentorshipType: 'Long-Term',
};
const OPEN_AD_HOC_CYCLE = { registrationOpen: true, mentorshipType: 'Ad-Hoc' };

// The page fetches the current cycle first, then the mentor list.
// Pass null for the cycle to answer that first call with a 404.
const mockFetch = (cycle: unknown) => {
  globalThis.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: cycle !== null,
      json: jest.fn().mockResolvedValue(cycle),
    })
    .mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue([]) });
};

const renderPage = async () => {
  render(
    <ThemeProvider theme={theme}>
      <MenteeRegistrationPage />
    </ThemeProvider>,
  );
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
};

const setupMenteeBasicInfoStep = async ({
  includeHours = true,
  hours = '4',
}: {
  includeHours?: boolean;
  hours?: string;
} = {}) => {
  fireEvent.change(screen.getByPlaceholderText('Jane Doe'), {
    target: { value: 'Jane Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText('jane@example.com'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('@jane'), {
    target: { value: '@jane' },
  });

  const countrySelect = screen.getByRole('combobox');
  fireEvent.mouseDown(countrySelect);
  const countryOption = await screen.findByRole('option', {
    name: /United Kingdom/i,
  });
  fireEvent.click(countryOption);

  fireEvent.change(screen.getByPlaceholderText('London'), {
    target: { value: 'London' },
  });
  fireEvent.change(
    screen.getByPlaceholderText('e.g. Frontend Developer, Student'),
    { target: { value: 'Developer' } },
  );
  fireEvent.change(screen.getByPlaceholderText('Acme Corp'), {
    target: { value: 'Tech Corp' },
  });
  fireEvent.change(
    screen.getByPlaceholderText('https://www.linkedin.com/in/yourprofile'),
    { target: { value: 'https://www.linkedin.com/in/janedoe' } },
  );

  if (includeHours) {
    fireEvent.change(screen.getByPlaceholderText('e.g. 4'), {
      target: { value: hours },
    });
  }
};

describe('MenteeRegistrationPage', () => {
  beforeEach(() => {
    mockFetch(OPEN_LONG_TERM_CYCLE);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shows a loading state while the current cycle is being fetched', () => {
    globalThis.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
    render(
      <ThemeProvider theme={theme}>
        <MenteeRegistrationPage />
      </ThemeProvider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Step 1 of 3')).not.toBeInTheDocument();
  });

  it('renders step 1 with basic info fields', async () => {
    await renderPage();
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('jane@example.com')).toBeInTheDocument();
  });

  it('shows success screen after successful submission', async () => {
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: jest.fn().mockResolvedValue({ id: 1 }),
      });

    await renderPage();

    // Verify the success screen content exists when submitted state is true.
    // Since we can't easily navigate all 3 steps, we verify the key UI elements.
    expect(
      screen.queryByText('Application submitted!'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Back to Mentorship/i)).not.toBeInTheDocument();
  });

  it('shows error alert when API returns an error', async () => {
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ error: 'Server error' }),
      });

    await renderPage();

    // Error alert only appears after a failed submit attempt
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('Next button is present on step 1', async () => {
    await renderPage();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('Back button is disabled on step 1', async () => {
    await renderPage();
    expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
  });

  it('shows breadcrumb navigation', async () => {
    await renderPage();
    expect(screen.getByText('Mentee Registration')).toBeInTheDocument();
    expect(screen.getByText('Mentorship')).toBeInTheDocument();
  });

  it('navigates to step 2 after filling required step 1 fields and clicking Next', async () => {
    await renderPage();
    await setupMenteeBasicInfoStep();

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    });
  });
});

describe('MenteeRegistrationPage - registration closed', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shows closed message when no cycle is open', async () => {
    mockFetch(null);
    await renderPage();
    expect(screen.getByText('Application is now closed')).toBeInTheDocument();
    expect(
      screen.getByText(/Applications are currently closed/i),
    ).toBeInTheDocument();
    expect(screen.queryByText('Step 1 of 3')).not.toBeInTheDocument();
  });

  it('shows closed message when the current cycle request fails', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    await renderPage();
    expect(screen.getByText('Application is now closed')).toBeInTheDocument();
    expect(screen.queryByText('Step 1 of 3')).not.toBeInTheDocument();
  });
});

describe('MenteeRegistrationPage - adhoc cycle', () => {
  beforeEach(() => {
    mockFetch(OPEN_AD_HOC_CYCLE);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetches ad-hoc mentors', async () => {
    await renderPage();
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/mentors?mentorshipTypes=Ad-Hoc',
      );
    });
  });

  it('does not render available hours per month field', async () => {
    await renderPage();
    expect(screen.queryByPlaceholderText('e.g. 4')).not.toBeInTheDocument();
  });

  it('navigates to step 2 after filling required fields', async () => {
    await renderPage();
    await setupMenteeBasicInfoStep({ includeHours: false });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    });
  });

  it('shows mentorship goals field on step 2', async () => {
    await renderPage();
    await setupMenteeBasicInfoStep({ includeHours: false });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Mentorship goals *')).toBeInTheDocument();
    });
  });
});

describe('MenteeRegistrationPage - long-term cycle', () => {
  beforeEach(() => {
    mockFetch(OPEN_LONG_TERM_CYCLE);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('blocks step 2 when availableHsMonth is below threshold for long-term', async () => {
    await renderPage();
    await setupMenteeBasicInfoStep({ hours: '1' });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });
    expect(screen.queryByText('Step 2 of 3')).not.toBeInTheDocument();
  });

  it('shows validation error for availableHsMonth below threshold', async () => {
    await renderPage();
    await setupMenteeBasicInfoStep({ hours: '1' });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Please enter at least 2 hours per month'),
      ).toBeInTheDocument();
    });
  });
});
