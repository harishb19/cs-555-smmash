import React from "react";
import {useToasts} from "react-toast-notifications";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {Close} from "@mui/icons-material";

const NotificationToast = ({children}) => {
    const {removeAllToasts} = useToasts();


    return (<List sx={{width: '100%', maxWidth: 400, bgcolor: 'background.paper', zIndex: 99999999}}>
            <ListItem
                secondaryAction={<IconButton edge="end" aria-label="close"
                                             onClick={removeAllToasts}

                >
                    <Close/>
                </IconButton>}
            >
                <ListItemAvatar>
                    <Avatar alt={children.coinId} src={children.coinIcon}/>

                </ListItemAvatar>
                <ListItemText primary={children.title} secondary={children.body}/>
            </ListItem>
        </List>


    )


}
export default NotificationToast
