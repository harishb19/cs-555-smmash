import {Formik} from "formik";
import * as Yup from "yup";
import {Autocomplete, Button, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import loginStyle from "../Auth/css/login.module.css";
import {Badge, CalendarMonth} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_PARENTS} from "../../graphql/queries";
import {useStoreState} from "easy-peasy";
import {INSERT_PATIENT} from "../../graphql/mutation";
import {toast} from "react-toastify";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";

const AddChildrean = ({preVal,onClose}) => {
    const userDetails = useStoreState(state => state.user.userDetails)

    const [initialValues, setInitialValues] = useState({...preVal})
    const [parentList, setParentList] = useState([])
    const {data, loading, error} = useQuery(GET_PARENTS)
    const [insertPatient] = useMutation(INSERT_PATIENT)
    const handleSubmit = (value, {setSubmitting}) => {
        setSubmitting(true)
        console.log(value)
        const payload = {
            firstName: value.firstName,
            lastName: value.lastName,
            dateOfBirth: value.dateOfBirth,
            parentId: value.parent.id,
            gender: value.gender,
            doctorId: userDetails.id,
            weight: value.weight,
            height: value.height,
        }
        if (preVal) {

        } else {
            insertPatient({
                variables: {
                    object: payload
                }
            }).then(res => {
                console.log(res)
                toast.success("Patient added", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setSubmitting(false)
                onClose()
            }).catch(err => {
                console.log("-> err", err);
                toast.error(err.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setSubmitting(false)
            })
        }
    }
    const validateSchema = {
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        dateOfBirth: Yup.string().required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
        weight: Yup.number().required("Weight is required"),
        height: Yup.number().required("Height is required"),
    }
    const obscureEmail = (email) => {
        const [name, domain] = email.split('@');
        return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
    };
    useEffect(() => {
        if (data && !loading) {
            setParentList(data.parents)
        }
    }, [data, loading])
    if (loading) return <Loading/>
    if (error) return <Error/>
    return (<Formik
        initialValues={{...initialValues}}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({...validateSchema})}
    >
        {(props) => {
            const {
                values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid, isSubmitting
            } = props;
            return (<form onSubmit={handleSubmit}>

                <Grid container spacing={2}>
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
                    <Grid item xs={12} md={6} lg={6}>
                        <InputLabel htmlFor="dosageInformation">Date of birth</InputLabel>
                        <TextField
                            type="date"
                            id={"dateOfBirth"}
                            name={"dateOfBirth"}
                            value={values.dateOfBirth}
                            onChange={handleChange}
                            variant={"outlined"}
                            fullWidth
                            onBlur={handleBlur}
                            className={loginStyle.inputbox}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <CalendarMonth/>
                                </InputAdornment>),
                            }}
                        />
                        <p className={`${loginStyle.error}`}>
                            {(errors.dateOfBirth && touched.dateOfBirth) && errors.dateOfBirth}
                        </p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            labelId="gender"
                            id="gender"
                            fullWidth
                            value={values.gender}
                            name={'gender'}
                            onChange={handleChange}
                        >
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'others'}>Others</MenuItem>
                        </Select>
                        <p className={`${loginStyle.error}`}>
                            {(errors.gender && touched.gender) && errors.gender}
                        </p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <InputLabel htmlFor="Weight">Weight</InputLabel>
                        <TextField
                            multiline
                            // label={"Last Name"}
                            type="number"
                            name={"weight"}
                            id={"weight"}
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant={"outlined"}
                            fullWidth
                            className={loginStyle.inputboxmini}
                            InputProps={{
                                endAdornment: (<InputAdornment position="start">
                                    Kgs
                                </InputAdornment>),
                            }}
                        />
                        <p className={`${loginStyle.error}`}>
                            {(errors.weight && touched.weight) && errors.weight}
                        </p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <InputLabel htmlFor="Weight">Height</InputLabel>
                        <TextField
                            multiline
                            // label={"Last Name"}
                            type="number"
                            name={"height"}
                            id={"height"}
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant={"outlined"}
                            fullWidth
                            className={loginStyle.inputboxmini}
                            InputProps={{
                                endAdornment: (<InputAdornment position="start">
                                    Cms
                                </InputAdornment>),
                            }}
                        />
                        <p className={`${loginStyle.error}`}>
                            {(errors.height && touched.height) && errors.height}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="parent"
                            fullWidth
                            value={values.parent}
                            name={"parent"}
                            onChange={(event, newValue) => {
                                props.setFieldValue("parent", newValue);
                            }}
                            options={parentList}
                            getOptionLabel={(option) => `${option.firstName} ${option.lastName} - ${obscureEmail(option.email)}`}
                            renderInput={(params) => <TextField {...params} label="Parent"/>}
                            sx={{
                                width: 400,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant={"contained"} color={"secondary"}
                                className={`${loginStyle.button}`}
                                disabled={isSubmitting || !(isValid && dirty)}
                                type={"submit"}
                        >
                            Save
                        </Button>

                    </Grid>
                </Grid>

            </form>)
        }}

    </Formik>)
}
export default AddChildrean
