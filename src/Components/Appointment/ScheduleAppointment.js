import * as React from 'react';
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {Button, InputLabel, Stack} from "@mui/material";
import {toast} from "react-toastify";
import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_APPOINTMENT} from "../../graphql/mutation";
import {useStoreState} from "easy-peasy";
import * as Yup from "yup";
import {Formik} from "formik";
import {GET_APPOINTMENTS} from "../../graphql/queries";
import Error from "../Error/CustomError";
import Loading from "../Loading/Loading";

const ScheduleAppointment = (date, amount) => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const addDays = (days) => {
        let date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }
    const dateValidation = {
        date: Yup.date()
            .min(new Date(), "You can't book appointments in the past.")
            .max(addDays(30), "You can't book appointments more than a month in the future.")
    }
    const [fetchData, {data, loading, error}] = useLazyQuery(GET_APPOINTMENTS)
    const [appointments, setAppointments] = useState([])
    const [insertAppointment] = useMutation(ADD_APPOINTMENT);
    const handleSubmit = (value, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        if (appointments.includes(value.date.toDateString())) {
            toast.error("Appointment for this date already exists.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setSubmitting(false)
            return
        }

        insertAppointment({
            variables: {
                object: {
                    patientId: userDetails.patients[0].id,
                    dateTime: value.date.toISOString(),
                    notes: value.notes
                }
            }
        }).then(res => {
            toast.success(`Records inserted`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setSubmitting(false)
            resetForm({values: {notes: ""}})
        }).catch(err => {
            console.log("-> err", err);
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setSubmitting(false)
        })
    }

    useEffect(() => {
        if (data && !loading) {
            let appts = []
            data.appointment.forEach((appt) => {
                appts.push(new Date(appt.dateTime).toDateString())
            })
            console.log(appts)
            setAppointments([...appts])
        }
        if (error) {
            console.log(error)
        }
    }, [data, loading, error])
    useEffect(() => {
        if (userDetails.patients.length > 0) {
            fetchData({
                variables: {
                    patientId: userDetails.patients[0].id
                }
            })
        }
    }, [userDetails])
    if (loading) return <Loading/>
    if (error) return <Error error={error}/>
    return (<Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({...dateValidation})}
        >
            {(props) => {
                const {
                    values, dirty, handleChange, handleBlur, handleSubmit, isValid, isSubmitting
                } = props;
                return (<form onSubmit={handleSubmit}>
                    <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                    >
                        <h1>Schedule Appointment</h1>
                        <h4>Appointments can only be scheduled upto 30 days in advance.</h4>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Choose Date & Time "
                                id={"date"}
                                name={"date"}
                                minDate={addDays(1)}
                                maxDate={addDays(30)}
                                minTime={new Date().setHours(11, 0)}
                                maxTime={new Date().setHours(20, 30)}
                                value={values.date}
                                onChange={value => props.setFieldValue("date", value)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <InputLabel htmlFor="notes">Add notes:</InputLabel>
                        <TextField
                            multiline
                            type="text"
                            name={"notes"}
                            id={"notes"}
                            value={values.notes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant={"outlined"}
                        />
                        <Button variant={"contained"} color={"secondary"}
                                disabled={isSubmitting || !(isValid && dirty)}
                                type={"submit"}
                        >
                            Confirm
                        </Button>
                    </Stack>
                </form>)
            }}
        </Formik>
    );
}

export default ScheduleAppointment;
