import {  } from "react-router-dom";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, IconButton, Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import useStore from "../../hooks/useStore";
import { editServicesRules } from "../../utils/form-rules";

const validateField = (value, rules) => {
    if (!rules) return null;

    if (rules.required && !value) {
        return rules.required;
    }

    if (rules.minLength && value.length < rules.minLength.value) {
        return rules.minLength.message;
    }

    if (rules.min && Number(value) < rules.min.value) {
        return rules.min.message;
    }

    return null;
};

const StylistServices = () => {
    const {editStylistServices, raiseAlert} = useStore((state) => state)
    const [editingId, setEditingId] = useState(null);
    const [stylistId, setStylistId] = useState()
    const [errors, setErrors] = useState({});

    const [editFormData, setEditFormData] = useState({ serviceName: '', duration: null, price: null, clientType: '' });
  
    const [rows, setRows] = useState(() => {
        const stored = sessionStorage.getItem('stylistEdit');
        if (stored) {
            const parsedData = JSON.parse(stored);
            setStylistId(parsedData._id);
            const services = parsedData.services;
            return services ?? []
        }
    });

    const handleEditClick = (row) => {
        setEditingId(row._id);
        setEditFormData({ serviceName: row.serviceName, duration: row.duration, price: row.price, clientType: row.clientType });
    };
        
    const handleSaveClick = async (id) => {
         const newErrors = {};
        Object.keys(editServicesRules).forEach((field) => {
            const error = validateField(editFormData[field], editServicesRules[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        setRows(rows.map(row => (row._id === id ? { ...row, ...editFormData } : row)));
        const ok = await editStylistServices(editFormData, id, stylistId)
        setEditingId(null);
        if (ok) {
            // custom alert
            raiseAlert({
                title: 'Success!',
                text: 'The Service of the stylist has been successfully updated!'
            })
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'The Service of the stylist cannot be updated!',
                severity: 'warning'
            })
        }
    }

    // This function is very important for changing the input values of the rows (serviceName, duration, price, clientType)
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEditFormData(prev => ({...prev, [name]: value, }))
        const error = validateField(value, editServicesRules[name]);
        setErrors(prev => ({ ...prev, [name]: error }));
    }
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    {Object.keys(editFormData).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={row._id}>
                    <TableCell>{index + 1}</TableCell>
                    
                    <TableCell>
                        {editingId === row._id ? (
                        <TextField
                            error={!!errors.serviceName}
                            helperText={errors.serviceName} 
                            name="serviceName"
                            type="text"
                            value={editFormData.serviceName}
                            onChange={handleInputChange}
                            size="small"
                        />
                        ) : (
                        row.serviceName
                        )}
                    </TableCell>
                    <TableCell>
                        {editingId === row._id ? (
                        <TextField
                            error={!!errors.duration}
                            helperText={errors.duration} 
                            name="duration"
                            type="number"
                            value={editFormData.duration ?? ""}
                            onChange={handleInputChange}
                            size="small"
                        />
                        ) : (
                        row.duration
                        )}
                    </TableCell>
                    <TableCell>
                        {editingId === row._id ? (
                        <TextField
                            error={!!errors.price}
                            helperText={errors.price}
                            name="price"
                            type="number"
                            value={editFormData.price ?? ""}
                            onChange={handleInputChange}
                            size="small"
                        />
                        ) : (
                        row.price
                        )}
                    </TableCell>
                    <TableCell>
                        {editingId === row._id ? (
                        <TextField
                            error={!!errors.clientType}
                            helperText={errors.clientType}
                            name="clientType"
                            type="text"
                            value={editFormData.clientType ?? ""}
                            onChange={handleInputChange}
                            size="small"
                        />
                        ) : (
                        row.clientType
                        )}
                    </TableCell>
                    <TableCell>
                        {editingId === row._id ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSaveClick(row._id)}
                        >
                            Speichern
                        </Button>
                        ) : (
                        <IconButton onClick={() => handleEditClick(row)}>
                            <EditIcon />
                        </IconButton>
                        )}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StylistServices;
