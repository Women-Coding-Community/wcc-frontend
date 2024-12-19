import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Title } from '@components';

describe('Title Component', () => {
  it('renders the title text passed as a prop', () => {
    const testTitle = 'Test Title';

    render(<Title title={testTitle} />);

    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(testTitle);
  });

  it('applies correct styles to the Typography component', () => {
    const testTitle = 'Styled Title';

    render(<Title title={testTitle} />);

    const titleElement = screen.getByText(testTitle);

    expect(titleElement).toHaveStyle({
      fontSize: '2.25rem',
      fontWeight: '600',
      lineHeight: '1.2',
      textAlign: 'center',
    });
  });
});
