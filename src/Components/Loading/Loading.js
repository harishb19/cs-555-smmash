import {Stack, Typography} from "@mui/material";
import homeStyle from "../Home/css/home.module.css";

const Loading = () => {
    return (

        <Stack className={homeStyle.radialBG} direction={"column"} style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
        }}>
            <Typography variant={"h6"} component={"p"} marginTop={"20px"}>
                Loading...
            </Typography>
        </Stack>
    )
}
export default Loading
