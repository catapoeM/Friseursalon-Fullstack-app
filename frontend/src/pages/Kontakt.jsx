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

import useStore from "../hooks/useStore";
import { useState } from "react";

const ContactPage = () => {
  const {loggedinAdmin} = useStore((state) => state)

  // Default data values
  const [editFormData, setEditFormData] = useState({salonName: '',
     adresse: '', telefon: '', emailAdresse: '',
    openTimeHours: '', closeTimeDays: ''})
  
  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")

  // Handler for toggling edit mode
  const handleEditSaveToggle = () => {
    setIsEditing((prev) => !prev)
    if (isEditing) {
      console.log("save")
    }
  }

  const handleEditClick = (e) => {
    setEditFormData({salonName: e.salonName,
      adresse: e.adresse, telefon: e.telefon, emailAdresse: e.emailAdresse,
      openTimeHours: e.openTimeHours, closeTimeDays: e.closeTimeDays
    })
  }
  
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
                  fullWidth
                  value={editFormData.salonName}
                  helperText={error}
                  error={!!error}
                  onChange={handleEditClick}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  Name: {editFormData.salonName}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Adresse"
                  fullWidth
                  value={editFormData.adresse}
                  helperText={error}
                  error={!!error}
                  onChange={handleEditClick}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center"> 
                  Adresse: {editFormData.adresse}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Telefon"
                  fullWidth
                  value={editFormData.telefon}
                  helperText={error}
                  error={!!error}
                  onChange={handleEditClick}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  <LocalPhoneIcon/> Telefon: {editFormData.telefon}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Email"
                  fullWidth
                  value={editFormData.emailAdresse}
                  helperText={error}
                  error={!!error}
                  onChange={handleEditClick}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  <EmailIcon/> Email: {editFormData.emailAdresse}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Öffnungszeiten"
                  fullWidth
                  value={editFormData.openTimeHours}
                  helperText={error}
                  error={!!error}
                  onChange={handleEditClick}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  Öffnungszeiten: {editFormData.openTimeHours}
                </Typography>
                )
              }
              {
                isEditing ? (
                <TextField
                  label="Geschlossen"
                  fullWidth
                  value={editFormData.closeTimeDays}
                  helperText={error}
                  error={!!error}
                  onChange={handleEditClick}
                  size="small"
                />
                ) : (
                <Typography variant="h6" fontWeight="bold"
                  textAlign="center">
                  Geschlossen: {editFormData.closeTimeDays}
                </Typography>
                )
              }
              {
                loggedinAdmin && (
                  <Button variant={isEditing ? 'contained' : 'outlined'} color={isEditing ? 'secondary' : 'primary'} onClick={handleEditSaveToggle}>
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