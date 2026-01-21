import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Checkbox,
  Paper,
  Typography,
  Grid,
  CardMedia,
} from '@mui/material';
import axios from "axios";
import BackButton from "../components/BackButton";

const StylistServices = () => {
    const {stylistId} = useParams() 
    const [stylist, setStylist] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
        const stored = sessionStorage.getItem('stylists');

        if (stored) {
            const stylists = JSON.parse(stored);
            const found = stylists.find(s => s._id === stylistId)

            if (found) {
                setStylist(found);
                return;
            }

            // Fallback : Go to the previous page
            console.log('FallBack muss implementiert werden!')
        }
    }, [stylistId])

    const handleToggle = (index) => {
        setSelectedServices((prev) =>
        prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
    };

    const selected = selectedServices.map((index) => 
        stylist?.services?.[index]).filter(Boolean);

    const totalPrice = selected.reduce(
        (sum, s) => sum + s.price,
        0
    );

    const totalDuration = selected.reduce(
        (sum, s) => sum + s.duration,
        0
    );

    
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', px: 2, py: 4 }}>
            <Grid container justifyContent={"center"}>
                <Grid item xs={12}>
                    <Grid container justifyContent={"center"}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h6">
                                Gesamtpreis: € {totalPrice} • Gesamtzeit: {totalDuration} min
                            </Typography>
                        </Paper>
                    </Grid>
                    <Paper elevation={10} sx={{ p: 7 }}>
                        <BackButton
                        label="Stylist auswählen"
                        fallbackPath="/stylists"
                        />  
                        <Typography variant="h6" align="center" sx={{ p: 2 }}>
                            Services
                        </Typography>
                        <List>
                            {stylist?.services?.map((service, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={() => handleToggle(index)}
                                    checked={selectedServices.includes(index)}
                                />
                                }
                                disablePadding
                            >
                                <ListItemText
                                    sx={{ pl: 2 }}
                                    primary={service.serviceName}
                                    secondary={`€${service.price} • ${service.duration}`}
                                />
                            </ListItem>
                            ))}
                        </List>
                            <CardMedia component="img" 
                            image={stylist.name} sx={{
                                width: '100%',     // take full width of parent
                                height: 'auto',    // maintain aspect ratio
                                objectFit: 'cover' // crop if needed
                            }}/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StylistServices;
