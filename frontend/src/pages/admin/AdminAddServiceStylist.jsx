import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import useStore from "../../hooks/useStore";
import { servicesRules } from "../../utils/form-rules";

import { validateField } from "../../utils/validateRules";

const AddServicesStylist = () => {
    const {addServiceToStylist, raiseAlert} = useStore((state) => state)
    const {stylistId} = useParams();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ serviceName: '', duration: undefined, price: undefined, clientType: '' });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}))

        const error = validateField(value, servicesRules[name])
        setErrors((prev) => ({...prev, [name]: error}))
    };
        
    const handleSubmit = async () => {
        const newErrors = {};
        Object.keys(servicesRules).forEach((field) => {
            const error = validateField(formData[field], servicesRules[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const ok = await addServiceToStylist(formData, stylistId);

        if (ok) {
            // custom alert
            raiseAlert({
                title: 'Success!',
                text: 'Der Service wurde dem Stylisten erfolgreich hinzugefügt.'
            })
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'Der Service konnte nicht hinzugefügt werden.',
                severity: 'warning'
            })
        }
    }
    
    return (
        <Paper sx={{p: 4, maxWidth: 600}}>
            <Stack spacing={3}>
                <Typography variant="h5">
                    Service zum Stylisten hinzufügen
                </Typography>

                <TextField
                    label="Service Name"
                    name="serviceName"
                    type="text"
                    value={formData.serviceName}
                    onChange={handleChange}
                    error={!!errors.serviceName}
                    helperText={errors.serviceName}
                />

                <TextField
                    label="Dauer (min)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    error={!!errors.duration}
                    helperText={errors.duration}
                />

                <TextField
                    label="Preis (€)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                />

                <TextField
                    label="Kunde Typ (Woman/Man/Child)"
                    name="clientType"
                    type="text"
                    value={formData.clientType}
                    onChange={handleChange}
                    error={!!errors.clientType}
                    helperText={errors.clientType}
                />
                
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon/>}
                        onClick={handleSubmit}
                    >
                        Speichern
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default AddServicesStylist;
