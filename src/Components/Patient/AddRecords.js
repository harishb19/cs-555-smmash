import {Formik} from "formik";
import * as Yup from "yup";
import {Autocomplete, Button, Grid, InputAdornment, InputLabel, TextField} from "@mui/material";
import loginStyle from "../Auth/css/login.module.css";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import Loading from "../Loading/Loading";
import Error from "../Error/CustomError";
import {GET_VACINES} from "../../graphql/queries";
import {useStoreState} from "easy-peasy";
import {INSERT_RECORDS} from "../../graphql/mutation";
import {toast} from "react-toastify";
import {CalendarMonth} from "@mui/icons-material";

const AddRecords = ({refetch}) => {
    const userDetails = useStoreState(state => state.user.userDetails)
    const [vaccines, setVaccines] = useState([]);
    const {data, loading, error} = useQuery(GET_VACINES)
    const [insertRecord] = useMutation(INSERT_RECORDS)
    const validateSchema = {}
    const handleSubmit = (value, {setFieldError, setSubmitting}) => {
        setSubmitting(true)
        let insertData = []
        console.log("-> value", value);
        console.log("-> userDetails", userDetails);
        value.dosage.forEach((dosage) => {
            insertData.push({
                dosageId: dosage.id,
                dosageInformation: value.dosageInformation,
                patientId: userDetails.patients[0].id,
                doctorId: userDetails.patients[0].doctorId
            })
        })
        console.log("-> insertData", insertData);
        insertRecord({variables: {objects: insertData}}).then(res => {
            toast.success(`Records inserted`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setSubmitting(false)
            refetch()
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
    useEffect(() => {
        if (data && !loading) {
            let localVaccines = [];
            data.vaccines.forEach((vaccine) => {
                vaccine.dosages.forEach((dose) => {
                    localVaccines.push({
                        vaccineName: vaccine.vaccineName, doseNumber: dose.doseNumber, id: dose.id
                    })
                })

            })
            setVaccines([...localVaccines])
        }
    }, [data, loading])
    if (loading) return <Loading/>
    if (error) return <Error error={error}/>
    return (<Formik
        initialValues={{}}
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
                        <Autocomplete
                            disablePortal
                            id="Vaccine"
                            fullWidth
                            multiple
                            value={values.vaccine}
                            name={"dosage"}
                            onChange={(event, newValue) => {
                                props.setFieldValue("dosage", newValue);
                            }}
                            options={vaccines}
                            getOptionLabel={(option) => `${option.vaccineName} - Dose ${option.doseNumber}`}
                            renderInput={(params) => <TextField {...params} label="Vaccine"/>}
                            sx={{
                                width: 400,
                            }}
                        />
                    </Grid>
                    <Grid item lg={12}/>
                    <Grid item xs={12} md={6} lg={6}>
                            <InputLabel htmlFor="dosageInformation">Date of vaccine</InputLabel>
                            <TextField
                                type="date"
                                id={"dosageInformation"}
                                name={"dosageInformation"}
                                value={values.dosageInformation}
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
                                {(errors.dosageInformation && touched.dosageInformation) && errors.dosageInformation}
                            </p>
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
export default AddRecords;
