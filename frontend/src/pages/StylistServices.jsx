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
  Card,
} from '@mui/material';
import axios from "axios";
import BackButton from "../components/BackButton";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import EuroIcon from '@mui/icons-material/Euro';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FaceIconMan from '@mui/icons-material/Face';
import FaceIconWoman from '@mui/icons-material/Face3';
import ChildIcon from '@mui/icons-material/ChildCare';

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
        <Box sx={{ px: 2, py: 4 }}>
            <Grid container justifyContent={"center"}>
                <Grid item xs={12} md={8} lg={6} sx={{display: 'flex'}} justifyContent={"center"}>
                    <Paper elevation={4} sx={{
                                width: '50%',
                                minHeight: {xs: 'auto', md: 600},
                                p: { xs: 2, sm: 3 },
                                gap: 2,
                            }}
                        >
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                            <Box  
                                sx={{
                                    position: 'relative',
                                    width: '50%',
                                    maxWidth: 700,
                                }}
                            >
                            <Box 
                                sx={{
                                    position: 'absolute',
                                    left: 16,               // Abstand vom linken Rand IN der Box
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 2,
                                }}
                            >
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                <BackButton
                                    label="Stylist auswählen"
                                    fallbackPath="/stylists"
                                />
                            </Box>
                            <Box
                                component="img"
                                src={stylist.photo}
                                alt={stylist.name}
                                justifyContent={"center"}
                                sx={{
                                    width: '100%',
                                    aspectRatio: '16 / 12',
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                }}
                            />
                            </Box>
                        </Box>
                        <Typography variant="h5" align="center">
                            {stylist.name}
                        </Typography>
                            {/* Bio */}
                        <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 1
                        }}
                        >
                        {stylist.bio}
                        </Typography>
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                <Typography variant="h5">
                                    Gesamtpreis: <EuroIcon fontSize="small"/> {totalPrice} 
                                    <br/> 
                                    Gesamtzeit: <AccessAlarmIcon fontSize="small"/> {totalDuration} min
                                </Typography>
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                Services <ContentCutIcon/>
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
                                        primary={<Typography>
                                            {service.clientType === 'Man' ? (
                                                <>
                                                    <FaceIconMan fontSize="small"/>
                                                </>
                                            ) : service.clientType === 'Woman' ? (
                                                <>
                                                    <FaceIconWoman fontSize="small"/>
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    <ChildIcon fontSize="small"/>
                                                </>
                                            )}
                                            {service.serviceName}
                                        </Typography>
                                        }
                                        secondary={
                                        <Typography variant="h6">
                                            
                                            {service.price}<EuroIcon fontSize="small"/>- 
                                            <AccessAlarmIcon fontSize="small"/>{service.duration} min
                                        </Typography>}
                                    />
                                </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StylistServices;
