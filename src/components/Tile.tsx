import { Button, Card, Typography } from '@mui/material';
import Link from 'next/link';

type TileProps = {
  name: string;
  link: string;
  icon: string;
  onTileClick?: () => void;
};

export default function Tile(props: TileProps) {
  return (
    <Card
      style={{
        display: 'flex',
        alignContent: 'center',
        height: '100%',
        borderRadius: '10px',
      }}
    >
      <Button onClick={props.onTileClick} style={{ width: '100%' }}>
        <Link
          href={props.link}
          style={{
            textDecoration: 'none',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <Typography
            className="material-symbols-outlined"
            color="primary.main"
            style={{ fontSize: '40px' }}
          >
            {props.icon}
          </Typography>
          <Typography variant="h6" color="primary.main">
            {props.name}
          </Typography>
        </Link>
      </Button>
    </Card>
  );
}
