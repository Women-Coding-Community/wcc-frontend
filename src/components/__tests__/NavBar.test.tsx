// /**
//  * @jest-environment jsdom
//  */

// TODO opening another PR to fix the jest issue we currently have with the packages

// import { fireEvent, screen } from '@testing-library/dom';
// import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'next/router'; // Import the correct component
// import mockRouter from 'next-router-mock';

// import { NavBar } from '@components';

// jest.mock('next/router', () => jest.requireActual('next-router-mock'));

// describe('Navbar', () => {
//   beforeEach(() => {
//     mockRouter.setCurrentUrl('/');
//   });

//   // ...

//   it.only('renders the logo', () => {
//     const history = createMemoryHistory();
//     render(
//       <Router history={history}>
//         <NavBar />
//       </Router>,
//     );
//     const logo = screen.getByAltText('Logo');
//     expect(logo).toBeInTheDocument();
//   });

//   it('renders all navigation buttons', () => {
//     render(<NavBar />);
//     const navItems = [
//       'Home',
//       'Mentorship',
//       'Programmes',
//       'Events',
//       'Blog',
//       'About Us',
//       'Find a mentor',
//     ];
//     navItems.forEach((item) => {
//       expect(screen.getByText(item)).toBeInTheDocument();
//     });
//   });

//   it.skip('renders all navigation buttons', () => {
//     render(<NavBar />);
//     expect(screen.getByText('Home')).toBeInTheDocument();
//     expect(screen.getByText('Mentorship')).toBeInTheDocument();
//     expect(screen.getByText('Programmes')).toBeInTheDocument();
//     expect(screen.getByText('Events')).toBeInTheDocument();
//     expect(screen.getByText('Blog')).toBeInTheDocument();
//     expect(screen.getByText('About Us')).toBeInTheDocument();
//     expect(screen.getByText('Find a mentor')).toBeInTheDocument();
//   });

//   it('opens and closes the Mentorship menu', () => {
//     render(<NavBar />);
//     const mentorshipButton = screen.getByText('Mentorship');
//     fireEvent.click(mentorshipButton);

//     expect(screen.getByText('Overview')).toBeInTheDocument();
//     expect(screen.getByText('Mentors')).toBeInTheDocument();
//     expect(screen.getByText('Resources')).toBeInTheDocument();
//     expect(screen.getByText('Code of Conduct')).toBeInTheDocument();
//     expect(screen.getByText('FAQ')).toBeInTheDocument();

//     const closeMentorshipButton = screen.getByText('Overview');

//     fireEvent.click(closeMentorshipButton);
//   });

//   it('opens and closes the Programmes menu', () => {
//     render(<NavBar />);
//     const programmesButton = screen.getByText('Programmes');
//     fireEvent.click(programmesButton);

//     expect(screen.getByText('Book Club')).toBeInTheDocument();
//     expect(screen.getByText('Interview Preparation')).toBeInTheDocument();
//     expect(screen.getByText('Study Groups')).toBeInTheDocument();

//     const closeProgrammesButton = screen.getByText('Book Club');

//     fireEvent.click(closeProgrammesButton);
//   });

//   it('opens and closes the About Us menu', async () => {
//     render(<NavBar />);
//     const aboutUsButton = screen.getByText('About Us');
//     fireEvent.click(aboutUsButton);

//     expect(screen.getByText('Option 1')).toBeInTheDocument();
//     expect(screen.getByText('Option 2')).toBeInTheDocument();
//     expect(screen.getByText('Option 3')).toBeInTheDocument();

//     const closeAboutUsButton = screen.getByText('Option 1');

//     fireEvent.click(closeAboutUsButton);
//   });
// });
