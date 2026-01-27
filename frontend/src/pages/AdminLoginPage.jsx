import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Stack, Alert, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import AlertCard from '../components/AlertCard';

const AdminLoginPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

    useEffect(() => {
        if (!alert.message) {
            return
        }
        const timer = setTimeout(() => {
            setAlert({type: '', message: ''})
        }, 4000);

        return () => clearTimeout(timer)
    },[alert.message])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/admin/login', form);
            setSuccess(res.data.message);
            setAlert({type: 'success', message: 'Admin logged-in successfully!'})
            setError('');
            localStorage.setItem('token', res.data);
            console.log(res.data)
            return true
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setAlert({
                type: 'error', message: err.response?.data?.message || 'Login failed!'
            })
            setSuccess('');
        }
    };

    return (
        <>
            <AlertCard
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({type: '', message: ''})}
            />
            <AuthLayout>
                <Typography variant="h4" align="center" mb={3}>
                    Admin Login
                </Typography>

                <form onSubmit={handleSubmitLogin}>
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

                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>
                    <MuiLink component={Link} to="/register" color="inherit" sx={{ ml: 1 }}>
                        Register
                    </MuiLink>
                    </Stack>
                </form>
            </AuthLayout>
        </>
    );
}

export default AdminLoginPage;
