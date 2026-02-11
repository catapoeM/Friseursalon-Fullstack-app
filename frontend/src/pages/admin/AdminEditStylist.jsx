import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, IconButton, Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import useStore from "../../hooks/useStore";

const StylistServices = () => {
    const {editStylistServices, raiseAlert} = useStore((state) => state)
    const [editingId, setEditingId] = useState(null);
    const [stylistId, setStylistId] = useState()

    const [rows, setRows] = useState(() => {
        const stored = sessionStorage.getItem('stylistEdit');
        if (stored) {
            const parsedData = JSON.parse(stored);
            setStylistId(parsedData._id);
            const services = parsedData.services;
            return services ? services : 'No services available'
        }
    });
    
    // Zustand für den aktuellen Wert im Formular
    const [editFormData, setEditFormData] = useState({ serviceName: '', duration: null, price: null, clientType: '' });
    
    useEffect(() => {
        console.log(editFormData, ' editFormData')
    }, [editFormData])

    const handleEditClick = (row) => {
        setEditingId(row._id);
        setEditFormData({ serviceName: row.serviceName, duration: row.duration, price: row.price, clientType: row.clientType });
    };
        
    const handleSaveClick = async (id) => {
        console.log(id, ' id')
        setRows(rows.map(row => (row._id === id ? { ...row, ...editFormData } : row)));
        setEditingId(null);
        console.log(rows, ' save click')
        console.log(editFormData, id, ' editFormData')
        const ok = await editStylistServices(editFormData, id, stylistId)
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
        setEditFormData({
            ...editFormData,
            [name]: value,
        })
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
                {rows.map((row) => (
                    <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    
                    <TableCell>
                        {editingId === row._id ? (
                        <TextField
                            name="serviceName"
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
                            name="duration"
                            type="number"
                            value={editFormData.duration}
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
                            name="price"
                            type="number"
                            value={editFormData.price}
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
                            name="clientType"
                            value={editFormData.clientType}
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
                        <IconButton onClick={() => handleEditClick(row) }>
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
