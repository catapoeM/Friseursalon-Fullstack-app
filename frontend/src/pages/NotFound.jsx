import { Link, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router';

// Not Found Image importieren
import notFoundImage from '../assets/404.gif';

// Bild und Text als Link anzeigen -> zur Startseite
const NotFound = () => {
  return (
    <Link component={RouterLink} to="/">
      <Stack alignItems="center" justifyContent="center">
        <img
          style={{ width: '50%' }}
          src={notFoundImage}
          alt="Bild für HTTP 404-Fehler. Durch Klick kommt man zur Startseite"
        />
        <Typography variant="h6">Zurück zur Startseite</Typography>
      </Stack>
    </Link>
  );
};

export default NotFound;
