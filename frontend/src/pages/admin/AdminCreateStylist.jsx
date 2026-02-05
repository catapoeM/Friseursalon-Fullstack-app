import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography
} from '@mui/material';

import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import { createStylistRules } from '../../utils/form-rules';
import { photoRules } from '../../utils/form-rules';

import useStore from '../../hooks/useStore';
import { useState } from 'react';

const CreateStylist = () => {
    const {createStylist, raiseAlert} = useStore((state) => state);
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    });
    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("photo", data.photo[0]);
        formData.append("name", data.name);
        formData.append("bio", data.bio);

        console.log(formData, ' data')
        const ok = await createStylist(formData)
        if (ok) {
            // custom alert
            raiseAlert({
                title: 'Success!',
                text: 'Stylist created successfully!'
            })
            navigate('/admindashboard')
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'Stylist cannot be created!',
                severity: 'warning'
            })
        }
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
                            {...register('name', createStylistRules.name)}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            name="name"
                            type="text"
                            fullWidth
                            margin='normal'
                        />

                        <TextField
                            label="Bio"
                            {...register('bio', createStylistRules.bio)}
                            error={!!errors.bio}
                            helperText={errors.bio?.message}
                            name="bio"
                            type="text"
                            fullWidth
                            margin='normal'
                        />

                        <Box sx={{mt:2}}>
                            <Button variant='outlined' component="label">
                                Upload Photo
                                <input 
                                    type="file"
                                    {...register('photo', photoRules)}
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        register('photo').onChange(e);
                                        const file = e.target.files[0]
                                        if (file) {
                                            console.log(file, ' file')
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </Button>
                        </Box>
                        {preview && (
                            <Box mt={2}>
                                <img 
                                    src={preview}
                                    alt='Preview'
                                    style={{width: '100%', maxHeight: 200, objectFit: 'cover'}}
                                />
                            </Box>
                        )}
                        
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