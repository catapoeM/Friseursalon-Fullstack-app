import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Stack, Alert, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import AlertCard from '../components/AlertCard';
import { loginRules } from '../utils/form-rules';
import { useNavigate } from 'react-router-dom';

import {useForm} from 'react-hook-form';
import useStore from '../hooks/useStore';

const TEST_CREDENTIALS = {
  email: "cata@adm.com",
  password: "12345678"
};
const AdminLoginPage = () => {
    
    const {adminLogin, raiseAlert} = useStore((state) => state);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    });

    const handleLoginSubmit = async (formData) => {
        // Daten an Methoden Zustand-store übergeben
        const ok = await adminLogin(formData)
        console.log(formData, ' form data')
        console.log(ok, ' ok')
        if (ok) {
            // custom alert
            raiseAlert({
                title: 'Success!',
                text: 'Admin logged-in successfully!'
            })
            navigate('/admindashboard')
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'Admin cannot be logged in!',
                severity: 'warning'
            })
        }
    };

    return (
        <>
            <AuthLayout>
                <Typography variant="h4" align="center" mb={3}>
                    Admin Login
                </Typography>
                <form onSubmit={handleSubmit(handleLoginSubmit)}>
                    <Stack spacing={3}>
                        <TextField
                            defaultValue="cata2@adm.com"
                            //label="Email"
                            {...register('email', loginRules.email)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            name="email"
                            type="email"
                            fullWidth
                        />

                        <TextField
                            defaultValue="123456789"
                            //label="Password"
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
