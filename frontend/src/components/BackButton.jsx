import {Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const label = 'Zurück', fallbackPath = '/';
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <Button
        data-cy="back"
        onClick={handleBack}
        aria-label="zurück"
        size="large"
    >
        <ArrowBackIcon />
        <Box>
            <Typography variant="h6">
                {label}
            </Typography>
        </Box>
    </Button>
  );
}

export default BackButton
