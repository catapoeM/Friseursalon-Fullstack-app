import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

const TimelineCalendar = () => {
    const today = new Date();
    const [value, setValue] = useState(dayjs(today));

    const handleValueChanged = (newValue) => {
        setValue(newValue);
        console.log(newValue.toDate(), ' new val')
    }

    return (
        <Stack>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    <DemoItem label="Timeslot Calendar Stylist">
                        <DateCalendar 
                            value={value} onChange={(newValue) => handleValueChanged(newValue)} 
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

        </Stack>
    )
}

export default TimelineCalendar;