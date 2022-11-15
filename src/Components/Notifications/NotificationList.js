import {Fab, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useLazyQuery} from "@apollo/client";
import {useStoreState} from "easy-peasy";
import {GET_NOTIFICATIONS} from "../../graphql/queries";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import React, {useEffect} from "react";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const NotificationList = () => {
    const navigate=useNavigate() ;
    const userDetails = useStoreState(state => state.user.userDetails)
    const [fetchData, {data, loading, error}] = useLazyQuery(GET_NOTIFICATIONS,{
        fetchPolicy:'network-only'
    })
    useEffect(() => {
        if (userDetails && userDetails.id) {
            fetchData({
                variables: {
                    where: userDetails.roleId === 3 ? {} : {sentBy: {_eq: userDetails.id}}

                }
            })
        }


    }, [userDetails])
    if (loading) {
        return <Loading/>
    }
    if (error) {
        return <Error error={error.message} onClick={() => window.reload()}/>
    }
    return (<div>
        <Typography variant={'h2'}>
            Notification List
        </Typography>
        <Typography variant={'body2'}>
            *notifications created by you will be shown here
        </Typography>
        <List>
            {data?.notifications.map(notification => (<ListItem alignItems="flex-start">
                <ListItemText
                    primary={notification.title}
                    secondary={notification.message}
                />
            </ListItem>))}
        </List>
        <Fab variant="extended" sx={{
            position: "fixed", bottom: 10, right: 10
        }}
             onClick={() => navigate('/notification/create')}>

            <Add sx={{mr: 1}}/>
            Send Notification
        </Fab>
    </div>)
}
export default NotificationList;
