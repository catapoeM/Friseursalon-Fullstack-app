import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Typography variant="body1" color="text.primary">
        © {new Date().getFullYear()} Friseur Salon · Alle Rechte vorbehalten
      </Typography>

      {/* Link zu Datenschutz */}
      <Typography variant="body1" color="text.primary">
        <MuiLink component={Link} to="/datenschutz" color="inherit" sx={{ ml: 1 }}>
          Datenschutz
        </MuiLink>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <MuiLink component={Link} to="/admin" color="inherit" sx={{ ml: 1 }}>
          Admin
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Footer;