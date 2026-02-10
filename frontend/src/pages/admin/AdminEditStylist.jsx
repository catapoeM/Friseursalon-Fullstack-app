import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, IconButton, Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const StylistServices = () => {
    const [editingId, setEditingId] = useState(null);
    const [stylist, setStylist] = useState([]);

    const [rows, setRows] = useState(() => {
        const stored = sessionStorage.getItem('stylistEdit');
        if (stored) {
            const parsedData = JSON.parse(stored);
            const services = parsedData.services;
            return services ? services : 'No services available'
        }
    });
    
    // Zustand für den aktuellen Wert im Formular
    const [editFormData, setEditFormData] = useState({ serviceName: '', duration: '', price: '', clientType: '' });
    
    const handleEditClick = (row) => {
        console.log(row)
        setEditingId(row._id);
        setEditFormData({ name: row.serviceName, duration: row.duration, price: row.price, client: row.clientType });
    };
        
    const handleSaveClick = (id) => {
        setRows(rows.map(row => (row._id === id ? { ...row, ...editFormData } : row)));
        setEditingId(null);
    }

    const handleInputChange = () => {
        console.log("handle input change")
    }
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Preis</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Client Type</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row._id}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>
                        {editingId === row._id ? (
                        <TextField
                            name="name"
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
                            type="number"
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
