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
    <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={6}>
            <Card
            sx={{ p: 10, height: "100%", display: "flex", flexDirection: "column" }}
            >
            <Stack spacing={4}>
                <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
                >
                Kontakt
                </Typography>

                <Typography variant="h6" fontWeight="bold"
                textAlign="center">
                Salon Elegance
                </Typography>

                <Typography
                textAlign="center">
                Musterstraße 1, 12345 Musterstadt
                </Typography>

                <Typography
                textAlign="center">
                Telefon: 0123 456789
                </Typography>

                <Typography
                textAlign="center">
                E-Mail: info@salon-elegance.de
                </Typography>

                <Typography sx={{ mt: 2 }} fontWeight="bold"
                textAlign="center">
                Öffnungszeiten:
                </Typography>

                <Typography
                textAlign="center">
                Di - Fr: 10:00 - 19:00
                </Typography>

                <Typography
                textAlign="center">
                Mo, Sa, So: Geschlossen
                </Typography>
            </Stack>
            </Card>
        </Stack>
    </Container>
    </Box>
  );
}