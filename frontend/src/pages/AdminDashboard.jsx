import { useEffect, useState } from "react";
import {Grid, Card, CardContent, CardActionArea, Typography, Box, CardMedia, CircularProgress, Alert} from "@mui/material"

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

  // ⛔ Safety Guard (falls kein Stylist)
  if (!stylists) {
    console.log(stylists, ' no stylists')
    return null;
  }

  const editStylist = (stylist) => {
    console.log(stylist, ' edit stylist')
  };

  return (
      <Grid container spacing={2} justifyContent={"center"} xs={12}>
        {stylists?.map(stylist => (
          <Grid item xs={12} sm={6} md={4} key={stylist?._id}>
            <Card sx={{ maxWidth: 320, width: '100%' }}>
              <CardActionArea onClick={() => editStylist(stylist?._id)}>
                <CardMedia 
                  component="img"         // Höhe fixieren
                  image={stylist?.photo}
                  alt={stylist?.name}
                  sx={{ 
                    aspectRatio: '16/12',
                    objectFit: 'cover', 
                    borderRadius: 2,
                  }}
                />
                <CardContent >
                  <Typography variant="h5" align="center">{stylist?.name}</Typography>
                  <Typography variant="body2" align="center" sx={{mt:1}}>{stylist?.bio}</Typography>
                  <Typography variant="h6" sx={{mt: 1}} align="center">Services:</Typography>
                  {stylist?.services?.map(service => (
                    <Typography key={service?._id} variant="body2" align="center">
                      {service?.serviceName} - €{service?.price}
                    </Typography>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
  );
}

export default AdminDashboard;