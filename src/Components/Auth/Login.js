import {useStoreState} from "easy-peasy";
import {Button, Grid, InputAdornment, InputLabel, Paper, TextField, Typography} from "@mui/material";
import loginStyle from "./css/login.module.css"
import {Formik} from "formik";
import * as Yup from "yup";
import React, {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Email, Google, Lock} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const Login = ({type}) => {
    const navigate = useNavigate()
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const userDetails = useStoreState(state => state.user.userDetails)
    if (userDetails && userDetails.id) {
        navigate("/")
    }
    useEffect(() => {
        if (type === "doctor") {
            localStorage.setItem("userType", "doctor")
        } else {
            localStorage.setItem("userType", "patient")
        }
    }, [type])
    return (
        <div>
            <Paper elevation={2} className={`${loginStyle.root}`}>
                {
                    isForgotPassword ?
                        <ForgotContainer setIsForgotPassword={setIsForgotPassword}/> :
                        <LoginContainer setIsForgotPassword={setIsForgotPassword}/>
                }
            </Paper>
        </div>
    )
}
export default Login


const LoginContainer = ({setIsForgotPassword}) => {
    const navigate = useNavigate()
    const auth = getAuth();

    const handleUserCheck = (user) => {

        //TODO
    }
    const handleSignInWithGoogle = () => {
        //TODO
    }

    const handleLogin = (value, setSubmitting, setFieldError) => {
        //TODO
    }
    return (
        <Box justifyContent='center' display='flex' alignItems='center' className={loginStyle.div}>
            {/*<Paper className={loginStyle.paper}>*/}
            <div className={loginStyle.paper}>
                <div className={loginStyle.titleContainer}>
                    <Typography variant={"h5"} component={"div"} className={loginStyle.titleText}>
                        <b>Sign In</b>
                    </Typography>
                </div>
                {/*<div>*/}
                <Formik
                    initialValues={{email: "", password: ""}}
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        setSubmitting(true)
                        handleLogin(values, setSubmitting, setFieldError)
                    }}
                    enableReinitialize={true}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required("Email is required"),
                        password: Yup.string().required("Password is required"),

                    })}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isValid,
                            isSubmitting
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <TextField
                                            variant={"outlined"}
                                            multiline
                                            type="email"
                                            id="email"
                                            name="email"
                                            error={(errors.email && touched.email)}
                                            // label="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            fullWidth
                                            onBlur={handleBlur}
                                            className={loginStyle.inputbox}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <p className={`${loginStyle.error}`}>
                                            {
                                                (errors.email && touched.email) && errors.email
                                            }
                                        </p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <TextField
                                            id="password"
                                            name="password"
                                            // label="Password"
                                            error={(errors.password && touched.password)}
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            variant={"outlined"}
                                            fullWidth
                                            onBlur={handleBlur}
                                            className={loginStyle.inputbox}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <p className={`${loginStyle.error}`}>
                                            {
                                                (errors.password && touched.password) && errors.password
                                            }

                                        </p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant={"contained"} color={"secondary"} fullWidth
                                                className={`${loginStyle.button}`}
                                                disabled={isSubmitting || !(isValid && dirty)}
                                                type={"submit"}
                                        >
                                            sign in
                                        </Button>

                                    </Grid>
                                </Grid>


                            </form>
                        )
                    }}

                </Formik>

                <Typography className={`${loginStyle.smalltext} ${loginStyle.minilink}`}
                            onClick={() => {
                                setIsForgotPassword(true)
                            }}>
                    Forgot your password?</Typography>
                <Typography className={loginStyle.smalltext}>
                    or continue with
                </Typography>
                <div>
                    <IconButton
                        className={loginStyle.avatar}
                        aria-label="google signin"
                        color="primary"
                        onClick={handleSignInWithGoogle}
                    >
                        <Google/>
                    </IconButton>
                </div>
                <Typography className={loginStyle.smalltext}>
                    No Account? <a className={loginStyle.minilink} href={'/auth/signup'}>Signup</a>
                </Typography>
            </div>
        </Box>
    )
}

const ForgotContainer = ({setIsForgotPassword}) => {
    const auth = getAuth();

    const handleForgotPassword = (email) => {
        //TODO
    }
    return (
        <>
            <div className={`${loginStyle.titleContainer}`}>
                <Typography className={loginStyle.titleText} variant={"h5"} component={"div"}>
                    <b>Forgot password?</b>
                </Typography>
            </div>
            <div>
                <Formik
                    initialValues={{
                        code: "+91",
                        mobile: ""
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true)
                        handleForgotPassword(values.email)
                        toast.success(`Email has been sent!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }}
                    enableReinitialize={true}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required("Email is required"),
                    })}
                >
                    {(props) => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isValid,
                            isSubmitting
                        } = props;
                        return (
                            // <>
                            <form onSubmit={handleSubmit}>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <TextField
                                            multiline
                                            type="email"
                                            id="email"
                                            name="email"
                                            // label="Email"
                                            error={(errors.email && touched.email)}
                                            value={values.email}
                                            onChange={handleChange}
                                            variant={"outlined"}
                                            fullWidth
                                            onBlur={handleBlur}
                                            className={loginStyle.inputbox}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <p className={`${loginStyle.error}`}>
                                            {
                                                (errors.email && touched.email) && errors.email
                                            }
                                        </p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant={"contained"} color={"secondary"} fullWidth
                                                className={`${loginStyle.button}`}
                                                disabled={isSubmitting || !(isValid && dirty)}
                                                type={"submit"}
                                        >
                                            Send email
                                        </Button>

                                    </Grid>

                                    <Typography className={`${loginStyle.smalltext} ${loginStyle.minilink}`}
                                                onClick={() => {
                                                    setIsForgotPassword(false)
                                                }}>
                                        Go back to Login</Typography>
                                </Grid>
                            </form>
                        )
                    }}

                </Formik>
            </div>
        </>
    )
}


