import * as React from 'react';
import TextField from '@mui/material/TextField';
import {format} from "date-fns";
import { LocalizationProvider,DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ScheduleAppointment= () => {
    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (<>
        <h1>Schedule Appointment</h1>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
