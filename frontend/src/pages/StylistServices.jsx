import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Stack,
  Button,
  TableCell,
  TableRow,
  TableHead,
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
    const navigate = useNavigate()
    const {stylistId} = useParams() 
    const [stylist, setStylist] = useState([]);
    const [selectedServicesIds, setselectedServicesIds] = useState([]);

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

    const handleToggle = (serviceId) => {
        setselectedServicesIds((prev) => 
        Array.isArray(prev)
        ?   prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId)
                : [...prev, serviceId]
                :[serviceId]
        );
    };

    useEffect(() => {
        console.log(selectedServicesIds, ' selectedServicesIds')
    }, [selectedServicesIds])

    const services = stylist?.services ?? [];

    const selected = services.filter(service =>
        selectedServicesIds.includes(service._id)
    )

    const totalDuration = selected.reduce(
        (sum, service) => sum + service.duration,
        0
    );

    const totalPrice = selected.reduce(
        (sum, service) => sum + service.price,
        0
    );

    const toCalendar = (selectedIds) => {
        sessionStorage.setItem('stylistCalendarServices', JSON.stringify(selectedIds))
        navigate('/calendar/' + stylistId)
    }

    
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
                                {stylist?.services?.map((service) => (
                                <ListItem 
                                    key={service._id}
                                    secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={() => handleToggle(service._id)}
                                        checked={selectedServicesIds.includes(service._id)}
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
                                <Stack spacing={1} width="100%">
                                    <Button variant="outlined" onClick={() => {toCalendar(selectedServicesIds)}}>
                                        Go to calendar
                                    </Button>
                                </Stack>
                            </List>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StylistServices;
