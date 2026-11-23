import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';

import theme from 'theme';

import TeamLeadershipPage from '../../pages/about-us/team';

describe('TeamLeadershipPage', () => {
  it('shows an error message when the team data cannot be loaded', () => {
    render(
      <ThemeProvider theme={theme}>
        <TeamLeadershipPage team={null} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Unable to load the team')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'WCC Directors' }),
    ).not.toBeInTheDocument();
  });
});
