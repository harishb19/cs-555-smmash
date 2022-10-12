import {Stack, Typography} from "@mui/material";

const PageNotFound = () => {
    return (

        <Stack direction={"column"} style={{
            textAlign: "center", display: "flex", justifyContent: "center", alignItems: 'center',
        }}>
            <Typography variant={"h6"} component={"p"} marginTop={"20px"}>
                Page not found
            </Typography>
        </Stack>)
}
export default PageNotFound
