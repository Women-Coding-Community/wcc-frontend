import { screen } from '@testing-library/react';
import React from 'react';

import { MenteeFormLayout } from 'components/forms';

import { renderWithTheme } from './renderForm';

const renderLayout = (
  props: Partial<React.ComponentProps<typeof MenteeFormLayout>> = {},
) =>
  renderWithTheme(
    <MenteeFormLayout title="Mentee application" {...props}>
      <p>Form content</p>
    </MenteeFormLayout>,
  );

describe('MenteeFormLayout', () => {
  it('renders the title as a level 1 heading', () => {
    renderLayout();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Mentee application' }),
    ).toBeInTheDocument();
  });

  it('renders the required field legend', () => {
    renderLayout();

    expect(screen.getByText('Indicates a required field')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders its children successfully', () => {
    renderLayout();

    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    renderLayout({ description: <p>Please fill in all fields</p> });

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('does not render a description when it is omitted', () => {
    renderLayout();

    expect(
      screen.queryByText('Please fill in all fields'),
    ).not.toBeInTheDocument();
  });
});
