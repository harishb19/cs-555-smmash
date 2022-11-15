import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {useLazyQuery} from "@apollo/client";
import {useStoreState} from "easy-peasy";
import {GET_NOTIFICATIONS} from "../../graphql/queries";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import {useEffect} from "react";

const NotificationList = () => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const [fetchData, {data, loading, error}] = useLazyQuery(GET_NOTIFICATIONS)
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
        <List>
            {data?.notifications.map(notification => (<ListItem alignItems="flex-start">
                <ListItemText
                    primary={notification.title}
                    secondary={notification.message}
                />
            </ListItem>))}
        </List>
    </div>)
}
export default NotificationList;