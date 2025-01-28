import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

import theme from 'theme';
import { Hero } from '../Hero';
import { LandingPageResponse } from '@utils/types';

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn(),
  }));

const mockUseMediaQuery = require('@mui/material').useMediaQuery;

describe('Hero Component', () => {
    const mockData: LandingPageResponse['heroSection'] = {
        title: 'Women Coding Community',
        description: 'Empowering Women in Their Tech Careers',
        images: [
          {
            alt: 'There are two women talking during a productive mentoring session',
            path: '/hero-3x2.jpg',
            type: 'desktop',
          },
      ],
    };

    const renderComponent = (isMobile: boolean) => {
      mockUseMediaQuery.mockReturnValue(isMobile);

        return render(
            <ThemeProvider theme={theme}>
                <Hero 
                    title={mockData.title}
                    description={mockData.description}
                    images={mockData.images}
                />
            </ThemeProvider>
        )
    };

    afterEach(() => {
        jest.clearAllMocks();
      });

    it('renders the title, description, and image correctly', () => {
        renderComponent(false);

        expect(screen.getByText(mockData.title)).toBeInTheDocument();
        expect(screen.getByText(mockData.description)).toBeInTheDocument();
        const image = screen.getByAltText(mockData.images[0].alt);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockData.images[0].path);
    });

    it('renders correctly on mobile layout', () => {
      renderComponent(true)
  
      expect(screen.getByRole('grid')).toHaveStyle('maxWidth: 100%');
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
    });
  
    it('renders correctly on desktop layout', () => {
      renderComponent(false);
  
      expect(screen.getByRole('grid')).toHaveStyle('maxWidth: 1100px');
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
    });

});
