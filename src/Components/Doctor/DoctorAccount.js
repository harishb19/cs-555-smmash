import loginStyle from "../Auth/css/login.module.css";
import {Autocomplete, Box, Button, Grid, TextField} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";

const DoctorAccount = () => {
    const [initialValue, setInitialValue] = useState({})
    const validateSchema = {
        firstName: Yup.string().required("First name is required"),
    }
    const handleSubmit = (values) => {
        console.log(values)
    }
    return (
        <Box sx={{
            width: '90%',
            margin: '2em auto',
        }}>

                <Formik
                    initialValues={{...initialValue}}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    validationSchema={Yup.object().shape({...validateSchema})}
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
                                    />
                                </Grid>
                                <Grid item lg={12}/>
                                <Grid item xs={12} md={6} lg={6}>
                                    <TextField id="address" label="Address" variant="outlined" multiline fullWidth/>

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
        </Box>
    )
}

export default DoctorAccount
