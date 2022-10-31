import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import Error from "../Error/CustomError";
import Loading from "../Loading/Loading";
import {GET_VACCINE_LIST} from "../../graphql/queries";
import {List, ListItem, ListItemText} from "@mui/material";

const Vaccine = ({vaccine}) => {
    return (<ListItem
        sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
        }}
    >
        <ListItemText
            primary={vaccine.vaccineName}
            secondary={vaccine.sideEffect}
        />
    </ListItem>);
}

const VaccineList = () => {
    const [vaccines, setVaccines] = useState([]);
    const {data, loading, error} = useQuery(GET_VACCINE_LIST);
    useEffect(() => {
        if (!loading && data) {
            setVaccines(data.vaccines)
        }
    }, [data, loading])
    if (loading) return <Loading/>;
    if (error) return <Error message={error.message}/>;
    return (<>
        <h1>Vaccines list: {vaccines.length}</h1>
        <List
            sx={{
                width: '80%',
                margin: 'auto'
            }}
        >


            {vaccines.map(vaccine =><ListItem key={vaccine.id}> <Vaccine  vaccine={vaccine}/></ListItem>)}

        </List>

    </>);
}

export default VaccineList;
