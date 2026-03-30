import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Card,
  Button
} from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { validateInputFieldBio } from "../utils/validateRules";
import { editContactRules } from "../utils/form-rules";

import useStore from "../hooks/useStore";
import { useState } from "react";

const ContactPage = () => {
  const {loggedinAdmin,  editKontaktDataSave} = useStore((state) => state)

  // Default data values
  const [formData, setFormData] = useState({salonName: '',
     adresse: '', phone: '', email: '',
    openTime: '', closeTime: ''})
  const [errors, seterrors] = useState({salonName: '',
      adresse: '', phone: '', email: '',
    openTime: '', closeTime: ''})
  
  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false)

  // Handler for toggling edit mode
  const  handleSaveToggle = async() => {
    setIsEditing((prev) => !prev)
    // Daten an Methoden Zustand-store übergeben
    const ok = await editKontaktDataSave(formData)
    if (!ok) {
      // custom alert
      return raiseAlert({
          title: 'Fast geschafft...', 
          text: 'Kontakt Data cannot be Changed!',
          severity: 'warning'
      })
    }
    // custom alert
    raiseAlert({
        title: 'Success!',
        text: 'Kontakt Data Changed successfully!'
    })
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData(prev => ({...prev, [name]: value }))
    // This sets the errors by validating the 'editcontactrules' using the function 'validateInputFieldBio'
    seterrors(prev => ({...prev, [name]: validateInputFieldBio(value, editContactRules[name])}))
  }

  const isFormValid = Object.values(errors).every(error => error === '')
  
  return (
    <Box
    sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
    }}
    >
    <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
          <Card
            sx={{ p: 10, height: "100%", display: "flex", flexDirection: "column" }}
            >
            <Stack spacing={4}>
              <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
              >
                Kontakt
              </Typography>
              {
                isEditing ? (
                <TextField
                  label="Name"
                  name="salonName"
                  fullWidth
                  value={formData.salonName}
                  helperText={errors.salonName}
                  error={!!errors.salonName}
                  onChange={handleChange}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  Name: {formData.salonName}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Adresse"
                  name="adresse"
                  fullWidth
                  value={formData.adresse}
                  helperText={errors.adresse}
                  error={!!errors.adresse.toString()}
                  onChange={handleChange}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center"> 
                  Adresse: {formData.adresse}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Telefon"
                  name="phone"
                  fullWidth
                  value={formData.phone}
                  helperText={errors.phone}
                  error={!!errors.phone.toString()}
                  onChange={handleChange}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  <LocalPhoneIcon/> Telefon: {formData.phone}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  helperText={errors.email}
                  error={!!errors.email.toString()}
                  onChange={handleChange}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  <EmailIcon/> Email: {formData.email}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Öffnungsz. z.B.'HH:MM-HH:MM'"
                  fullWidth
                  name="openTime"
                  value={formData.openTime}
                  helperText={errors.openTime}
                  error={!!errors.openTime.toString()}
                  onChange={handleChange}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  Öffnungszeiten: {formData.openTime}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Geschlossen z.B 'Mo,Di,Mi'"
                  fullWidth
                  name="closeTime"
                  value={formData.closeTime}
                  helperText={errors.closeTime}
                  error={!!errors.closeTime.toString()}
                  onChange={handleChange}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  Geschlossen: {formData.closeTime}
                </Typography>
                )
              }
              {
                loggedinAdmin && (
                  <Button disabled={!isFormValid} variant={isEditing ? 'contained' : 'outlined'} color={isEditing ? 'secondary' : 'primary'} onClick={ handleSaveToggle}>
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                )
              }
            </Stack>
          </Card>
        </Stack>
    </Container>
    </Box>
  );
}

export default ContactPage