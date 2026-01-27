import {Alert, Card, Box} from '@mui/material'

const AlertCard = ({type, message, onClose}) => {
    if (!message) return null;

    return (
        <Box 
            sx={{
                position: 'fixed',
                top: 80,
                right: 24,
                zIndex: 1300,
                width: {xs: '90%', sm: 360},
                right: { xs: '50%', sm: 24 },
                transform: { xs: 'translateX(50%)', sm: 'none' }
            }}
        >
            <Card elevation={6}>
                <Alert 
                    severity={type}
                    onClose={onClose}
                >
                    {message}
                </Alert>
            </Card>
        </Box>
    )
}

export default AlertCard;
