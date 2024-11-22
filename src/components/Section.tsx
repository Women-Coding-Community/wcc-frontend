type TeamSectionProps = {
  page: {
    title: string;
    subtitle: string;
    description: string;
  };
};
export const Section = ({ page }: TeamSectionProps) => {
  return <div>{page.description}</div>;
};
