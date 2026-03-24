import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, TextField } from '@mui/material';

import useStore from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const StylistActionDialog = ({
  open,
  setOpen,
  step,
  setStep,
  stylist,
  status,
  onClose
}) => {
    
    const {changeStatusStylist, changeBioStylist, raiseAlert} = useStore((state) => state)
    const navigate = useNavigate();
    const [bioStylist, setBioStylist] = useState()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
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

    // The bio text-edit of the stylist button
    const bioBearbeiten = (stylist) => {
      setStep("bio-edit")
      setBioStylist(stylist.bio)
    }

    // This function sets again the "speichern" button from enabled to disabled
    // Also close the dialog
    const handleClose = () => {
      setIsButtonDisabled(true);
      setOpen(false)
    }

    // This function edits the bio text of the stylist while enables the button again, this way the text can be saved
    const changeText = (text) => {
      setIsButtonDisabled(false);
      setBioStylist(text);
    }

    // Button to save the new text. Send new DATA to Backend and shows if success or not!
    const saveNewText = async() => {
      const ok = await changeBioStylist(stylist, bioStylist);
        if (ok) {
            // custom alert
            raiseAlert({
                title: 'Success!',
                text: 'Der Bio des Stylist wurde erfolgreich gespeichert!'
            })
            onClose()
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'Der Bio des Stylist kann nicht geändert werden!',
                severity: 'warning'
            })
        }
    }
    
  return (  
    // Very important On the 1st STEP it show the Dialog only with few buttons which can edit the stylists
    // On the 2nd STEP after the BIO button is clicked, it will shown only the input with text as value and the "speichern" (save) button
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
    {
      step === "standard" && (
        <>
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
              <Button variant="text" onClick={() => bioBearbeiten(stylist)}>
                Bio bearbeiten
              </Button>
            </Stack>
          </DialogActions>
        </>
      )} 
      { step === "bio-edit" && (
        <>
          <DialogContent>
            <TextField
              label="Text bearbeiten"
              multiline
              rows={5}
              fullWidth
              value={bioStylist}
              onChange={(e) => changeText(e.target.value)
              }
            />
            <Stack spacing={1}>
              <Button variant='contained' disabled={isButtonDisabled} onClick={() => saveNewText()}>
                Speichern
              </Button>
            </Stack>
          </DialogContent>
        </>
      ) 
    }
    </Dialog>
  );
}

export default StylistActionDialog