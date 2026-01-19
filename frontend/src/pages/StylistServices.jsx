import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Paper,
  Typography,
} from '@mui/material';
import axios from "axios";

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

    const handleToggle = (serviceId) => {
        setSelectedServices((prev) =>
        prev.includes(serviceId)
            ? prev.filter((id) => id !== serviceId)
            : [...prev, serviceId]
        );
    };

    return (
        <Paper sx={{ maxWidth: 400 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
                Services
            </Typography>

            <List>
                {stylist?.services?.map((service) => (
                <ListItem
                    key={service.id}
                    secondaryAction={
                    <Checkbox
                        edge="end"
                        onChange={() => handleToggle(service.id)}
                        checked={selectedServices.includes(service.id)}
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
        </Paper>
    );
};

export default StylistServices;
