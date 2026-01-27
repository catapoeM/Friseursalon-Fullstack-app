import { Box, Paper } from '@mui/material';

const AuthLayout = ({children}) => {
    return (
        <Box sx={{ bgcolor: 'grey.100', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <Paper sx={{ p: 6, width: '100%', maxWidth: 500 }}>
                {children}
            </Paper>
        </Box>
    )
}

export default AuthLayout;