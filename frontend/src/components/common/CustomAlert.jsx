import { Snackbar, Alert, AlertTitle } from '@mui/material';
import useStore from '../../hooks/useStore';
 
const CustomAlert = () => {
  const { alertProps, destroyAlert } = useStore((state) => state);
 
  return (
    <Snackbar
      open={Boolean(alertProps)}
      autoHideDuration={alertProps?.duration ?? 5000}
      onClose={destroyAlert}
      anchorOrigin={{
        vertical: alertProps?.vertical ?? 'top',
        horizontal: alertProps?.horizontal ?? 'right',
      }}
      sx={{ mt: 8 }}
    >
      <Alert variant={alertProps?.variant ?? 'filled'} severity={alertProps?.severity ?? 'success'}>
        {alertProps?.title && <AlertTitle>{alertProps?.title}</AlertTitle>}
        {alertProps?.text ?? ''}
      </Alert>
    </Snackbar>
  );
};
 
export default CustomAlert;