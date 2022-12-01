import * as React from 'react';
import {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import {GET_APPOINTMENTS} from "../../graphql/queries";
import {useLazyQuery} from "@apollo/client";
import {useStoreState} from "easy-peasy";

const Appointment = ({appointment}) => {
    return (<ListItem
        sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
        }}
    >
        <ListItemText
            primary={new Date(appointment.dateTime).toLocaleDateString("en-US", {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })}
            secondary={appointment.notes}
        />
    </ListItem>);
}
const AppointmentInfo = () => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const [appointments, setAppointments] = useState([]);
    const [fetchData, {data, loading, error}] = useLazyQuery(GET_APPOINTMENTS, {
        fetchPolicy: 'network-only'
    });
    useEffect(() => {
        if (!loading && data) {
            console.log(data.appointment)
            setAppointments(data.appointment)
        }
    }, [data, loading])
    useEffect(() => {
        if (userDetails && userDetails.id) {
            fetchData({
                variables: {
                    patientId: userDetails.patients[0].id
                }
            })
        }
    }, [userDetails])
    if (loading) return <Loading/>;
    if (error) return <Error message={error.message}/>;
    return (<>
        <h1>Appointment Information: {appointments.length}</h1>
        <List
            sx={{
                width: '80%',
                margin: 'auto'
            }}
        >
            {appointments.map(appointment => <ListItem key={appointment.dateTime}> <Appointment
                appointment={appointment}/></ListItem>)}

        </List>

    </>);
}

export default AppointmentInfo;
