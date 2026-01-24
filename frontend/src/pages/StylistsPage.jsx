import { useEffect, useState } from "react";
import {Grid, Card, CardContent, CardActionArea, Typography, Box, CardMedia, CircularProgress} from "@mui/material"
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const StylistsPage = () => {
  const [stylists, setStylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(stylists)
  const navigate = useNavigate();

  // Initialisieren (läuft einmal)
  useEffect(() => {
      const fetchStylists = async () => {
        try{
          const res = await axios.get("http://localhost:5000/api/stylists")
          setStylists(res.data)
        }catch(err) {
          setError('Could not load stylist', err)
        }finally {
          setIsLoading(false);
        }
      }

      fetchStylists();
  }, []);

  // Speichern (läuft bei Änderungen)
  useEffect(() => {
    if (stylists.length > 0) {
      sessionStorage.setItem('stylists', JSON.stringify(stylists))
    }
  }, [stylists])

  // ⛔ Loading State
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  // ⛔ Error State
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  // ⛔ Safety Guard (falls kein Stylist)
  if (!stylists) {
    return null;
  }

  const goToStylistPageClick = (stylist) => {
    navigate(`/stylists/${stylist._id}`)
  };

  return (
      <Grid container spacing={2} justifyContent={"center"} xs={12}>
        {stylists?.map(stylist => (
          <Grid item xs={12} sm={6} md={4} key={stylist._id}>
            <Card sx={{ maxWidth: 320, width: '100%' }}>
              <CardActionArea onClick={() => goToStylistPageClick(stylist)}>
                <CardMedia 
                  component="img"         // Höhe fixieren
                  image={stylist.photo}
                  alt={stylist.name}
                  sx={{ 
                    aspectRatio: '16/12',
                    objectFit: 'cover', 
                    borderRadius: 2,
                  }}
                />
                <CardContent >
                  <Typography variant="h5" align="center">{stylist.name}</Typography>
                  <Typography variant="body2" align="center" sx={{mt:1}}>{stylist.bio}</Typography>
                  <Typography variant="h6" sx={{mt: 1}} align="center">Services:</Typography>
                  {stylist.services.map(service => (
                    <Typography key={service._id} variant="body2" align="center">
                      {service.serviceName} - €{service.price}
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