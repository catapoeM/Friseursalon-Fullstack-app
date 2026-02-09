import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from '@mui/material';

import useStore from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';

const StylistActionDialog = ({
  open,
  stylist,
  status,
  onClose
}) => {
    
    const {changeStatusStylist, raiseAlert} = useStore((state) => state)
    const navigate = useNavigate();
  
    const onChangeStatus = async(stylist) => {
    const ok = await changeStatusStylist(stylist);
      if (ok) {
          // custom alert
          raiseAlert({
              title: 'Success!',
              text: 'The status of the stylist has been successfully changed!'
          })
          onClose()
      }else {
          // custom alert
          raiseAlert({
              title: 'Fast geschafft...', 
              text: 'The status of the stylist cannot be changed!',
              severity: 'warning'
          })
      }
    }

    const onEdit = (stylist) => {
      console.log(' edit stylist ')
    }
    const onAddService = (stylist) => {
      console.log(' edit stylist ')
    }
    
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Stylist Actions</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          What would you like to do with <strong>{stylist?.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Stack spacing={1} width="100%">
          <Button variant="contained" onClick={() => onEdit(stylist)}>
            Edit
          </Button>
          {status ? 
            <Button variant="outlined" color="warning" onClick={() => onChangeStatus(stylist)}>
              Deactivate Stylist
            </Button> :
            <Button variant="outlined" onClick={() => onChangeStatus(stylist)}>
              Activate Stylist
            </Button>
          }
          <Button variant="text" onClick={() => onAddService(stylist)}>
            Add Service
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default StylistActionDialog