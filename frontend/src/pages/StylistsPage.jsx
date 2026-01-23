import { useEffect, useState } from "react";
import {Grid, Card, CardContent, CardActionArea, Typography, Box, CardMedia} from "@mui/material"
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const StylistsPage = () => {
  const LOCALURL = "http://localhost:5000";
  const [stylists, setStylists] = useState([]);
  console.log(stylists)
  const navigate = useNavigate();

  // Initialisieren (läuft einmal)
  useEffect(() => {
    const stored = sessionStorage.getItem("stylists");
    if (stored) {
      setStylists(JSON.parse(stored));
    }else {
      axios.get("http://localhost:5000/api/stylists")
        .then(res => setStylists(res.data))
        .catch(err => console.error("Fehler beim Laden der Stylisten", err))
    }
  }, []);

  // Speichern (läuft bei Änderungen)
  useEffect(() => {
    if (stylists.length > 0) {
      sessionStorage.setItem('stylists', JSON.stringify(stylists))
    }
  }, [stylists])
  

  const goToStylistPageClick = (stylist) => {
    navigate(`/stylists/${stylist._id}`)
  };

  return (
      <Grid container spacing={2} justifyContent={"center"} xs={12}>
        {stylists?.map(stylist => (
          <Grid item xs={12} sm={6} md={4} key={stylist?._id}>
            <Card sx={{ maxWidth: 320, width: '100%' }}>
              <CardActionArea onClick={() => goToStylistPageClick(stylist)}>
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

export default StylistsPage;