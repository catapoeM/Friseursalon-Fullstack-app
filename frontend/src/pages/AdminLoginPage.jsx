import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Stack, Alert, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import AlertCard from '../components/AlertCard';
import {useForm} from 'react-hook-form';
import { loginRules } from '../utils/form-rules';

const AdminLoginPage = () => {
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        if (!alert.message) {
            return
        }
        const timer = setTimeout(() => {
            setAlert({type: '', message: ''})
        }, 4000);

        return () => clearTimeout(timer)
    },[alert.message])

    const onSubmit = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/admin/login', formData);
            const token = res.data.token;
            localStorage.setItem('token', token);
            setAlert({type: 'success', message: 'Admin logged-in successfully!'})
            return true
        } catch (err) {
            setAlert({
                type: 'error', message: err?.response?.data?.error || 'Login failed!'
            })

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <TextField
                            label="Email"
                            {...register('email', loginRules.email)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            name="email"
                            type="email"
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            {...register('password', loginRules.password)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            name="password"
                            type="password"
                            fullWidth
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
