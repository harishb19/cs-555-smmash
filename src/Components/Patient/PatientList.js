import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import Error from "../Error/CustomError";
import Loading from "../Loading/Loading";
import {GET_PATIENTS} from "../../graphql/queries";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Tooltip
} from "@mui/material";
import {AddBox, FactCheck} from "@mui/icons-material";
import {useStoreState} from "easy-peasy";
import PreviousRecords from "./PreviousRecords";
import {differenceInMonths, differenceInYears} from "date-fns";
import AddRecords from "./AddRecords";

const Patient = ({patient, refetch}) => {
    const [openDetails, setOpenDetails] = useState(false)
    const [openRecord, setOpenRecord] = useState(false)
    const [openNewRecord, setOpenNewRecord] = useState(false)

    const calculateAge = (dob) => {
        let age = differenceInYears(new Date(), new Date(dob));
        if (!age) {
            age = differenceInMonths(new Date(), new Date(dob))
        }
        return age;
    }

    return (<>

        <ListItem
            sx={{
                border: "1px solid #ccc", borderRadius: "5px",
            }}
            secondaryAction={<Stack direction="row" justifyContent='space-between'>
                <Tooltip title="vew records">
                    <IconButton aria-label="accept"
                                onClick={() => setOpenRecord(true)}

                    >
                        <FactCheck/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="new records">
                    <IconButton aria-label="new"
                                onClick={() => setOpenNewRecord(true)}

                    >
                        <AddBox/>
                    </IconButton>
                </Tooltip>
            </Stack>}
        >
            <ListItemButton onClick={() => setOpenDetails(true)}
            >
                <ListItemText
                    primary={patient.firstName + " " + patient.lastName}
                    secondary={'Parent -' + " " + patient.user.firstName + " " + patient.user.lastName}
                />

            </ListItemButton>


        </ListItem>
        <Dialog onClose={() => setOpenRecord(!openRecord)} open={openRecord}>
            <DialogTitle>Records</DialogTitle>
            <DialogContent>
                <PreviousRecords patientId={patient.parentId}/>
            </DialogContent>
        </Dialog>
        <Dialog onClose={() => setOpenNewRecord(!openNewRecord)} open={openNewRecord}>
            <DialogTitle>New Record</DialogTitle>
            <DialogContent>
                <AddRecords patientId={patient.id} refetch={refetch}/>
            </DialogContent>
        </Dialog>
        <Dialog onClose={() => setOpenDetails(!openDetails)} open={openDetails}>
            <DialogTitle>Details</DialogTitle>
            <DialogContent sx={{padding: 1}}>
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'First Name'}
                            value={patient.firstName}
                            disabled
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'Last Name'}
                            value={patient.lastName}
                            disabled
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'Age'}
                            value={calculateAge(new Date(patient.dateOfBirth))}
                            disabled
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'Gender'}
                            value={patient.gender}
                            disabled
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'Parent name'}
                            value={`${patient.user.firstName} ${patient.user.lastName}`}
                            disabled
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'Parent email'}
                            value={`${patient.user.email} `}
                            disabled
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            variant={'outlined'}
                            label={'Parent number'}
                            value={`${patient.user.phoneNumber} `}
                            disabled
                        />

                    </Grid>
                </Grid>
            </DialogContent>

        </Dialog>
    </>);
}
const PatientList = () => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const [patients, setPatients] = useState([]);
    const {data, loading, error, refetch} = useQuery(GET_PATIENTS, {
        variables: {
            doctorId: userDetails.id
        }
    });
    useEffect(() => {
        if (!loading && data) {
            setPatients(data.patient)
        }
    }, [data, loading])
    if (loading) return <Loading/>;
    if (error) return <Error message={error.message}/>;
    return (<div>
        <h1>Patients :{patients.length}</h1>
        <List
            sx={{
                width: '80%', margin: 'auto',
            }}
        >
            {patients.map(patient => <Patient key={patient.id} patient={patient} refetch={refetch}/>)}
        </List>

    </div>);
}

export default PatientList;
