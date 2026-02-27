import { Container, Stack, Typography } from "@mui/material";

const PrivacyPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Typography variant="h3" fontWeight="bold">
          Datenschutzerklärung
        </Typography>

        <Typography variant="body1">
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
          Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der
          gesetzlichen Bestimmungen (DSGVO, TMG).
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          1. Verantwortlicher
        </Typography>
        <Typography variant="body2">
          Salon Elegance <br />
          Musterstraße 1 <br />
          12345 Musterstadt <br />
          E-Mail: info@salon-elegance.de
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          2. Erhebung und Verarbeitung personenbezogener Daten
        </Typography>
        <Typography variant="body2">
          Wir erheben, verarbeiten und nutzen Ihre personenbezogenen Daten nur,
          wenn dies gesetzlich erlaubt ist oder Sie in die Datenerhebung einwilligen.
          Dies kann z.B. bei der Terminbuchung oder Kontaktaufnahme der Fall sein.
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          3. Terminbuchung
        </Typography>
        <Typography variant="body2">
          Wenn Sie über unsere Website einen Termin buchen, speichern wir die
          von Ihnen angegebenen Daten (Name, Telefonnummer, E-Mail-Adresse),
          um Ihre Anfrage zu bearbeiten.
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          4. Server-Logfiles
        </Typography>
        <Typography variant="body2">
          Der Provider der Seiten erhebt und speichert automatisch Informationen
          in sogenannten Server-Logfiles, die Ihr Browser automatisch an uns übermittelt.
          Diese Daten sind nicht bestimmten Personen zuordenbar.
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          5. Ihre Rechte
        </Typography>
        <Typography variant="body2">
          Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung,
          Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.
          Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht
          verstößt, können Sie sich bei der Aufsichtsbehörde beschweren.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Stand: Januar 2026
        </Typography>
      </Stack>
    </Container>
  );
}

export default PrivacyPage