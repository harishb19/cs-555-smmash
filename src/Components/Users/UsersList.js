import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import Error from "../Error/CustomError";
import Loading from "../Loading/Loading";
import {GET_PENDING_PATIENTS} from "../../graphql/queries";
import {IconButton, List, ListItem, ListItemText, Stack, Tooltip} from "@mui/material";
import {DoNotDisturbOn, FactCheck, LocalPharmacy} from "@mui/icons-material";
import {CHANGE_DOCTOR_STATUS, CHANGE_PATIENT_STATUS} from "../../graphql/mutation";
import {toast} from "react-toastify";

const Patient = ({patient, refetch}) => {
    const [updateStatus] = useMutation(CHANGE_PATIENT_STATUS)
    const [updateDoctorStatus] = useMutation(CHANGE_DOCTOR_STATUS)

    const handleAcceptDoctor = () => {
        updateDoctorStatus({
            variables: {
                userId: patient.id, status: "approved"
            }
        }).then(res => {
            toast.success(`Patient approved`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            refetch()
        }).catch(err => {
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }
    const handleAcceptUser = () => {
        updateStatus({
            variables: {
                userId: patient.id, status: "approved"
            }
        }).then(res => {
            toast.success(`Patient approved`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            refetch()
        }).catch(err => {
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }
    const handleReject = () => {
        updateStatus({
            variables: {
                userId: patient.id, status: "rejected"
            }
        }).then(res => {
            toast.success(`Patient rejected`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            refetch()
        }).catch(err => {
            console.log(err)

            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }
    return (<ListItem
        sx={{
            border: "1px solid #ccc", borderRadius: "5px",
        }}
        secondaryAction={<Stack direction="row" justifyContent='space-between'>
            <Tooltip title="reject">
                <IconButton aria-label="delete" onClick={handleReject}>
                    <DoNotDisturbOn/>
                </IconButton>
            </Tooltip>
            <Tooltip title="accept as user">

                <IconButton aria-label="accept as user" onClick={handleAcceptUser}>
                    <FactCheck/>
                </IconButton>
            </Tooltip>
            <Tooltip title="accept as doctor">

                <IconButton aria-label="accept as doctor" onClick={handleAcceptDoctor}>
                    <LocalPharmacy/>
                </IconButton>
            </Tooltip>
        </Stack>}
    >

        <ListItemText
            primary={patient.firstName + " " + patient.lastName}
            secondary={patient.email}
        />
    </ListItem>);
}
const UsersList = () => {
    const [patients, setPatients] = useState([]);
    const {data, loading, error, refetch} = useQuery(GET_PENDING_PATIENTS);
    useEffect(() => {
        if (!loading && data) {
            setPatients(data.users)
        }
    }, [data, loading])
    if (loading) return <Loading/>;
    if (error) return <Error message={error.message}/>;
    return (<div>
        <h1>Patients acceptance pending: {patients.length}</h1>
        <List
            sx={{
                width: '80%', margin: 'auto',
            }}
        >
            {patients.map(patient => <Patient key={patient.id} patient={patient} refetch={refetch}/>)}
        </List>

    </div>);
}

export default UsersList;
