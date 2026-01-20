import {Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function BackButton({
  label = 'Zurück',
  fallbackPath = '/'
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <Button
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
