import { Stack, Typography, Container, Button, Card} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BackgroundPic from "../components/common/BackgroundPic";

const HomePage = () => {
  return (
    <BackgroundPic
    >
      <Container maxWidth="md">
        <Stack
          spacing={2}
          sx={{
            minHeight: "50vh",
            justifyContent: "center",
            textAlign: "center",
            py: 8
          }}
        >
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" fontWeight="bold" color="text.secondary">
              Friseur Salon Elegance
            </Typography>

            <Typography variant="h5" color="text.secondary">
              Ihr moderner Friseursalon für Stil, Eleganz und Persönlichkeit.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Ob trendiger Haarschnitt, professionelle Coloration oder individuelles Styling –
              unser erfahrenes Team sorgt dafür, dass Sie sich rundum wohlfühlen.
              Qualität, Beratung und Leidenschaft stehen bei uns an erster Stelle.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Besuchen Sie uns in entspannter Atmosphäre und genießen Sie
              erstklassigen Service mitten in Ihrer Stadt.
            </Typography>
          </Card>

          <Button
            component={RouterLink}
              to="/stylists"
              variant="contained"
              size="large"
              sx={{
                alignSelf: "center",
                px: 5,
                py: 1.5,
                borderRadius: 3
              }}
            >
    Termin buchen
          </Button>
        </Stack>
      </Container>
    </BackgroundPic>
  );
}

export default HomePage