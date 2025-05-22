import { render, screen } from '@testing-library/react';

import { ContactBox } from 'components/ContactBox';

it('has a title', () => {
  render(<ContactBox title="Contact Us" />);
  expect(screen.getByText('Contact Us')).toBeInTheDocument();
});

it('has a slack icon', () => {
  render(<ContactBox title="Contact Us" showIcon={true} />);
  expect(screen.getByTestId('slack-icon')).toBeVisible();
});

it('renders title as a link', () => {
  render(<ContactBox title="Contact Us" titleLink="/contact" />);
  const titleLink = screen.getByText('Contact Us');
  expect(titleLink.closest('a')).toHaveAttribute('href', '/contact');
});

it('clicks on a link in ContactBox', () => {
  const links = [{ linkText: 'Home', path: '/home', icon: <span>🏠</span> }];
  render(<ContactBox title="Contact Us" links={links} />);
  const linkElement = screen.getByText('Home');
  expect(linkElement.closest('a')).toHaveAttribute('href', '/home');

  const iconElement = screen.getByTestId('icon');
  expect(iconElement).toBeVisible();
});
