import {useStoreActions, useStoreState} from "easy-peasy";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import {Delete} from "@mui/icons-material";
import {toast} from "react-toastify";
import {format} from "date-fns";
import {GET_NOTIFICATION_LOGS} from "../../graphql/queries";

const ListView = ({id, coinId, coinIcon, title, body, createdAt, isDeleted}) => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const deleteNotificationsArray = useStoreActions(actions => actions.notifications.deleteNotificationsArray)

    const [open, setOpen] = useState(false)
    // const [deleteLog] = useMutation(DELETE_NOTIFICATION_LOGS)
    const handleDelete = (delId) => {
        toast.info(`Coming soon`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        // deleteLog({
        //     variables: {
        //         id: delId,
        //         userId: userDetails.id
        //     }
        // }).then(() => {
        //     toast.success(`Log deleted`, {
        //         position: "bottom-right",
        //         autoClose: 5000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     })
        //
        //     deleteNotificationsArray(id)
        //     setOpen(false)
        // }).catch((e) => {
        //     console.log(JSON.stringify(e))
        //     toast.error(`Error deleting logs`, {
        //         position: "bottom-right",
        //         autoClose: 5000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     })
        // })
    }
    let formattedTime = createdAt ? format(new Date(createdAt), "dd-MM-yyyy HH:mm") : "now"
    if (isDeleted) {
        return null
    }
    return (
        <>
            <ListItem
                secondaryAction={
                    id && <Tooltip
                        title={"Delete notification"}>
                        <IconButton edge="end" aria-label="delete" onClick={() => setOpen(true)}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                }

            >
                <ListItemText primary={title} secondary={`${body} `}/>
                <ListItemText secondary={formattedTime ? formattedTime : "now"}/>

            </ListItem>

            <Dialog open={open} disableEscapeKeyDown>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really wish to delete this notification log forever?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleDelete(id)
                    }} variant={"contained"}>Yes</Button>
                    <Button onClick={() => {
                        setOpen(false)
                    }
                    } variant={"outlined"}>No</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
const NotificationCenter = () => {
    const notifications = useStoreState(state => state.notifications.notifications)
    const setNotifications = useStoreActions(actions => actions.notifications.setNewNotifications)
    const openNotifications = useStoreState(state => state.notifications.openNotifications)
    const setOpenNotifications = useStoreActions(actions => actions.notifications.setOpenNotifications)
    const userDetails = useStoreState(state => state.user.userDetails)

    const [fetchNotif, {loading, error}] = useLazyQuery(GET_NOTIFICATION_LOGS, {
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if (userDetails && userDetails.id && (openNotifications || !openNotifications)) {
            console.log("triggered")

            fetchNotif({
                variables: {
                    userId: userDetails.id
                }
            }).then(({data}) => {
                console.log("data")

                setNotifications([...data.notification_log, ...data.allLog])
            })
        }
    }, [userDetails, fetchNotif, openNotifications, setNotifications])

    if (loading) return <Loading/>
    if (error) return <Error message={error.message}/>
    return (<>
        <Dialog open={openNotifications} onClose={() => setOpenNotifications(false)} maxWidth={"md"} fullWidth>
            <DialogTitle sx={{
                textAlign: "center", minWidth: "400px", alignItems: "center",
                letterSpacing: "3px", fontWeight: "bold"
            }} component={"p"}>Notification center</DialogTitle>

            <DialogContent>

                {notifications.length <= 0 ? <Typography variant={"h5"}>No Notifications</Typography> :

                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {notifications.map(({id, title, message, createdAt}, index) => <ListView
                            key={index}
                            createdAt={createdAt}
                            title={title}
                            body={message}
                            id={id} index={index}/>)}
                    </List>}
            </DialogContent>
        </Dialog>
    </>)

}
export default NotificationCenter
