import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GroupCard, GroupCardProps } from "components/GroupCard";

describe("GroupCard Component", () => {
    const defaultProps: GroupCardProps = {
        title: "Data Science Study Group",
        description: "A study group focused on AI and Data Science concepts.",
        participants: 10,
        tags: false,
        tagText: "",
        link: "",
        mentor: "John Doe",
        uri: "https://example.com",
        bgColor: "#C7E7FF",
    };

    it("renders the title correctly", () => {
        render(<GroupCard {...defaultProps} />);
        expect(screen.getByText("Data Science Study Group")).toBeInTheDocument();
    });

    it("renders the description", () => {
        render(<GroupCard {...defaultProps} />);
        expect(screen.getByText("A study group focused on AI and Data Science concepts.")).toBeInTheDocument();
    });

    it("renders the mentor name with a link", () => {
        render(<GroupCard {...defaultProps} />);
        const mentorLink = screen.getByRole("link", { name: /John Doe/i });
        expect(mentorLink).toHaveAttribute("href", "https://example.com");
        expect(mentorLink).toHaveAttribute("target", "_blank");
        expect(mentorLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders the correct number of participants", () => {
        render(<GroupCard {...defaultProps} />);
        expect(screen.getByText("Participants: 10")).toBeInTheDocument();
    });

    it("renders tag text when tags are enabled", () => {
        render(<GroupCard {...defaultProps} tags={true} tagText="#AI #Tech" />);
        expect(screen.getByText("#AI #Tech")).toBeInTheDocument();
    });

    it("renders link when tags are enabled", () => {
        render(<GroupCard {...defaultProps} tags={true} link="LinkedIn Post" />);
        const linkElement = screen.getByRole("link", { name: /LinkedIn Post/i });
        expect(linkElement).toHaveAttribute("href", "https://example.com");
    });

    it("does not render the mentor section if tags are enabled", () => {
        render(<GroupCard {...defaultProps} tags={true} />);
        expect(screen.queryByText("Mentor:")).not.toBeInTheDocument();
    });
});
