import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box , Grid} from "@mui/material";
import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton";

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />

      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <BackButton />
        <Grid container spacing={2} justifyContent={"center"} xs={12}>
          <Outlet />
        </Grid>
      </Box>
      
      <Footer />
    </Box>
  );
}

export default MainLayout;