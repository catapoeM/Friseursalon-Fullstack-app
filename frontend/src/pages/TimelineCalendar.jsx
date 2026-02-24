import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { Box, Stack, Typography, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSessionStorageState } from '../hooks/useStorageState';
import useStore from '../hooks/useStore';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {minutesToHours, filterByDateKey, extractStartEndHours} from '../utils/booking'
import { areNumbersConsecutive, extractKeysValuesFromArrayOfObjects, removeValuesInRangesFromArray, sort } from '../hooks/helperFunctions';
import { emailRules, phoneRules, registerRules, clientTypeRules } from '../utils/form-rules';

const TimelineCalendar = () => {
    const {getStylistBookings, createBooking, raiseAlert} = useStore((state) => state)
    const {stylistId} = useParams();

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(dayjs(today));
    const [choosenHours, setChoosenHours] = useState([])

    const [selectedServicesIds, setselectedServicesIds] = useSessionStorageState("selectedServicesIds", [])
    const [totalDuration, setTotalDuration] = useSessionStorageState("totalDuration", 0)
    const [totalPrice, setTotalPrice] = useSessionStorageState("totalPrice", 0)

    
    const [buttonHours, setButtonHours] = useState(Array.from({length: 9}, (_, index) => index + 10)) 
    const [dbData, setDbData] = useState(null)
    
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    });
    

    useEffect( () => {
        const getAsyncData = async() => {
            const response = await getStylistBookings(stylistId);
            if (!response) {
                // custom alert
                raiseAlert({
                    title: 'Fast geschafft...', 
                    text: 'The free slots of the stylist cannot be updated',
                    severity: 'warning'
                })
                return
            }
            setDbData(response.data);
        }

        getAsyncData()
        if (!dbData) {
            return
        }
        const keysToGet = ["startHour", "endHour"];
        const todayAppointments = filterByDateKey(dbData, "date", selectedDate.format("YYYY-MM-DD"))
        const startEnd = extractKeysValuesFromArrayOfObjects(keysToGet, todayAppointments)
        // Its making the array shorter, because we will need only the start and the end for the next step
        
        const startHours = extractStartEndHours(startEnd, "startHour")
        const endHours = extractStartEndHours(startEnd, "endHour")
        
        const initialHours = Array.from({length: 9}, (_, index) => index + 10)

        const freeHours = removeValuesInRangesFromArray(initialHours, startHours, endHours)
        
        setButtonHours(freeHours)
    }, [selectedDate, stylistId])

    const handleHourClick = (hour) => {
        setChoosenHours(prev => 
            prev.includes(hour)
            ? prev.filter(h => h !== hour)
            : [...prev, hour]
        )
    }

    const totalDurationHours = minutesToHours(totalDuration)
    const countHoursLeft = totalDurationHours;
    const checkConsecutiveNumbers = areNumbersConsecutive(choosenHours);
    const canShowForm = choosenHours.length === countHoursLeft && checkConsecutiveNumbers && countHoursLeft > 0

    const handleCreateBooking = async(formData) => {
        const startEndBookedHour = sort(choosenHours)
        formData.startHour = startEndBookedHour[0]
        formData.endHour = startEndBookedHour[startEndBookedHour.length - 1]
        formData.date = selectedDate.format("YYYY-MM-DD");
        formData.serviceId = selectedServicesIds;
        console.log(formData, ' formaDAta')
        const ok = await createBooking(stylistId, formData);
            if (ok) {
                // custom alert
                raiseAlert({
                    title: 'Success!',
                    text: 'A confirmation code has been sent now to your email address! Please copy the code and confirm it below'
                })
            }else {
                // custom alert
                raiseAlert({
                    title: 'Fast geschafft...', 
                    text: 'The confirmation code could not be added! Please try again',
                    severity: 'warning'
                })
            }
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box components={['DateCalendar', 'DateCalendar']}>
                <DateCalendar 
                    label="Select a date"
                    value={selectedDate}
                    onChange={(newDate) => {
                        setSelectedDate(newDate);
                    }}
                />
                {/* Show hours only if a date is selected */}
                {selectedDate && (
                    <Box sx={{mt: "3"}}>
                        <Typography variant='h6'>
                            Available hours for: "{selectedDate.format("YYYY-MM-DD")}"
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                            {buttonHours.map((hour) => {
                            const isSelected = choosenHours.includes(hour)

                            return  (
                                <Button 
                                    key={hour}
                                    variant = {isSelected ? "contained" : "outlined"}
                                    color = {isSelected ? "primary" : "inherit"}
                                    onClick={() => handleHourClick(hour)}
                                >
                                    {hour}:00
                                </Button>
                            )
                            })}
                        </Stack>
                        <Stack spacing={1} mt={1}>
                        {   checkConsecutiveNumbers 
                            ?
                            <Typography variant='h6' color='black'>
                                For your service you need to choose a maximum of {countHoursLeft}h consecutive!
                            </Typography> 
                            :
                            <Typography variant='h6' color='red'>
                                Please choose consecutive Hours!
                            </Typography>}
                            {   choosenHours.length > countHoursLeft
                            ?
                            <Typography variant='h6' color='red'>
                                Please deselect: {choosenHours.length - countHoursLeft}h
                            </Typography>
                            :   
                            <Typography variant='h6' color='black'>
                                Time choosen: {choosenHours.length}h
                            </Typography>
                        }
                        </Stack>
                    </Box>
                )}
                {    canShowForm &&
                (
                    <form onSubmit={handleSubmit(handleCreateBooking)}>
                        <Stack spacing={1} mt={3}>
                            <TextField
                                //defaultValue="cata2@adm.com"
                                label="Vorname"
                                {...register('firstName', registerRules.firstName)}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                name="firstName"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                //defaultValue="cata2@adm.com"
                                label="Nachname"
                                {...register('lastName', registerRules.lastName)}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                name="lastName"
                                type="text"
                                fullWidth
                            />

                            <TextField
                                //defaultValue="cata2@adm.com"
                                label="Kundentyp [Mann/Frau/Kinder]"
                                {...register('clientType', clientTypeRules)}
                                error={!!errors.clientType}
                                helperText={errors.clientType?.message}
                                name="clientType"
                                type="text"
                                fullWidth
                            />

                            <TextField
                                //defaultValue="12345678"
                                label="Telefonnummer"
                                {...register('phone', phoneRules)}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                name="phone"
                                type="phone"
                                fullWidth
                            />

                            <TextField
                                //defaultValue="12345678"
                                label="E-mail"
                                {...register('email', emailRules)}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                name="email"
                                type="email"
                                fullWidth
                            />

                            <TextField
                                //defaultValue=""
                                label="Zusätzliche Informationen"
                                {...register('clientAdditionalNotes', registerRules.clientAdditionalNotes)}
                                error={!!errors.clientAdditionalNotes}
                                helperText={errors.clientAdditionalNotes?.message}
                                name="clientAdditionalNotes"
                                type="text"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" size="large">
                                Buchen Sie Jetzt
                            </Button>
                        </Stack>
                    </form>
                )}
            </Box>
        </LocalizationProvider>
    )
}

export default TimelineCalendar;