import { cleanup, render, screen } from '@testing-library/react';

import { GradientBox } from 'components/GradientBox';

describe('GradientBox', () => {
  it('has the right background css style', () => {
    const colorGradients = [
      ['#fff', '#000'],
      ['#fff', '#000', 'blue'],
    ];
    colorGradients.forEach((colors) => {
      render(
        <GradientBox colors={colors} data-testid="container"></GradientBox>,
      );

      const box = screen.getByTestId('container');
      expect(box).toHaveStyle(
        `background: linear-gradient(to right, ${colors.join(', ')})`,
      );

      cleanup();
    });
  });

  it('has the content passed in as children', () => {
    render(
      <GradientBox colors={['#fff', '#000']}>
        <button>Click me</button>
      </GradientBox>,
    );

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });
});
