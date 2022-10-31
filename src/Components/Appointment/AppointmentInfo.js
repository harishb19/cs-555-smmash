import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Info} from "@mui/icons-material";

const AppointmentInfo = () => {

    return (<>
            <h1>Appointment Information</h1>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <Info />
                    </ListItemIcon>
                    <ListItemText
                        primary="Date & Time: 11/05/2022 18:30:00"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Info />
                    </ListItemIcon>
                    <ListItemText
                        primary="Notes: Ask doctor about medicine for reducing fever after vaccine"
                    />
                </ListItem>
            </List>
        </>
    );
}

export default AppointmentInfo;