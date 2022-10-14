import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Avatar, Button, ListItemButton, ListItemIcon, Menu, MenuItem, Tooltip, useMediaQuery} from "@mui/material";
import {useStoreActions, useStoreState} from "easy-peasy";
import {useNavigate} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import {AdminPanelSettings, Person} from "@mui/icons-material";

function stringAvatar(name) {
    if (name.split(' ')[0][0] && name.split(' ')[1][0]) {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    } else if (name.split(' ')[0][0]) {
        return {
            children: `${name.split(' ')[0][0]}`,
        };
    } else {
        return {
            children: `S`,
        };
    }

}

export const NotificationBadge = ({sideMenu, open}) => {
    const theme = useTheme()
    const setOpenNotifications = useStoreActions(actions => actions.notifications.setOpenNotifications)
    const notifications = useStoreState(state => state.notifications.notifications)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (sideMenu) {
        if (isMobile) {
            return (<ListItemButton
                sx={{
                    minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5,
                }}
                onClick={() => setOpenNotifications(true)}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',
                    }}
                >
                    {notifications.length > 0 ? <Badge badgeContent={notifications.length} color="secondary">
                        <NotificationsIcon/>
                    </Badge> : <NotificationsIcon/>}
                </ListItemIcon>
                <ListItemText primary={"Notifications"} sx={{opacity: open ? 1 : 0}}/>
            </ListItemButton>)
        }
        return null

    }
    return (<IconButton
        size="large"
        aria-label="show notifications"
        onClick={() => setOpenNotifications(true)}
    >
        {notifications.length > 0 ? <Badge badgeContent={notifications.length} color="secondary">
            <NotificationsIcon/>
        </Badge> : <NotificationsIcon/>}

    </IconButton>)
}

export const UserProfile = ({sx}) => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const userImage = useStoreState(state => state.user.userImage)
    if (userImage) {
        return <Avatar alt={`${userDetails.firstName} ${userDetails.lastName ?? "."}`} src={userImage} sx={{...sx}}/>


    }
    return <Avatar {...stringAvatar(`${userDetails.firstName} ${userDetails.lastName ?? "."}`)}
                   sx={{...sx, backgroundColor: "#6f5ed4 ", color: "white"}}/>

}

const PrimaryAppBar = ({onClick, open}) => {
    const navigate = useNavigate()
    const userDetails = useStoreState(state => state.user.userDetails)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = () => {
        navigate('/profile')
    };


    return (<Box sx={{flexGrow: 1}}>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{mr: 2, ...(open && {display: 'none'}),}}
                onClick={onClick}
            >
                <MenuIcon/>
            </IconButton>
            <Button variant="text" color={"primary"} disableRipple component={"div"}
                    onClick={() => {
                        navigate("/")
                    }}
                    sx={{
                        color: "white !important",
                    }
                    }
            >
            SMMASH

            </Button>

            <Box sx={{flexGrow: 1}}/>
            {userDetails && userDetails.id && <>
                <Box sx={{display: {xs: 'none', md: 'flex', alignItems: "center"}}}>
                    <div>
                        <NotificationBadge/>

                    </div>
                    <Tooltip title="Account settings">

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            onClick={handleClick}
                            color="inherit"
                            aria-controls={openMenu ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                        >
                            <UserProfile/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openMenu}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <MenuItem onClick={()=>handleProfileMenuOpen()}>
                            <Person/> Profile
                        </MenuItem>
                        <MenuItem>
                            <AdminPanelSettings/> {userDetails.role.name}
                        </MenuItem>
                    </Menu>
                </Box>

            </>}
        </Toolbar>
    </Box>);
}

export default PrimaryAppBar
