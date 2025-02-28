import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import React from 'react';

import theme from 'theme';

import { TextContent } from '../TextContent';

describe('TextContent', () => {
  it('renders title and description', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TextContent title="Test Title" description="Test Description" />
      </ThemeProvider>,
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('applies correct styles for title', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TextContent title="Test Title" description="Test Description" />
      </ThemeProvider>,
    );

    const titleElement = getByText('Test Title');
    expect(titleElement).toHaveStyle('font-weight: 600');
    expect(titleElement).toHaveStyle('font-size: 45px');
  });

  it('applies correct styles for description', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TextContent title="Test Title" description="Test Description" />
      </ThemeProvider>,
    );

    const descriptionElement = getByText('Test Description');
    expect(descriptionElement).toHaveStyle('font-size: 1rem');
    expect(descriptionElement).toHaveStyle('font-weight: 500');
  });

  it('applies correct marginRight for non-mobile view', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TextContent title="Test Title" description="Test Description" />
      </ThemeProvider>,
    );

    const boxElement = container.firstChild;
    expect(boxElement).toHaveStyle('margin-right: 52px');
  });
});
