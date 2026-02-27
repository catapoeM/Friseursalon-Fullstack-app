
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Stack
} from "@mui/material";
import BackgroundPic from "../components/common/BackgroundPic";

const products = [
    {
        name: "Premium Shampoo",
        description: "Pflegendes Shampoo für glänzendes und gesundes Haar.",
        price: "19,90 €",
        image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc"
    },
    {
        name: "Repair Conditioner",
        description: "Intensive Pflege für trockenes und strapaziertes Haar.",
        price: "24,90 €",
        image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
    },
    {
        name: "Styling Wax",
        description: "Starker Halt mit natürlichem Finish.",
        price: "14,90 €",
        image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
    }
];

const ProductsPage = () => {
    return (
        <BackgroundPic
        >
            <Container maxWidth="lg" sx={{ py: 8 }}>
            <Stack spacing={6}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <Typography variant="h3" fontWeight="bold" textAlign="center" color="text.secondary">
                    Unsere Produkte
                    </Typography>

                    <Typography
                    variant="body1"
                    textAlign="center"
                    color="text.secondary"
                    >
                    Entdecken Sie unsere hochwertigen Pflege- und Stylingprodukte
                    für Zuhause – exklusiv bei Salon Elegance erhältlich.
                    </Typography>
                </Card>

                <Grid container spacing={4}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardMedia
                        component="img"
                        height="220"
                        image={product.image}
                        alt={product.name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {product.price}
                        </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Stack>
            </Container>
        </BackgroundPic>
    );
}

export default ProductsPage