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
              text: 'Der Status des Stylisten wurde erfolgreich geändert!'
          })
          onClose()
      }else {
          // custom alert
          raiseAlert({
              title: 'Fast geschafft...', 
              text: 'Der Status des Stylisten kann nicht geändert werden!',
              severity: 'warning'
          })
      }
    }

    const onEdit = (stylist) => {
      sessionStorage.setItem('stylistEdit', JSON.stringify(stylist))
      navigate('/editservices/' + stylist._id)
    }
    const onAddService = (stylist) => {
      navigate('/addservices/' + stylist._id)
    }
    
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Stylistenaktionen</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Was möchten Sie tun mit <strong>{stylist?.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Stack spacing={1} width="100%">
          <Button variant="contained" onClick={() => onEdit(stylist)}>
            Bearbeitungsservice
          </Button>
          {status ? 
            <Button variant="outlined" color="warning" onClick={() => onChangeStatus(stylist)}>
              Stylist deaktivieren
            </Button> :
            <Button variant="outlined" onClick={() => onChangeStatus(stylist)}>
              Stylist activieren
            </Button>
          }
          <Button variant="text" onClick={() => onAddService(stylist)}>
            Service zum Stylisten hinzufügen
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default StylistActionDialog