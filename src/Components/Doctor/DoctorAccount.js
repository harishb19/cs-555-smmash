import loginStyle from "../Auth/css/login.module.css";
import {Autocomplete, Box, Button, Grid, InputLabel, TextField} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {useStoreState} from "easy-peasy";
import {GET_DOCTORS} from "../../graphql/queries";
import {INSERT_DOCTOR} from "../../graphql/mutation";

const DoctorAccount = () => {
    const userDetails = useStoreState(state => state.user.userDetails)

    const [initialValue, setInitialValue] = useState({})
    const {data, loading, error} = useQuery(GET_DOCTORS, {
        variables: {
            doctorId: userDetails.id
        }
    });
    // const [updateDoctor] = useMutation(UPDATE_DOCTOR)
    const [insertDoctor] = useMutation(INSERT_DOCTOR)

    const validateSchema = {
        address: Yup.string().required("address is required"),
        qualification: Yup.array().min(1, "You can't leave this blank.").required("qualification is required"),
    }
    const handleSubmit = (value, {setSubmitting}) => {

    }
    useEffect(() => {
        if (!loading && data && data.doctor.length > 0) {
            setInitialValue(data.doctor[0])
        }
    }, [data, loading])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error...</div>
    }

    return (<Box sx={{
        width: '90%', margin: '2em auto',
    }}>

        <Formik
            initialValues={{...initialValue}}
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
                                id="qualification"
                                fullWidth
                                multiple
                                value={values.qualification}
                                name={"qualification"}
                                onChange={(event, newValue) => {
                                    props.setFieldValue("qualification", newValue);
                                }}
                                options={['M.D', 'M.B.B.S', 'M.S', 'M.D.S', 'Ph.D.', 'D.O']}
                                renderInput={(params) => <TextField {...params} label="Qualification"/>}
                                sx={{
                                    width: 600,
                                }}
                            />   <p className={`${loginStyle.error}`}>
                            {(errors.qualification && touched.qualification) && errors.qualification}
                        </p>
                        </Grid>
                        <Grid item lg={12}/>
                        <Grid item xs={12} md={6} lg={6}>
                            <InputLabel htmlFor="Weight">Address</InputLabel>

                            <TextField id="address"
                                       value={values.address}
                                       variant="outlined"
                                       multiline

                                       name={"address"}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       fullWidth/>
                            <p className={`${loginStyle.error}`}>
                                {(errors.address && touched.address) && errors.address}
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

        </Formik>
    </Box>)
}

export default DoctorAccount
