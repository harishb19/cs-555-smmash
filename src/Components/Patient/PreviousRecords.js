import React, {useEffect, useState} from "react";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import {useMutation, useSubscription} from "@apollo/client";
import {GET_PATIENT_RECORDS_SUB} from "../../graphql/queries";
import {useStoreState} from "easy-peasy";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    Tooltip
} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import AddRecords from "./AddRecords";
import {toast} from "react-toastify";
import {DELETE_RECORD} from "../../graphql/mutation";
import EditRecords from "./EditRecords";
import {isEmpty} from "lodash";
import {format} from "date-fns";

const PreviousRecords = ({patientId}) => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteRecord] = useMutation(DELETE_RECORD)
    const [editDetails, setEditDetails] = useState({})
    const {data, loading, error} = useSubscription(GET_PATIENT_RECORDS_SUB, {
        variables: {
            patientId: patientId ?? userDetails.id
        }
    })
    const handleDelete = (id) => {
        deleteRecord({variables: {id: id}})
            .then(() => {
                toast.success(`Record deleted`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

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
            }
        )
    }
    useEffect(() => {
        if (data && !loading) {
            setRecords([...data.records])
        }
    }, [data, loading])
    if (loading) return <Loading/>
    if (error) return <Error error={error}/>

    if (patientId) {
        return (<>
            <List>
                {records.map(record => <ListItem
                    key={record.id}
                    secondaryAction={<Stack direction="row" justifyContent='space-between'>
                        <Tooltip title="Edit records">
                            <IconButton aria-label="edit"
                                        onClick={() => setEditDetails(record)}

                            >
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete records">
                            <IconButton aria-label="delete"
                                        onClick={() => handleDelete(record.id)}

                            >
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </Stack>}>
                    <ListItemText
                        primary={record.dosage.vaccine.vaccineName + " " + record.dosage.doseNumber}
                        secondary={`${format(new Date(record.dosageInformation), 'dd/MM/yyyy')}`}
                    />
                </ListItem>)}
            </List>
            <Dialog onClose={() => setEditDetails({})} open={!isEmpty(editDetails)}>
                <DialogTitle>Edit records</DialogTitle>
                <DialogContent>
                    <EditRecords editDetails={editDetails} refetch={() => {
                        console.log('ok')
                    }}/>
                </DialogContent>

            </Dialog>


        </>)
    }
    return (<>
        <h2>Records</h2>
        <List>
            {records.map((record) => (<ListItem
                sx={{
                    border: 1
                }}
                key={record.id}>
                <ListItemText
                    primary={record.dosage.vaccine.vaccineName + " " + record.dosage.doseNumber}
                    secondary={`${record.doctor.user.firstName} ${record.doctor.user.lastName} - ${format(new Date(record.dosageInformation), 'dd/MM/yyyy')}`}
                />
            </ListItem>))}
        </List>
        <Dialog onClose={() => setOpen(!open)} open={open}>
            <DialogTitle>Insert records</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add a previous/new record
                </DialogContentText>
                <AddRecords refetch={() => console.log("ok")}/>
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
