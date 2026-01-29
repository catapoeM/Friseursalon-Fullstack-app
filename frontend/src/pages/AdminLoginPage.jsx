import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Stack, Alert, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import AlertCard from '../components/AlertCard';
import {useForm} from 'react-hook-form';
import { loginRules } from '../utils/form-rules';
import { login } from '../auth/authService';

const TEST_CREDENTIALS = {
  email: "cata@adm.com",
  password: "12345678"
};
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
        setAlert("")
        console.log(formData)
        const resLogin = login(formData)
        console.log(resLogin, 'res log')
        if (resLogin) {
            setAlert({type: 'success', message: 'Admin logged-in successfully!'})
            return true
        }else {
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
                            defaultValue={TEST_CREDENTIALS.email}
                            //label="Email"
                            {...register("email", loginRules.email)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            name="email"
                            type="email"
                            fullWidth
                        />

                        <TextField
                            defaultValue={TEST_CREDENTIALS.password}
                            //label="Password"
                            {...register("password", loginRules.password)}
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
