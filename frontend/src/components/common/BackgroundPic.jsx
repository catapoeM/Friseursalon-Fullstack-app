import { Box } from "@mui/material";
const BackgroundPic = ({children}) => {
    return (
        <Box
        sx={{
            minHeight: "80vh",
            backgroundImage: "url('/images/salon-bg.png')", // lokal im public Ordner
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // optional Parallax Effekt
            display: "flex",
            alignItems: "center"
        }}
        >
            {children}
        </Box>
    )
}

export default BackgroundPic