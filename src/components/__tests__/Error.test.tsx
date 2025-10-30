import { render, screen } from '@testing-library/react';

import Error from 'components/Error';

test('checks 404 component title', () => {
  render(<Error title="404 - Not found" />);
  expect(screen.getByText('404 - Not found')).toBeInTheDocument();
});

test('checks 500 component title', () => {
  render(<Error title="500 - Server-side error occurred" />);
  expect(
    screen.getByText('500 - Server-side error occurred'),
  ).toBeInTheDocument();
});
