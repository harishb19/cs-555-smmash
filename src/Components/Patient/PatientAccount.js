import {Formik} from "formik";
import * as Yup from "yup";
import {Grid, InputAdornment, InputLabel, TextField} from "@mui/material";
import loginStyle from "../Auth/css/login.module.css";
import {Badge, Email, LocalPhone} from "@mui/icons-material";
import React from "react";
import {useStoreState} from "easy-peasy";

const PatientAccount = () => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const handleSignup = (values) => {
        console.log(values);
    }
    return (<>
        <h1>Parent Account</h1>
        <Formik
            initialValues={{...userDetails}}
            onSubmit={handleSignup}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({})}
        >
            {(props) => {
                const {
                    values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid, isSubmitting
                } = props;
                return (<form onSubmit={handleSubmit}>
                    <Grid container alignItems="center">
                        <Grid container item xs={12} md={12} lg={12} spacing={2}>
                            <Grid item xs={12} md={6} lg={6}>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <TextField
                                    multiline
                                    type="text"
                                    name={"firstName"}
                                    id={"firstName"}
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant={"outlined"}
                                    disabled
                                    fullWidth
                                    className={loginStyle.inputboxmini}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start">
                                            <Badge/>
                                        </InputAdornment>),
                                    }}
                                />
                                <p className={`${loginStyle.error}`}>
                                    {(errors.firstName && touched.firstName) && errors.firstName}
                                </p>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <TextField
                                    multiline
                                    // label={"Last Name"}
                                    type="text"
                                    disabled
                                    name={"lastName"}
                                    id={"lastName"}
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant={"outlined"}
                                    fullWidth
                                    className={loginStyle.inputboxmini}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start">
                                            <Badge/>
                                        </InputAdornment>),
                                    }}
                                />
                                <p className={`${loginStyle.error}`}>
                                    {(errors.lastName && touched.lastName) && errors.lastName}
                                </p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <TextField
                                multiline
                                disabled
                                type="email"
                                id="email"
                                name="email"
                                // label="Email"
                                value={values.email}
                                onChange={handleChange}
                                variant={"outlined"}
                                fullWidth
                                onBlur={handleBlur}
                                className={loginStyle.inputbox}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Email/>
                                    </InputAdornment>),
                                }}
                            />
                            <p className={`${loginStyle.error}`}>
                                {(errors.email && touched.email) && errors.email}
                            </p>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                            <TextField
                                type="text"
                                id={"phoneNumber"}
                                name={"phoneNumber"}
                                value={values.phoneNumber}
                                disabled
                                onChange={handleChange}
                                variant={"outlined"}
                                fullWidth
                                onBlur={handleBlur}
                                className={loginStyle.inputbox}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <LocalPhone/>
                                    </InputAdornment>),
                                }}
                            />
                            <p className={`${loginStyle.error}`}>
                                {(errors.phoneNumber && touched.phoneNumber) && errors.phoneNumber}
                            </p>
                        </Grid>
                        {/*<Grid item xs={12} md={6} lg={6}>*/}
                        {/*    <InputLabel htmlFor="gender">Gender</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        labelId="gender"*/}
                        {/*        id="gender"*/}
                        {/*        fullWidth*/}
                        {/*        disabled*/}
                        {/*        value={values.gender}*/}
                        {/*        name={'gender'}*/}
                        {/*        onChange={handleChange}*/}
                        {/*    >*/}
                        {/*        <MenuItem value={'female'}>Female</MenuItem>*/}
                        {/*        <MenuItem value={'male'}>Male</MenuItem>*/}
                        {/*        <MenuItem value={'others'}>Others</MenuItem>*/}
                        {/*    </Select>*/}
                        {/*    <p className={`${loginStyle.error}`}>*/}
                        {/*        {(errors.gender && touched.gender) && errors.gender}*/}
                        {/*    </p>*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12} md={6} lg={6}>*/}
                        {/*    <InputLabel htmlFor="dateOfBirth">Date of birth</InputLabel>*/}
                        {/*    <TextField*/}
                        {/*        type="date"*/}
                        {/*        id={"dateOfBirth"}*/}
                        {/*        name={"dateOfBirth"}*/}
                        {/*        disabled*/}
                        {/*        value={values.dateOfBirth}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        variant={"outlined"}*/}
                        {/*        fullWidth*/}
                        {/*        onBlur={handleBlur}*/}
                        {/*        className={loginStyle.inputbox}*/}
                        {/*        InputProps={{*/}
                        {/*            startAdornment: (<InputAdornment position="start">*/}
                        {/*                <CalendarMonth/>*/}
                        {/*            </InputAdornment>),*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*    <p className={`${loginStyle.error}`}>*/}
                        {/*        {(errors.dateOfBirth && touched.dateOfBirth) && errors.dateOfBirth}*/}
                        {/*    </p>*/}
                        {/*</Grid>*/}

                        {/*<Grid item xs={12}>*/}
                        {/*    <Button variant={"contained"} color={"secondary"} fullWidth*/}
                        {/*            className={`${loginStyle.button}`}*/}
                        {/*            disabled={isSubmitting || !(isValid && dirty)}*/}
                        {/*            type={"submit"}*/}
                        {/*    >*/}
                        {/*        Create Account*/}
                        {/*    </Button>*/}

                        {/*</Grid>*/}
                    </Grid>
                </form>)
            }}

        </Formik>
    </>);
}

export default PatientAccount;
