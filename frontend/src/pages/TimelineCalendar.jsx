import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { Box, Stack, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSessionStorageState } from '../hooks/useStorageState';
import useStore from '../hooks/useStore';
import { useNavigate, useParams } from 'react-router-dom';

import {minutesToHours, filterByDateKey, extractHourFromDate, getYearMonthDayOutOfFullyDate} from '../utils/booking'
import { areNumbersConsecutive, extractKeysValuesFromArrayOfObjects, removeValuesInRangesFromArray } from '../hooks/helperFunctions';


const TimelineCalendar = () => {
    const {getStylistBookings, raiseAlert} = useStore((state) => state)
    const navigate = useNavigate();
    const {stylistId} = useParams();
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(dayjs(today));
    const [choosenHours, setChoosenHours] = useState([])
    const [countHoursLeft, setCountHoursLeft] = useState(1)
    const [checkConsecutiveNumbers, setCheckConsecutiveNumbers] = useState(false)

    const [selectedServicesIds, setselectedServicesIds] = useSessionStorageState("selectedServicesIds", [])
    const [totalDuration, setTotalDuration] = useSessionStorageState("totalDuration", 0)
    const [totalPrice, setTotalPrice] = useSessionStorageState("totalPrice", 0)
    const [keysAndValues, setKeysAndValues] = useState([])
    
    const [buttonHours, setButtonHours] = useState(Array.from({length: 9}, (_, index) => index + 10)) 
    const [dbData, setDbData] = useState(null)

    

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
    }, [selectedDate, stylistId])

    useEffect(() => {
        if (!dbData) {
            return
        }
        const keysToGet = ["start", "end"];
        const todayAppointments = filterByDateKey(dbData, "start", selectedDate.format("YYYY-MM-DD"))
        const startEnd = extractKeysValuesFromArrayOfObjects(keysToGet, todayAppointments)
        // Its making the array shorter, because we will need only the start and the end for the next step
        const startHours = extractHourFromDate(startEnd, "start")
        const endHours = extractHourFromDate(startEnd, "end")
        
        const initialHours = Array.from({length: 9}, (_, index) => index + 10)

        const freeHours = removeValuesInRangesFromArray(initialHours, startHours, endHours)

        setButtonHours(freeHours)
    }, [dbData, selectedDate])

    useEffect(() => {
        const hours = minutesToHours(totalDuration)
        setCountHoursLeft(hours)
    },[totalDuration])

    useEffect(()=> {
        console.log(choosenHours.length, ' choseen h')
        const trueFalse = areNumbersConsecutive(choosenHours)
        setCheckConsecutiveNumbers(trueFalse)
    },[choosenHours])

    const handleHourClick = (hour) => {
        setChoosenHours(prev => 
            prev.includes(hour)
                ? prev.filter(h => h !== hour)
                : [...prev, hour]
        )
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

                        <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
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
                    </Box>
                )}
            </Box>
        </LocalizationProvider>
    )
}

export default TimelineCalendar;