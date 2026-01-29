import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, TextField, Button, Stack, Alert, Link as MuiLink } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import AlertCard from '../components/AlertCard';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

const AdminLoginPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
=======
import {useForm} from 'react-hook-form';
import { loginRules } from '../utils/form-rules';
import {useNavigate} from 'react-router-dom';
import { login } from '../auth/authService';

const TEST_CREDENTIALS = {
  email: "cata@adm.com",
  password: "12345678"
};


const AdminLoginPage = () => {
    
    const navigate = useNavigate();
>>>>>>> Stashed changes
=======
import {useForm} from 'react-hook-form';
import { loginRules } from '../utils/form-rules';
import {useNavigate} from 'react-router-dom';
import { login } from '../auth/authService';

const TEST_CREDENTIALS = {
  email: "cata@adm.com",
  password: "12345678"
};


const AdminLoginPage = () => {
    
    const navigate = useNavigate();
>>>>>>> Stashed changes
=======
import {useForm} from 'react-hook-form';
import { loginRules } from '../utils/form-rules';
import {useNavigate} from 'react-router-dom';
import { login } from '../auth/authService';

const TEST_CREDENTIALS = {
  email: "cata@adm.com",
  password: "12345678"
};


const AdminLoginPage = () => {
    
    const navigate = useNavigate();
>>>>>>> Stashed changes
=======
import {useForm} from 'react-hook-form';
import { loginRules } from '../utils/form-rules';
import {useNavigate} from 'react-router-dom';
import { login } from '../auth/authService';

const TEST_CREDENTIALS = {
  email: "cata@adm.com",
  password: "12345678"
};


const AdminLoginPage = () => {
    
    const navigate = useNavigate();
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
    const onSubmit = (formData) => {
        try {
            const credentials = formData;
            login(credentials);
            setAlert({type: 'success', message: 'Admin logged-in successfully!'})
<<<<<<< Updated upstream
>>>>>>> Stashed changes
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setAlert({
                type: 'error', message: err.response?.data?.message || 'Login failed!'
            })
<<<<<<< Updated upstream
            setSuccess('');
=======
>>>>>>> Stashed changes
=======
=======
    const onSubmit = (formData) => {
        try {
            const credentials = formData;
            login(credentials);
            setAlert({type: 'success', message: 'Admin logged-in successfully!'})
>>>>>>> Stashed changes
=======
    const onSubmit = (formData) => {
        try {
            const credentials = formData;
            login(credentials);
            setAlert({type: 'success', message: 'Admin logged-in successfully!'})
>>>>>>> Stashed changes
        } catch (err) {
            setAlert({
                type: 'error', message: err?.response?.data?.error || 'Login failed!'
            })
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
                        <TextField
                            //label="Email"
                            defaultValue={TEST_CREDENTIALS.email}
                            {...register("email", loginRules.email)}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            name="email"
                            type="email"
                            fullWidth
                        />

                        <TextField
                            //label="Password"
                            defaultValue={TEST_CREDENTIALS.password}
                            {...register("password", loginRules.password)}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            name="password"
                            type="password"
                            fullWidth
                        />
>>>>>>> Stashed changes

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
