import { fireEvent, render, screen } from '@testing-library/react';

import { CodeOfConductSection } from '@components';

describe('CodeOfConductSection', () => {
  const codeOfConductSection = {
    items: ['women coding community is an inclusive community'],
    title: 'code of conduct for mentees',
  };

  beforeEach(() => {
    render(
      <CodeOfConductSection
        title={codeOfConductSection.title}
        items={codeOfConductSection.items}
      />,
    );
  });

  test('shows more information when "Show more" is clicked', () => {
    const showMoreButton = screen.getByText('Show more');
    fireEvent.click(showMoreButton);

    expect(
      screen.getByText(/Women Coding Community is an inclusive community/i),
    ).toBeInTheDocument();
  });

  test('shows less information when "Show less" is clicked', () => {
    const showMoreButton = screen.getByText('Show more');
    fireEvent.click(showMoreButton);

    const showLessButton = screen.getByText('Show less');
    fireEvent.click(showLessButton);

    expect(
      screen.queryByText(/No-replies by email or /i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Create a Slack Account/i),
    ).not.toBeInTheDocument();
  });
});
