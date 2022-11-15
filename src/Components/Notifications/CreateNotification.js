import {GET_PATIENTS} from "../../graphql/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
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
import {useToasts} from "react-toast-notifications";

const CreateNotification = () => {
    const {addToast} = useToasts()

    const [patients, setPatients] = useState([])
    const userDetails = useStoreState(state => state.user.userDetails)
    const [fetchPatient, {data, loading, error}] = useLazyQuery(GET_PATIENTS);
    const [sendNotification] = useMutation(CREATE_NOTIFICATION)
    useEffect(() => {
        if (!loading && data && data.patient) {
            if (data.patient.length > 0) {
                setPatients([...data.patient, {firstName: "All", lastName: "Patients", id: "all", parentId: "all"}])

            } else {
                setPatients([{firstName: "All", lastName: "Patients", id: "all", parentId: "all"}])

            }
        }
    }, [data, loading])
    useEffect(() => {
        if (userDetails && userDetails.id) {
            fetchPatient({
                variables: {
                    doctorId: userDetails.roleId === 0 ? null : userDetails.id
                }
            })
        }
    }, [userDetails])

    const handleSubmit = (values, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        let insertData = {
            message: values.message, title: values.title, sentBy: userDetails.id
        }
        if (values.recivers.id === "all") {
            if (userDetails.roleId === 3) {
                insertData.recivers = 0
            } else {
                insertData.recivers = 1
                insertData.userId = userDetails.id
            }
        } else {
            insertData.recivers = 2
            insertData.userId = values.recivers.parentId
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
    if (error) return <Error message={error.message} onClick={() => window.reload()}/>;
    return (<div>
        <Typography variant={'h2'}>
            Create Notification
        </Typography>
        <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
                title: Yup.string().required("Title is required"),
                message: Yup.string().required("Message is required"),
                recivers: Yup.object().required("Receiver is required")
            })}
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
                                id="recivers"
                                fullWidth
                                value={values.recivers}
                                name={"recivers"}
                                onChange={(event, newValue) => {
                                    props.setFieldValue("recivers", newValue);
                                }}
                                options={[...patients]}
                                getOptionLabel={(option) =>` ${option.firstName} ${option.lastName}`}
                                renderInput={(params) => <TextField {...params} label="Receiver"/>}

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
