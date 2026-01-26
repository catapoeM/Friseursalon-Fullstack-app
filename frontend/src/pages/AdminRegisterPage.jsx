import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import axios from 'axios';

const AdminRegisterPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        adminSecret: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password || !form.adminSecret) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/admin/register', form);
            setSuccess(res.data.message);
            setError('');
            return true// optional: redirect after success
        } catch (err) {
            setError(err.response?.data?.message || 'Register failed');
            setSuccess('');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
            <Paper sx={{ p: 6, width: '100%', maxWidth: 500 }}>
            <Typography variant="h4" align="center" mb={3}>
                Admin Registration
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={handleChange}
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    value={form.password}
                    onChange={handleChange}
                />

                <TextField
                    label="Admin Secret Key"
                    name="adminSecret"
                    type="password"
                    fullWidth
                    value={form.adminSecret}
                    onChange={handleChange}
                    helperText="Required to create an admin account"
                />

                <Button type="submit" variant="contained" size="large">
                    Register
                </Button>
                </Stack>
            </form>
            </Paper>
        </Box>
    );
}

export default AdminRegisterPage;
