import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const ScheduleAppointment= () => {
    const [value, setValue] = React.useState(dayjs('2022-10-31T08:30:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (<>
        <h1>Schedule Appointment</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Choose Date & Time "
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
        </LocalizationProvider>
    </>
    );
}

export default ScheduleAppointment;
