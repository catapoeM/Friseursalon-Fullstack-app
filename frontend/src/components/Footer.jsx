import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Friseur Salon · Alle Rechte vorbehalten
      </Typography>
    </Box>
  );
}

export default Footer;