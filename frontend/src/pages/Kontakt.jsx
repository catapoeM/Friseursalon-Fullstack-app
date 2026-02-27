import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Card
} from "@mui/material";

export default function ContactPage() {
  return (

    <Box
    sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
    }}
    >
    <Container maxWidth="lg">
        <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
            <Card
            sx={{
                p: 6,
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 4
            }}
            >
            <Stack spacing={3}>
                <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
                >
                Kontakt
                </Typography>

                <Typography variant="h6">
                Salon Elegance
                </Typography>

                <Typography>
                Musterstraße 1, 12345 Musterstadt
                </Typography>

                <Typography>
                Telefon: 0123 456789
                </Typography>

                <Typography>
                E-Mail: info@salon-elegance.de
                </Typography>

                <Typography sx={{ mt: 2 }} fontWeight="bold">
                Öffnungszeiten:
                </Typography>

                <Typography>
                Di - Fr: 10:00 - 19:00
                </Typography>

                <Typography>
                Mo, Sa, So: Geschlossen
                </Typography>
            </Stack>
            </Card>
        </Grid>
        </Grid>
    </Container>
    </Box>
  );
}