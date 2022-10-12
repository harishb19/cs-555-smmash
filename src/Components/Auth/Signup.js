import {useStoreState} from "easy-peasy";
import {Box, Paper, Typography} from "@mui/material";
import loginStyle from "./css/login.module.css"
import React from "react";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const userDetails = useStoreState(state => state.user.userDetails)
    if (userDetails && userDetails.id) {
        navigate("/")
    }


    return (
        <Paper elevation={2} className={`${loginStyle.rootSignup}`}>
            <Box justifyContent='center' display='flex' alignItems='center' className={loginStyle.div}>
                <div className={loginStyle.paper}>
                    <div className={loginStyle.titleContainer}>
                        <Typography variant={"h5"} component={"div"} className={loginStyle.titleText}>
                            <b>Sign Up</b>
                        </Typography>
                    </div>
                </div>
            </Box>
        </Paper>
    )
}
export default Signup
