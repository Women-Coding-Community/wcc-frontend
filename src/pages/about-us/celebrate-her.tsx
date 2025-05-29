// path: about-us/celebrate-her

import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { GroupCard } from '@components';
import { AboutUsPageData } from '@utils/types';
import { fetchData } from 'lib/api';

interface CelebrateHerPageProps {
  celebrateHer: AboutUsPageData;
}

const CelebrateHerPage: FC<CelebrateHerPageProps> = ({ celebrateHer }) => {
  return (
    <Box>
      {celebrateHer.celebrateHer.lists.map((list, i) => (
        <GroupCard
          key={i}
          bgColor={list.bgColor}
          tags
          title={list.title}
          description={list.description}
          link={list.link}
          tagText={list.tagText}
          uri={list.uri}
        />
      ))}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('about-us/celebrate-her');

    return {
      props: {
        celebrateHer: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};

export default CelebrateHerPage;
