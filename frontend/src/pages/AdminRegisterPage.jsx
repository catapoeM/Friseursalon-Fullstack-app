import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Stack, Alert, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import AlertCard from '../components/AlertCard';
import { useForm } from 'react-hook-form';
import { confirmPasswordRule, registerRules } from '../utils/form-rules';
import { useNavigate } from 'react-router-dom';

const AdminRegisterPage = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({
        type: '',
        message: '',
    })

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors}
    } = useForm({
            mode: 'onChange'
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

    const onSubmit = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/admin/register', formData);
            setAlert({type: 'success', message: 'Admin created successfully!'})
            navigate('/login')
        } catch (err) {
            setAlert({
                type: 'error', message: err?.response?.data?.error || 'Register failed!'
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
                    Admin Registration
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                    <TextField
                    defaultValue="cata2@adm.com"
                        //label="Email"
                        {...register('email', registerRules.email)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        name="email"
                        type="email"
                        fullWidth
                    />

                    <TextField
                        defaultValue="12345678"
                        //label="Password"
                        {...register('password', registerRules.password)}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        name="password"
                        type="password"
                        fullWidth
                    />

                    <TextField
                        defaultValue="12345678"
                        //label="Confirm Password"
                        {...register('confirmPassword', confirmPasswordRule(getValues))}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        name="confirmPassword"
                        type="password"
                        fullWidth
                    />

                    <TextField
                        defaultValue="f§0hV3&aYpAs%Bv74FJ7S3%/!@rz€"
                        //label="Admin Secret Key"
                        {...register('adminSecret', registerRules.adminSecret)}
                        error={!!errors.adminSecret}
                        helperText={errors.adminSecret?.message}
                        name="adminSecret"
                        type="password"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" size="large">
                        Register
                    </Button>
                    <MuiLink component={Link} to="/login" color="inherit" sx={{ ml: 1 }}>
                        Login
                    </MuiLink>
                    </Stack>
                </form>
            </AuthLayout>
        </>
    );
}

export default AdminRegisterPage;
