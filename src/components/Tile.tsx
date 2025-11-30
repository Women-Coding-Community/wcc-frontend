import { Card, Icon, Typography } from '@mui/material';
import Link from 'next/link';

type TileProps = {
  name: string;
  link: string;
  icon: string;
};

export const Tile = (props: TileProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        height: '100%',
        borderRadius: '12px',
      }}
    >
      <Link
        href={props.link}
        style={{
          textDecoration: 'none',
          padding: '15px',
          textAlign: 'center',
          width: '100%',
          gap: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          baseClassName="material-symbols-outlined"
          sx={{ fontSize: '40px!important', color: 'primary.main' }} //fontsize is not applying
        >
          {props.icon}
        </Icon>
        <Typography variant="h6" color="primary.main">
          {props.name}
        </Typography>
      </Link>
    </Card>
  );
};
