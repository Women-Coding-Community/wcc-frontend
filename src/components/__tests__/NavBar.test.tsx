/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { NavBar } from "@components";

describe("Navbar", () => {
  it("renders the logo", () => {
    render(<NavBar />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  it.skip("renders all navigation buttons", () => {
    render(<NavBar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Mentorship")).toBeInTheDocument();
    expect(screen.getByText("Programmes")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Find a mentor")).toBeInTheDocument();
  });

  it("opens and closes the Mentorship menu", () => {
    render(<NavBar />);
    const mentorshipButton = screen.getByText("Mentorship");
    fireEvent.click(mentorshipButton);

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Mentors")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Code of Conduct")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();

    const closeMentorshipButton = screen.getByText("Overview");

    fireEvent.click(closeMentorshipButton);
  });

  it("opens and closes the Programmes menu", () => {
    render(<NavBar />);
    const programmesButton = screen.getByText("Programmes");
    fireEvent.click(programmesButton);

    expect(screen.getByText("Book Club")).toBeInTheDocument();
    expect(screen.getByText("Interview Preparation")).toBeInTheDocument();
    expect(screen.getByText("Study Groups")).toBeInTheDocument();

    const closeProgrammesButton = screen.getByText("Book Club");

    fireEvent.click(closeProgrammesButton);
  });

  it("opens and closes the About Us menu", async () => {
    render(<NavBar />);
    const aboutUsButton = screen.getByText("About Us");
    fireEvent.click(aboutUsButton);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();

    const closeAboutUsButton = screen.getByText("Option 1");

    fireEvent.click(closeAboutUsButton);
  });
});
