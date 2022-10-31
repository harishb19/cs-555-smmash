import React, {useEffect, useState} from "react";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import {useQuery} from "@apollo/client";
import {GET_PATIENT_RECORDS} from "../../graphql/queries";
import {useStoreState} from "easy-peasy";
import {Dialog, DialogContent, DialogContentText, DialogTitle, Fab, List, ListItem, ListItemText} from "@mui/material";
import {Add} from "@mui/icons-material";
import AddRecords from "./AddRecords";

const PreviousRecords = () => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);
    const {data, loading, error,refetch} = useQuery(GET_PATIENT_RECORDS, {
        variables: {
            patientId: userDetails.id
        }
    })

    useEffect(() => {
        if (data && !loading) {
            setRecords([...data.records])
        }
    }, [data, loading])
    if (loading) return <Loading/>
    if (error) return <Error error={error}/>
    return (<>
        <h2>Records</h2>
        <List>
            {records.map((record) => (<ListItem
                sx={{
                    border:1
                }}
                key={record.id}>
                <ListItemText
                    primary={record.dosage.vaccine.vaccineName + " " + record.dosage.doseNumber}
                    secondary={`${record.doctor.user.firstName} ${record.doctor.user.lastName} - ${record.dosageInformation}`}
                />
            </ListItem>))}
        </List>
        <Dialog onClose={() => setOpen(!open)} open={open}>
            <DialogTitle>Insert records</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add a previous/new record
                </DialogContentText>
                <AddRecords refetch={refetch}/>
            </DialogContent>

        </Dialog>


        <Fab variant="extended" sx={{
            position: "fixed", bottom: 10, right: 10
        }}
        onClick={() => setOpen(!open)}>

            <Add sx={{mr: 1}}/>
            Records
        </Fab>
    </>);
}

export default PreviousRecords;
