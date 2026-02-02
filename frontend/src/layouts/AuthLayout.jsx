import { Paper, Grid} from '@mui/material';

const AuthLayout = ({children}) => {
    return (
        <Grid container spacing={2} justifyContent={"center"} 
            sx={{
                height: "100%",
                width: "100%"
            }} 
        >
            <Paper sx={{ p: 6, width: '100%', maxWidth: 500 }}>
                {children}
            </Paper>
        </Grid>
    )
}

export default AuthLayout;