const isLoading = ({children}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
            {children}
        </Box>
    );
}
export default isLoading;