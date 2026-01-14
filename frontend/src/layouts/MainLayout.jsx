import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

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
        <Outlet />
      </Box>
      
      <Footer />
    </Box>
  );
}

export default MainLayout;