import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from '@mui/material';

export default function StylistActionDialog({
  open,
  stylist,
  onClose,
  onEdit,
  onDeactivate,
  onAddService
}) {
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
          <Button variant="contained" onClick={onEdit}>
            Edit
          </Button>

          <Button variant="outlined" color="warning" onClick={onDeactivate}>
            Deactivate Stylist
          </Button>

          <Button variant="text" onClick={onAddService}>
            Add Service
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
