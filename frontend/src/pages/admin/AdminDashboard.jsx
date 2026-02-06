import { useEffect, useState } from "react";
import {Grid, Card, CardContent, CardActionArea, Typography, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack} from "@mui/material"
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import StylistActionDialog from "../../components/StylistActionDialog";

const AdminDashboard = () => {
  const [stylists, setStylists] = useState([]);

  // Initialisieren (läuft einmal)
  useEffect(() => {
    const getAdminData = sessionStorage.getItem('friseursalon')
    const objAdminData = JSON.parse(getAdminData)
    console.log(objAdminData, ' objAdminData')
    if (objAdminData.loggedinAdmin.length > 0) {
            const stylists = objAdminData.loggedinAdmin;
            if (stylists) {
              console.log(stylists)
                setStylists(stylists);
                return;
            }
        }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

  return `Created At: ${yyyy}-${mm}-${dd} ${hh}:${min}`;
}


  // ⛔ Safety Guard (falls kein Stylist)
  if (!stylists) {
    console.log(stylists, ' no stylists')
    return null;
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState(null);

  const handleOpenDialog = (stylist) => {
    console.log(stylist, ' stylist')
    setSelectedStylist(stylist);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedStylist(null);
    setDialogOpen(false);
  };

 
  

  return (
      <>
        {stylists?.map(stylist => (
          <Grid item xs={12} sm={6} md={4} key={stylist?._id}>
            <Card sx={{ maxWidth: 320, width: '100%'}}>
              <CardActionArea
                // if I want later to make inactive the cards that are inactive in DB
                //disabled={!stylist?.isActive}
                onClick={() => handleOpenDialog(stylist)}>
                <CardMedia 
                  component="img"         // Höhe fixieren
                  image={stylist?.photo}
                  alt={stylist?.name}
                  sx={{ 
                    aspectRatio: '16/12',
                    objectFit: 'cover', 
                    borderRadius: 2
                  }}
                />
                <CardContent >
                  <Typography variant="h5" align="center">{stylist?.name}</Typography>
                  <Typography variant="body2" align="center" sx={{mt:1}}>{stylist?.bio}</Typography>
                  <Typography variant="h6" sx={{mt: 1}} align="center">Services</Typography>
                  {stylist?.services?.map(service => (
                    <Typography key={service?._id} variant="body2" align="center">
                      {service?.serviceName} - €{service?.price}
                    </Typography>
                  ))}
                  <Card sx={{mt: 1}}>
                    <Typography variant="body2">
                      {formatDate(stylist.createdAt)}
                    </Typography>
                      {stylist?.isActive ? 
                        <PersonIcon/>
                        : 
                        <PersonOffIcon/>
                      }
                  </Card>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {/* Dialog nur einmal laden */}
        <StylistActionDialog
          open={dialogOpen}
          stylist={selectedStylist}
          onClose={handleCloseDialog}
          onEdit={() => console.log('Edit', selectedStylist?._id)}
          onDeactivate={() => console.log('Deactivate', selectedStylist?._id)}
          onAddService={() => console.log('Add Service', selectedStylist?._id)}
        />
      </>
  );
}

export default AdminDashboard;