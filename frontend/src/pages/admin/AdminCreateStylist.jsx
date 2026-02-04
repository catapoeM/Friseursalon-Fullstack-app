import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography
} from '@mui/material';

import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const CreateStylist = () => {
    const APIURL = import.meta.env.VITE_BASE_URL
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await axios.post(APIURL + '/admin/stylist', data)
        navigate('/admindashboard')
    }
    return (
        <Box maxWidth={600} mx="auto">
            <Card>
                <CardContent>
                    <Typography variant='h6'mb={2}>
                        Create New Stylist
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Name"
                            fullWidth
                            margin='normal'
                            {...register('name', {required: true})}
                        />

                        <TextField
                            label="Bio"
                            multiline
                            rows={4}
                            fullWidth
                            margin='normal'
                            {...register('name')}
                        />

                        <Box sx={{mt:2}}>
                            <Button variant='outlined' component="label">
                                Upload Photo
                                <input 
                                    type="file" 
                                    hidden
                                    accept="image/*"
                                    {...register('photo', {required: true})} 
                                />
                            </Button>
                        </Box>
                        
                        <Button
                            type='submit'
                            variant='contained'
                            fullWidth
                            sx={{mt:2}}
                        >
                        Create
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateStylist;