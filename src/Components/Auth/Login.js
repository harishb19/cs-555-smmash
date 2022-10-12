import {useStoreState} from "easy-peasy";
import {Paper} from "@mui/material";
import loginStyle from "./css/login.module.css"
import React from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const userDetails = useStoreState(state => state.user.userDetails)
    if (userDetails && userDetails.id) {
        navigate("/")
    }
    return (
        <div>
            <Paper elevation={2} className={`${loginStyle.root}`}>
                LOGIN PAGE
            </Paper>
        </div>
    )
}
export default Login
