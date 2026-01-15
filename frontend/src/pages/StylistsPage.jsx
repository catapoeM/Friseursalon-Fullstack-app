import { useEffect, useState } from "react";
import {Grid, Card, CardContent, CardActionArea, Typography} from "@mui/material"
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const StylistsPage = () => {
  const [stylists, setStylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/stylists")
      .then(res => setStylists(res.data))
      .catch(err => console.error("Fehler beim Laden der Stylisten", err))
  }, []);

  const handleClick = (stylistId) => {
    navigate(`/booking/${stylistId}`);
  };

  return (
    <Grid container spacing={2}>
      {stylists.map(stylist => (
        <Grid item xs={12} sm={6} md={4} key={stylist._id}>
          <Card>
            <CardActionArea onClick={() => handleClick(stylist._id)}>
              <CardContent>
                <Typography variant="h6">{stylist.name}</Typography>
                <Typography variant="body2">{stylist.bio}</Typography>
                <Typography variant="subtitle2">Services:</Typography>
                {stylist.services.map(service => (
                    
                  <Typography key={service._id}>{service.serviceName} - €{service.price}</Typography>
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