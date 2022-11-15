import { GET_PATIENTS} from "../../graphql/queries";
import {useMutation, useQuery} from "@apollo/client";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import React, {useEffect, useState} from "react";
import {Autocomplete, Button, Grid, InputLabel, TextField, Typography} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import loginStyle from "../Auth/css/login.module.css";
import {useStoreState} from "easy-peasy";
import {toast} from "react-toastify";
import {CREATE_NOTIFICATION} from "../../graphql/mutation";

const CreateNotification = () => {
    const [patients, setPatients] = useState([])
    const userDetails = useStoreState(state => state.user.userDetails)
    const [data, loading, error, refetch] = useQuery(GET_PATIENTS, {
        variables: {
            doctorId: userDetails.roleId === 0 ? null : userDetails.id
        }
    });
    const [sendNotification] = useMutation(CREATE_NOTIFICATION)
    useEffect(() => {
        if (!loading && data) {
            if (data.patients.length > 0) {
                setPatients([...data.patient, {firstName: "All", lastName: "Patients", id: "all", parentId: "all"}])

            } else {
                setPatients([{firstName: "All", lastName: "Patients", id: "all", parentId: "all"}])

            }
        }
    }, [data, loading])

    const handleSubmit = (values, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        let insertData = {
            message: values.message, title: values.title, sentBy: userDetails.id
        }
        if (values.recivers.id === "all") {
            if (userDetails.roleId === 3) {
                values.recivers = 0
            } else {
                values.recivers = 1
                values.userId = userDetails.id
            }
        } else {
            values.recivers = 2
            values.userId = values.recivers.parentId
        }
        sendNotification({
            variables: {...insertData}
        }).then(res => {
            setSubmitting(false)
            toast.success(`Notification sent`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            resetForm()

        }).catch(err => {
            setSubmitting(false)
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            console.log(err)
        })
    }

    if (loading) return <Loading/>;
    if (error) return <Error message={error.message} onClick={refetch()}/>;
    return (<div>
        <Typography variant={'h2'}>
            Create Notification
        </Typography>
        <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({})}
        >
            {(props) => {
                const {
                    values, touched, errors, dirty, handleChange, handleBlur, handleSubmit, isValid, isSubmitting
                } = props;
                return (<form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <TextField
                                type="text"
                                name={"title"}
                                id={"title"}
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant={"outlined"}
                                fullWidth
                                className={loginStyle.inputboxmini}
                            />
                            <p className={`${loginStyle.error}`}>
                                {(errors.title && touched.title) && errors.title}
                            </p>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <InputLabel htmlFor="message">Message</InputLabel>
                            <TextField
                                multiline
                                maxRows={5}
                                type="text"
                                name={"message"}
                                id={"message"}
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant={"outlined"}
                                fullWidth
                                className={loginStyle.inputboxmini}
                            />
                            <p className={`${loginStyle.error}`}>
                                {(errors.message && touched.message) && errors.message}
                            </p>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Autocomplete
                                disablePortal
                                id="list"
                                fullWidth
                                value={values.list}
                                name={"list"}
                                onChange={(event, newValue) => {
                                    props.setFieldValue("list", newValue);
                                }}
                                options={[...patients]}
                                renderOption={(option) => option.firstName + " " + option.lastName}
                                renderInput={(params) => <TextField {...params} label="Reciver"/>}

                            />
                        </Grid>
                        <Grid item lg={12}/>
                        <Grid item xs={12}>
                            <Button variant={"contained"} color={"secondary"}
                                    className={`${loginStyle.button}`}
                                    disabled={isSubmitting || !(isValid && dirty)}
                                    type={"submit"}
                            >
                                Send
                            </Button>

                        </Grid>
                    </Grid>
                </form>)
            }}

        </Formik>
    </div>)

}
export default CreateNotification