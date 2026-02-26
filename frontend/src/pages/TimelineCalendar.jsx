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
import { emailRules, phoneRules, registerRules, clientTypeRules, verifyCodeRules } from '../utils/form-rules';

const TimelineCalendar = () => {
    const {getStylistBookings, createBooking, requestCode, verifyCode, raiseAlert} = useStore((state) => state)
    const {stylistId} = useParams();

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(dayjs(today));
    
    const [choosenHours, setChoosenHours] = useState([])

    const [selectedServicesIds, setselectedServicesIds] = useSessionStorageState("selectedServicesIds", [])
    const [totalDuration, setTotalDuration] = useSessionStorageState("totalDuration", 0)
    const [totalPrice, setTotalPrice] = useSessionStorageState("totalPrice", 0)

    
    const [buttonHours, setButtonHours] = useState(Array.from({length: 9}, (_, index) => index + 10))
    
    const [step, setStep] = useState("RESERVE")
    
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        getAsyncData(selectedDate)
    }, [selectedDate])

    const getAsyncData = async(selectedDate) => {
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
        const keysToGet = ["startHour", "endHour"];
        const todayAppointments = filterByDateKey(response.data, "date", selectedDate.format("YYYY-MM-DD"))
        const startEnd = extractKeysValuesFromArrayOfObjects(keysToGet, todayAppointments)
        // Its making the array shorter, because we will need only the start and the end for the next step
        const startHours = extractStartEndHours(startEnd, "startHour")
        const endHours = extractStartEndHours(startEnd, "endHour")
        
        const initialHours = Array.from({length: 9}, (_, index) => index + 10)

        const freeHours = removeValuesInRangesFromArray(initialHours, startHours, endHours)
        
        setButtonHours(freeHours)
    }

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
        const responseCreateBooking = await createBooking(stylistId, formData);
            if (responseCreateBooking) {
                setStep("REQUEST_CODE")
            raiseAlert({
                title: 'Create booking!',
                text: 'The create booking process has been now started!'
            })
            }else {
                // custom alert
                raiseAlert({
                    title: 'Fast geschafft...', 
                    text: 'The booking creation code could done!',
                    severity: 'warning'
                })
            }
    }

    const handleRequesCode = async() => {
        const responseRequestCode = await requestCode();
        if (responseRequestCode) {
            setStep("VERIFY_CODE")
            raiseAlert({
                title: 'Request code!',
                text: 'The requested code has been sent to your email-address successfully!'
            })
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'The confirmation code could not be sent!',
                severity: 'warning'
            })
        }
    }

    const handleVerifyCode = async(formData) => {
        const responseVerifyCode = await verifyCode(formData);
        if (responseVerifyCode) {
            setStep("DONE")
            raiseAlert({
                title: 'Verify code!',
                text: 'The requested code has been successfully verified and your reservation is now completely finished!'
            })
        }else {
            // custom alert
            raiseAlert({
                title: 'Fast geschafft...', 
                text: 'You could not be verified',
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
                {    canShowForm && step === "RESERVE" &&
                (
                    <form onSubmit={handleSubmit(handleCreateBooking)}>
                        <Stack spacing={1} mt={3}>
                            <TextField
                                defaultValue="catalin"
                                label="Vorname"
                                {...register('firstName', registerRules.firstName)}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                name="firstName"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                defaultValue="Poenaru"
                                label="Nachname"
                                {...register('lastName', registerRules.lastName)}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                name="lastName"
                                type="text"
                                fullWidth
                            />

                            <TextField
                                defaultValue="Mann"
                                label="Kundentyp [Mann/Frau/Kinder]"
                                {...register('clientType', clientTypeRules)}
                                error={!!errors.clientType}
                                helperText={errors.clientType?.message}
                                name="clientType"
                                type="text"
                                fullWidth
                            />

                            <TextField
                                defaultValue="067765039456"
                                label="Telefonnummer"
                                {...register('phone', phoneRules)}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                name="phone"
                                type="phone"
                                fullWidth
                            />

                            <TextField
                                defaultValue="ken.goodwin@ethereal.email"
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
                {
                    step === "REQUEST_CODE" &&
                    (
                    <Stack spacing={1} mt={3}>
                        <Typography variant='h6' color='black'>
                            You have to send code to your email address to be verified
                        </Typography>
                        <form onSubmit={handleSubmit(handleRequesCode)}>
                            <Stack spacing={1} mt={3}>
                                <Button type="submit" variant="contained" size="large">
                                        Send Code
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                    )
                }
                {
                    step === "VERIFY_CODE" &&
                (
                    <form onSubmit={handleSubmit(handleVerifyCode)}>
                        <Stack spacing={1} mt={3}>
                            <TextField
                                    //defaultValue="cata2@adm.com"
                                    label="Verifizierungscode eingeben"
                                    {...register('verifyCode', verifyCodeRules)}
                                    error={!!errors.verifyCodeRules}
                                    helperText={errors.verifyCodeRules?.message}
                                    name="verifyCode"
                                    type="text"
                                    fullWidth
                                />
                            <Button type="submit" variant="contained" size="large">
                                Verifizieren Sie sich
                            </Button>
                        </Stack>
                    </form>
                )}
                {
                    step === "DONE" &&
                    (
                    <Stack spacing={1} mt={3}>
                        <Typography variant='h6' color='green'>
                            Congratulations! You have now a reservation and the confirmation will be also sent to your email-address!
                        </Typography>
                    </Stack>
                    )
                }
            </Box>
        </LocalizationProvider>
    )
}

export default TimelineCalendar;